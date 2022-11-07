import React from "react";
import { useState, useEffect } from "react";

function Saved() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `http://localhost:5000/savedRecipes`,
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
    <ul>
      <h2>
        <center>
          Your Saved Recipes:
        </center>
      </h2>
      <center>
        {recipes.map((currRecipe) => (
          <div>
            <div>
              <h2>
                {currRecipe.name}
              </h2>
            </div>
            <img className="recipe-img" alt="recipe" src={currRecipe.imgs[0]} width='20%' />
          </div>
        )
        )
        }
      </center>
    </ul>
  );
}
export default Saved;