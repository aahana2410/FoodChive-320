import express from "express";
import dotenv from "dotenv";
import { RecipesDatabase } from "./database.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("client"));
app.use(cors());
dotenv.config();

const recipesDB = new RecipesDatabase(process.env.DATABASE_URL);
await recipesDB.connect();

app.get("/api/recipes", async (req, res) => {
  const recipes = await recipesDB.getAllRecipes();
  res.json(recipes);
});

console.log(process.env.DATABASE_URL);
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
