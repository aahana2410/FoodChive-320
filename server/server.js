import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import recipeRoutes from "./routes/recipeRoutes.js"
import savedRecipeRoutes from "./routes/savedRecipeRoutes.js"

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/recipes", recipeRoutes);
app.use("/savedRecipes", savedRecipeRoutes);

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));