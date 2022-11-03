import React from "react";
import { useState, useEffect } from "react";

function Search() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`/api/recipes`, { method: "GET" });
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
    <center>
      <input type="text" name="search" placeholder="Search Recipes..." />
      <input type="button" value="Search" />
      {recipes.map((recipe) => {
        return (
          <div>
            <h3>{recipe.name}</h3>
            <img className="recipe-img" src={recipe.imgs[0]} alt="recipe"/>
          </div>
        );
      })}
    </center>
  );
}

export default Search;
