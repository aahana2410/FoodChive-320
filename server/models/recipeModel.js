import mongoose from 'mongoose';

// model for recipes recieved from the database
const recipeSchema = mongoose.Schema(
  {
    _id: String,
    name: String,
    src: String,
    imgs: [String],
    steps: [String],
    ingredients: [String],
    fltr_cuisine: [String],
    fltr_ingredients: [String],
    fltr_restrictions: [String],
    fltr_skill: [String],
    fltr_type: [String],
  },
);

const Recipe = mongoose.model('recipes', recipeSchema);

export default Recipe;