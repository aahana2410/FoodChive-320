import React, { useEffect } from "react";

function Recipe({ recipe }) {
  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>Preparation Time: {recipe.prep} Minutes</h2>
      <h2>Cooking Time: {recipe.cook} Minutes</h2>
      <h2>Servings: {recipe.servings}</h2>
      <ul>
        {recipe.ingredients.map((ingredient) => {
          return <li>{ingredient}</li>;
        })}
      </ul>
      <ol>
        {recipe.steps.map((step) => {
          return <li>{step}</li>;
        })}
      </ol>
    </div>
  );
}

export default Recipe;
