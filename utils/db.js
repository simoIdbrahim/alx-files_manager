// utils/db.js
import mongodb from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });

    this.client.connect()
      .then(() => {
        console.log('Connected successfully to MongoDB');
        this.db = this.client.db(database);
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
      });
  }

  isAlive() {
    return this.client && this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    if (this.isAlive()) {
      return this.db.collection('users').countDocuments();
    }
    return 0;
  }

  async nbFiles() {
    if (this.isAlive()) {
      return this.db.collection('files').countDocuments();
    }
    return 0;
  }

  async usersCollection() {
    if (this.isAlive()) {
      return this.db.collection('users');
    }
    throw new Error('Not connected to the database');
  }

  async filesCollection() {
    if (this.isAlive()) {
      return this.db.collection('files');
    }
    throw new Error('Not connected to the database');
  }
}

export const dbClient = new DBClient();
export default dbClient;
