import express from "express";
import mongoose from "mongoose";

import SavedRecipe from "../models/savedRecipeModel.js";

const router = express.Router();

export const saveRecipe = async (req, res, next) => {
  const {
    name,
    src,
    imgs,
    steps,
    ingredients,
    fltr_cuisine,
    fltr_ingredients,
    fltr_restrictions,
    fltr_skill,
    fltr_type,
  } = req.body;
  const newRecipe = new SavedRecipe({
    name,
    src,
    imgs,
    steps,
    ingredients,
    fltr_cuisine,
    fltr_ingredients,
    fltr_restrictions,
    fltr_skill,
    fltr_type,
  });
  try {
    await newRecipe.save();
    res.header("Access-Control-Allow-Origin", "https://foodchive.onrender.com"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(201).json(newRecipe);
    next();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getSavedRecipes = async (req, res, next) => {
  try {
    const savedRecipes = await SavedRecipe.find();
    res.header("Access-Control-Allow-Origin", "https://foodchive.onrender.com"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(200).json(savedRecipes);
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteSavedRecipe = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No saved recipe with id: ${id}`);

  await SavedRecipe.findByIdAndRemove(id);
  res.header("Access-Control-Allow-Origin", "https://foodchive.onrender.com"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.json({ message: "Saved Recipe deleted successfully." });
  next();
};

export default router;
