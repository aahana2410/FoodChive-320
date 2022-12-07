import express from 'express';

import { getRecipes, getRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipe);

export default router;