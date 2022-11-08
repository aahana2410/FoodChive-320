import express from 'express';

import { saveRecipe, getSavedRecipes, deleteSavedRecipe } from '../controllers/savedRecipeControllers.js';

const router = express.Router();

router.get('/', getSavedRecipes);
router.post('/', saveRecipe);
router.delete('/:id', deleteSavedRecipe)

export default router;