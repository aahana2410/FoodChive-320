import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
//import corsOptions from "./config/corsOptions.js";
import bodyParser from "body-parser";

import recipeRoutes from "./routes/recipeRoutes.js";
import savedRecipeRoutes from "./routes/savedRecipeRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/recipes", recipeRoutes);
app.use("/savedRecipes", savedRecipeRoutes);

app.use(
  cors({
    origin: [
      "https://foodchive.onrender.com",
      "http://localhost:3000",
      "http://localhost:5000",
    ],
  })
);
dotenv.config();

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
