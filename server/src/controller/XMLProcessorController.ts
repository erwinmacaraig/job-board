import { Request, Response, NextFunction } from 'express';
import { XMLParser } from 'fast-xml-parser';
import { MyMongoDB } from '../models/MyMongoDB';
import { Db } from 'mongodb';

export const getExternalJobPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const url = 'https://mrge-group-gmbh.jobs.personio.de/xml';
  console.log('You are now about to fetch external dara');
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `There was an error getting response from the remote URL: ${response.status}`,
      );
    }
    const dataResponse = await response.text();
    // console.log(dataResponse);
    const parser = new XMLParser();
    let jsonData = parser.parse(dataResponse);
    const db: Db = MyMongoDB.getDB();
    const postCollections = db.collection('external_posts');
    const result = await postCollections.insertMany(
      jsonData['workzag-jobs']['position'],
    );
    res.send(jsonData['workzag-jobs']['position']);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
