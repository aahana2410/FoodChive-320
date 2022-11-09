import express from "express";

import Recipe from "../models/recipeModel.js";

const router = express.Router();

export const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.header("Access-Control-Allow-Origin", "https://foodchive.onrender.com"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export default router;
