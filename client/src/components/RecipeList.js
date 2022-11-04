import React from "react";
import { useState, useEffect } from "react";

function RecipeList(query) {

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
    return el.name.toLowerCase().includes(query.input);
  })

  return (
    <ul>
      {search.map((currRecipe) => (
        <div>
          <h2>{currRecipe.name}</h2>
          <img className="recipe-img" alt="recipe" src={currRecipe.imgs[0]} />
        </div>
      )
      )
      }
    </ul>
  )
}

export default RecipeList
