import React from "react";
import Recipe from "./Recipe/Recipe";
import { useState, useEffect } from "react";
import { environmentURL } from "../../environementURL";

function Discover() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`${environmentURL}/recipes`, {
        method: "GET",
      });
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
    <div data-testid="discover">
      {recipes[0] && (
      <center key={recipes[0]._id}>
        <Recipe recipe={recipes[0]}></Recipe>
      </center>
      )}
    </div>
  );
}

export default Discover;
