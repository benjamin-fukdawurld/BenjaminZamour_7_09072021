import './config';

import https from 'https';
import fs from 'fs';

import { createApp } from './app';

import department from './routes/department';
import user from './routes/user';

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

const options = {
  key: fs.readFileSync(process.env.HTTPS_KEY ?? 'key.pem'),
  cert: fs.readFileSync(process.env.HTTPS_CERTIFICATE ?? 'cert.pem'),
};

const server = https.createServer(
  options,
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
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', async () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  console.log(`Listening on ${bind}`);
});

server.listen(port);
