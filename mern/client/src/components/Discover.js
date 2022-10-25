import React from "react";
import Recipe from "./Recipe";
import { useState, useEffect } from "react";

function Discover() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch("/recipes");

      if (!response.ok) {
        const message = "GET request failed";
        window.alert(message);
        return;
      }

      const recipes = await response.json();
      console.log(recipes);

      setRecipes(recipes);
    }

    getRecipes();

    return;
  }, [recipes.length]);
  return (
    <div>
      <Recipe recipe={recipes[0]}></Recipe>
    </div>
  );
}

export default Discover;
