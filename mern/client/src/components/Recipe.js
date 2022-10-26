import React from "react";

function Recipe({ recipe }) {
  return (
    <div>
      <h1>{recipe.name}</h1>
      <img className="recipe-img" src={recipe.imgs[0]} />
      <h2>Preparation Time: {recipe.prep} Minutes</h2>
      <h2>Cooking Time: {recipe.cook} Minutes</h2>
      <h2>Servings: {recipe.servings}</h2>
      <ul>
        {recipe.ingredients.map((ingredient) => {
          return <li>{ingredient}</li>;
        })}
      </ul>
      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step) => {
          return <li>{step}</li>;
        })}
      </ol>
      <h4>
        <a href={recipe.src}>Source</a>
      </h4>
    </div>
  );
}

export default Recipe;
