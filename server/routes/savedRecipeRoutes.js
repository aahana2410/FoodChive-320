import express from 'express';

import { saveRecipe, getSavedRecipes } from '../controllers/savedRecipeControllers.js';

const router = express.Router();

router.get('/', getSavedRecipes);
router.post('/', saveRecipe);

export default router;