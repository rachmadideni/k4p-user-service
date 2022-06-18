import express from 'express';
import RouteGroup from 'express-route-grouping';
import { signup, signin, refreshToken, forgotPassword } from '@/controllers/auth';

const root = new RouteGroup('/', express.Router());
root.group('auth', (auth) => {
  auth.post('/signup', signup);
  auth.post('/signin', signin);
  auth.post('/refreshToken', refreshToken);
  auth.post('/forgotPassword', forgotPassword);
});

export { root as authRoutes };
