import { Request, Response } from 'express';
import { ds } from '@/ds';
import { Profile } from '@/entity/profile';

export const insertProfile = async (req: Request, res: Response) => {
  await ds.manager.create(Profile, req.body);
  return res.status(200).json({
    message: 'insert user profile success!',
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const profile = await ds.manager.update(
    Profile,
    {
      userId: req.params.userId,
    },
    req.body
  );

  if (profile) {
    return res.status(200).json({
      message: 'user profile is updated!',
    });
  }
};

export const upload = async (req: Request, res: Response) => {};
