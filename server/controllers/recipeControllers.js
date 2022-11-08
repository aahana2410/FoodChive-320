import express from 'express';

import Recipe from '../models/recipeModel.js';

const router = express.Router();

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;