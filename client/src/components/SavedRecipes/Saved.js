import React from "react";
import { useState, useEffect } from "react";
import './PageStyles.css'

function Saved() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `/savedRecipes`,
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
  }, [recipes]);

  let deleteRecipe = async (recipe) => {
    const requestOptions = {
      method: 'DELETE',
    };
    await fetch('/savedRecipes/' + recipe._id, requestOptions)

  };

  return (
    <div data-testid="saved">
      <ul>
        <h2>
          <center>
            Your Saved Recipes:
          </center>
        </h2>
        <center>
          {recipes.map((currRecipe) => (
            <div key={currRecipe.name}>
              <div>
                <h2>
                  {currRecipe.name}
                </h2>
              </div>
              <img className="recipe-img" alt="recipe" src={currRecipe.imgs[0]} width='20%' />
              <h2>
                Delete?
                <input className="deletebutton" id="deletebutton" type="button" defaultValue=" X " onClick={async (event) => deleteRecipe(currRecipe)} />
              </h2>
            </div>))}
        </center>
      </ul>
    </div>
  );
}
export default Saved;