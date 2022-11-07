import express from 'express';

import { getRecipes } from '../controllers/recipeControllers.js';

const router = express.Router();

router.get('/', getRecipes);

export default router;