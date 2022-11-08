import React from "react";
import { useState, useEffect } from "react";
import './PageStyles.css'
import RecipeCard from "../RecipeCard/RecipeCard.tsx";


function Saved() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `/savedRecipes`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const recipesList = await response.json();
      setRecipes(recipesList);
    }

    getRecipes();

    return;
  }, [recipes]);

  let deleteRecipe = async (recipe) => {
    const requestOptions = {
      method: 'DELETE',
    };
    await fetch('/savedRecipes/' + recipe._id, requestOptions)

  };

  return (
    <ul>
      <h2>
        <center>
          Your Saved Recipes:
        </center>
      </h2>
      <center>
        {recipes.map((currRecipe) => (
          <div key={currRecipe.name} className="card">
            <RecipeCard recipe={currRecipe} handleCardClick={deleteRecipe} check={false}></RecipeCard>
          </div>
        )
        )
        }
      </center>
    </ul>
  );
}
export default Saved;