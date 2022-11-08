import React from "react";
import { useState, useEffect } from "react";
import './PageStyles.css'
import RecipeCard from "../RecipeCard/RecipeCard.tsx";

function RecipeList(query) {

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `/recipes`,
        {
          mode: 'no-cors',
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
    if (query.input === '') { return true; }
    return el.name.toLowerCase().includes(query.input.toLowerCase());
  });

  let save = async (recipe) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    };
    let response = await fetch('/savedRecipes', requestOptions)
    if (!response.ok) {
      const message = `You already saved this recipe!`;
      window.alert(message);
      return;
    }
  };

  return (
    < ul >
      {
        search.map((currRecipe) => (
          <div key={currRecipe.name} className="card">
            <RecipeCard recipe={currRecipe} handleCardClick={save} check={true}></RecipeCard>
          </div>
        )
        )
      }
    </ul >
  )
}

export default RecipeList
