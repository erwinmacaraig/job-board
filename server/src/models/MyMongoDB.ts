import { Db, MongoClient } from 'mongodb';
import config from '../config/config';

export class MyMongoDB {
  static connectionInstance: MongoClient;

  public async connect() {
    if (MyMongoDB.connectionInstance) {
      return;
    }
    try {
      const client = new MongoClient(config.mongoDBUrl);
      await client.connect();
      MyMongoDB.connectionInstance = client;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  public static getDB(): Db {
    if (!MyMongoDB.connectionInstance) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return MyMongoDB.connectionInstance.db();
  }
}
