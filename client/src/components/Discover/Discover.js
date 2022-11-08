import React from "react";
// import Recipe from "../Recipe/Recipe";
import RecipeCard from "../RecipeCard/RecipeCard.tsx";
import { useState, useEffect } from "react";

function Discover() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `/recipes`,
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

  return (
    recipes[0] && (
      <center key={recipes[0]._id}>
        <RecipeCard recipe={recipes[0]}></RecipeCard>
      </center>
    )
  );
}

export default Discover;
