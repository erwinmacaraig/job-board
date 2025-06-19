import { Request, Response, NextFunction } from 'express';
import { Mailer } from '../models/Mailer';

export const index = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'You have reached the index route',
  });
};

export const postJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const mailer = new Mailer();
  mailer.setMailOptions(
    'erwin.macaraig@gmail.com',
    'New Job Posting',
    'This is the message',
  );
  let result = await mailer.sendNotification();
  if (result) {
    res.status(200).json({
      message: 'Mail sent!',
    });
  } else {
    res.status(400).json({
      error: 'Sending email notification failed.',
    });
  }
};
