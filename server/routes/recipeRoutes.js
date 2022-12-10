import express from 'express';

import { getRecipes, getRecipe } from '../controllers/recipeController.js';

// sets routes for the recipes
const router = express.Router();
router.get('/', getRecipes);
router.get('/:id', getRecipe);

export default router;