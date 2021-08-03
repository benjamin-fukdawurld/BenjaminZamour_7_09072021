import './config';

import http from 'http';

import { createApp } from './app';

import logger from './common/logger';

import department from './routes/department';
import user from './routes/user';
import post from './routes/post';
import comment from './routes/comment';
import vote from './routes/vote';

function normalizePort(port: string | number): number {
  let value = 0;
  if (typeof port === 'string') {
    value = parseInt(port, 10);
  } else {
    value = port;
  }

  if (Number.isNaN(value) || value <= 0) {
    throw new Error(`Port value must be a positive integer, received '${value}'`);
  }

  return value;
}

const port = normalizePort(process.env.SERVER_PORT ?? 5000);

const server = http.createServer(
  createApp({
    routes: [
      {
        path: '/departments',
        router: department,
      },
      {
        path: '/users',
        router: user,
      },
      {
        path: '/posts',
        router: post,
      },
      {
        path: '/comments',
        router: comment,
      },
      {
        path: '/votes',
        router: vote,
      },
    ],
  }),
);

server.on('error', (error: Error | any) => {
  if (error.syscall && error.syscall !== 'listen') {
    throw error;
  }

  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', async () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  logger.info(`Listening on ${bind}`);
});

server.listen(port);
