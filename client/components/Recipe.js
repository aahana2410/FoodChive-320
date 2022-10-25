import React from "react";

function Recipe(prop) {
  const { recipe } = prop;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>Preparation Time: {props.prep} Minutes</h2>
      <h2>Cooking Time: {props.cook} Minutes</h2>
      <h2>Servings: {props.servings}</h2>
      <ul>
        {recipe.ingredients.map((ingred) => {
          return <li>{ingred}</li>;
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
