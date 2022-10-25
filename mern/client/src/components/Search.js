import React from "react";
import { useState } from "react";
import Recipe from "./Recipe";

function Search() {
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
      setRecipes(recipes);
    }

    getRecipes();

    return;
  }, [recipes.length]);
  return (
    <div>
      <input type="text" name="search" placeholder="Search Recipes..." />
      <input type="button" value="Search" />
      {recipes.map((recipe) => {
        return (
          <div>
            <h3>{recipe.name}</h3>
            <img src={recipe.imgs[0]} />
          </div>
        );
      })}
    </div>
  );
}

export default Search;
