import express from 'express';

import SavedRecipe from '../models/savedRecipeModel.js';

const router = express.Router();

export const saveRecipe = async (req, res) => {
  console.log(req.body)
  const { name, src, imgs, steps, ingredients, fltr_cuisine, fltr_ingredients, fltr_restrictions, fltr_skill, fltr_type } = req.body;
  const newRecipe = new SavedRecipe({ name, src, imgs, steps, ingredients, fltr_cuisine, fltr_ingredients, fltr_restrictions, fltr_skill, fltr_type })
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const getSavedRecipes = async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find();
    res.status(200).json(savedRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default router;