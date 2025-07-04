import app from './app';
import config from './config/config';
import { MyMongoDB } from './models/MyMongoDB';
import { XMLParser } from 'fast-xml-parser';
import { Db } from 'mongodb';

const updateLocalDBListingFromExternal = async () => {
  try {
    const url = 'https://mrge-group-gmbh.jobs.personio.de/xml';
    console.log('You are now about to fetch external dara');
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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

app.listen(config.port, async () => {
  const mongo = new MyMongoDB();
  // connect to mongodb
  await mongo.connect();
  // updateLocalDBListingFromExternal();

  console.log(`Listening for incomming connections on port ${config.port}`);
});
