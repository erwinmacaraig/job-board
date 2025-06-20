import { Request, Response, NextFunction } from 'express';
import { Mailer } from '../models/Mailer';
import { Utils } from '../models/Utils';
import { MyMongoDB } from '../models/MyMongoDB';
import { Db } from 'mongodb';

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
  const jobPoster = req.body.posted_by;
  const job_title = req.body.job_title;
  const job_description = req.body.description;

  mailer.setMailOptions(
    'erwin.macaraig@gmail.com',
    `New Job Posting: ${job_title}`,
    job_description,
  );
  // save to db
  const db: Db = MyMongoDB.getDB();
  const jobVacancyCollection = db.collection('vacancy_posts');
  let r = await jobVacancyCollection.insertOne({
    job_title: job_title,
    description: job_description,
    posted_by: jobPoster,
    approved: false,
  });
  console.log(r);
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

export const retrieveExternalJobs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const utils = new Utils();
    let listing = await utils.getJobPostingFromExternalSource();
    res.status(200).send(listing);
  } catch (error) {
    res.status(400).send('There was an error getting external job posts.');
  }
};

export const retrieveJobPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db: Db = MyMongoDB.getDB();
    const jobVacancyCollection = db.collection('vacancy_posts');
    let docs = await jobVacancyCollection.find();
    let posting = await docs.toArray();
    res.status(200).send(posting);
  } catch (error) {
    console.log(error);
    res.status(400).send('There was an error getting internal job posts.');
  }
};
