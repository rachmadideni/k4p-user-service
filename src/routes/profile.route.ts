import express from 'express';
import RouteGroup from 'express-route-grouping';
import { insertProfile, updateProfile, upload } from '@/controllers/profile';

const root = new RouteGroup('/', express.Router());
root.group('profile', (profile) => {
  profile.post('/', insertProfile);
  profile.patch('/:userId', updateProfile);
  profile.post('/upload', upload);
});

export { root as profileRoutes };
