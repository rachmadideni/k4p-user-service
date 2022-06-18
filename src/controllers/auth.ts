import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, RefreshToken } from '../entity';
import { v4 as uuidv4 } from 'uuid';
import nodeMailer from 'nodemailer';
import { ds } from '../data-source';

export const signup = async (req: Request, res: Response) => {
  const user = ds.getRepository(User).create(req.body);
  await ds.getRepository(User).save(user);
  return res.status(200).json({
    message: 'user is created successfully',
  });
};

export const signin = async (req: Request, res: Response) => {
  const user = await ds.manager.findOne(User, {
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    if (user.isPasswordMatches(req.body.password)) {
      const accessToken = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: 3600 });
      const refreshToken = uuidv4();
      const expiredAt = new Date();
      expiredAt.setSeconds(expiredAt.getSeconds() + 86400);

      await ds.manager.upsert(
        RefreshToken,
        {
          token: refreshToken,
          expireAt: expiredAt,
          user,
        },
        ['user']
      );

      return res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken,
      });
    } else {
      return res.status(403).json({
        message: 'password not matched',
      });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken: requestToken } = req.body;

  if (typeof requestToken === 'undefined' || requestToken === '') {
    return res.status(403).json({
      message: 'Refresh Token is required!',
    });
  }

  try {
    const currentToken = await ds.manager.findOne(RefreshToken, {
      where: {
        token: requestToken,
      },
    });

    if (!currentToken) {
      return res.status(403).json({ message: 'Refresh token is not in database!' });
    }

    if (currentToken.isExpired()) {
      await ds.manager.delete(RefreshToken, currentToken.id);
      // await ds.getRepository(RefreshToken).delete(currentToken.id)
      return res.status(403).json({
        message: 'Refresh token was expired. Please make a new signin request',
      });
    }

    const refreshToken = await ds.getRepository(RefreshToken).findOne({
      where: { token: requestToken },
      relations: { user: true },
    });

    const newAccessToken = jwt.sign({ id: refreshToken?.user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: 3600, // 24hr
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: currentToken.token,
    });
  } catch (err) {
    return res.status(500).json({ message: 'err' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const userWithVerifiedEmailAddress = await ds.manager.findOne(User, {
    where: {
      email,
      isEmailVerified: true,
    },
  });

  if (userWithVerifiedEmailAddress) {
    // send reset password link to email
    const testAccount = await nodeMailer.createTestAccount();
    const transporter = nodeMailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const result = await transporter.sendMail({
      from: 'user-service <foo@example.com>',
      to: 'rachmadideni@gmail.com',
      subject: 'forgot password',
      text: 'please ignore if you not requesting a password reset',
      html: '<b>please ignore if you not requesting a password reset</b>',
    });

    if (result.messageId) {
      return res.status(200).json({
        message: 'message sent succcessfully! ' + result.messageId,
      });
    }
  } else {
    return res.status(403).json({
      message: 'email is not verified!',
    });
  }
};
