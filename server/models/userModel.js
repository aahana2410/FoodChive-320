import mongoose from 'mongoose';

// model for users from the database
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    recipes: [String],
    dietaryRestrictions: [String],
    image: String,
  }
);

const User = mongoose.model('User', userSchema);

export default User;