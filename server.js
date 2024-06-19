// server application entry point
import express from 'express';
import indexRouter from './routes/index';

const server = express();
const port = process.env.PORT || 5000;

server.use(indexRouter);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
