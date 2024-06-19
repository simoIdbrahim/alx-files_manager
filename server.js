// server application entry point
import express from 'express';
import indexRouter from './routes/index';

const server = express();

server.use(indexRouter);

export default server;
