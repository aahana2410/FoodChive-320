import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import { RecipesDatabase } from './database.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));
dotenv.config()

const recipesDB = new RecipesDatabase(process.env.DATABASE_URL);
await recipesDB.connect();

app.get("/recipes", async (req, res) => {
	const recipes = await recipesDB.getAllRecipes();
	res.json(recipes);
})

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});