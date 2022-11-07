import React from "react";
import { useState, useEffect } from "react";
import SavedRecipeList from './SavedRecipeList';
import Recipe from "./Recipe";

function Saved() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `https://foodchive-api.onrender.com/api/recipes`,
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
  }, []);

  const search = recipes.filter((el) => {
    return SavedRecipeList.list.includes(el._id);
  });

  return (
    <ul>
      <h2>
        <center>
          Your Saved Recipes:
        </center>
      </h2>
      <center>
        {search.map((currRecipe) => (
          <div>
            <Recipe recipe={currRecipe}></Recipe>
          </div>
        )
        )
        }
      </center>
    </ul>
  );
}
export default Saved;