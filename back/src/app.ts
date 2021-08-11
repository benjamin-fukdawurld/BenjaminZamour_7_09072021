import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

export interface AppRoute {
  path: string;
  router: Router;
}

export interface AppProps {
  origin?: string;
  routes?: AppRoute[];
}

export function createApp({ routes }: AppProps): express.Express {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use('/images', express.static(path.join(path.dirname(''), 'images')));

  if (routes) {
    routes.forEach((route: AppRoute) => {
      app.use(route.path, route.router);
    });
  }

  return app;
}
