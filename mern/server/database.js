import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class RecipesDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db('foodchive-app');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('recipes');
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  async getAllRecipes() {
    const res = await this.collection.find({}).toArray();
    return res;
  }
}