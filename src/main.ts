import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express from 'express';
import { ds } from './data-source';

import appRoutes from './routes/index.route';

ds.initialize()
  .then(() => console.log('db initialized success'))
  .catch((err) => console.error('db initializer failed!', err));

const main = () => {
  const app = express();
  const port = 3001;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // eslint-disable-next-line array-callback-return
  appRoutes.map((route) => {
    app.use('/api/', route.export());
  });

  // app.use('/api/', authRoutes.export());
  // app.use('/api/', profileRoutes.export());

  // console.log(appRoutes.export());
  app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });
};

main();
