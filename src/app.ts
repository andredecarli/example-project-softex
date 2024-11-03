import express from 'express';
import AdminJS from 'adminjs';
import bodyParser from 'body-parser';
import { buildAuthenticatedRouter } from '@adminjs/express';

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import clientRouter from './controller/client.js';
import categoryRouter from './controller/category.js';
import productRouter from './controller/product.js';
import orderRouter from './controller/order.js';
import reportRouter from './controller/report.js';

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  app.use(bodyParser.json());
  app.use(admin.options.rootPath, router);

  app.use('/client', clientRouter);
  app.use('/category', categoryRouter);
  app.use('/product', productRouter);
  app.use('/order', orderRouter);
  app.use('/report', reportRouter);

  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
