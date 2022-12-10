import asyncHandler from 'express-async-handler';

import Recipe from "../models/recipeModel.js";

// function to get recipes from the database
export const getRecipes = asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.header("Access-Control-Allow-Origin", "https://foodchive.onrender.com"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error('Failed to get recipes');
  }
});

export const getRecipe = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.find({ _id: req.body.id });
    res.header("Access-Control-Allow-Origin", "https://foodchive.onrender.com"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error('Failed to get recipe');
  }
});