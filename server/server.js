import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

import recipeRoutes from "./routes/recipeRoutes.js";
import savedRecipeRoutes from "./routes/savedRecipeRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
dotenv.config();

app.use("/recipes", recipeRoutes);
app.use("/savedRecipes", savedRecipeRoutes);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
