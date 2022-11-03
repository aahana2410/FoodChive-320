import React from "react";
import Recipe from "./Recipe";
import { useState, useEffect } from "react";

function Discover() {
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

  return (
    recipes[0] && (
      <center key={recipes[0]._id}>
        <Recipe recipe={recipes[0]}></Recipe>
      </center>
    )
  );
}

export default Discover;
