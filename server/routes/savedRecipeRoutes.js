import express from 'express';

import { saveRecipe } from '../controllers/savedRecipeControllers.js';

const router = express.Router();

router.post('/', saveRecipe);

export default router;