import React from "react";
import { useState, useEffect } from "react";
import './PageStyles.css'
import RecipeCard from "../RecipeCard/RecipeCard.tsx";

function RecipeList(query) {

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `/recipes`,
        {
          mode: 'no-cors',
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

  const search = recipes.filter((el) => {
    if (query.input === '') { return true; }
    return el.name.toLowerCase().includes(query.input.toLowerCase());
  });

  let save = async (recipe) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    };
    await fetch('/savedRecipes', requestOptions)
  };

  return (
    < ul >
      {
        search.map((currRecipe) => (
          <div key={currRecipe.name} className="card">
            {/* <div>
              <h2>
                {currRecipe.name}
              </h2>
            </div>
            <img className="recipe-img" alt="recipe" src={currRecipe.imgs[0]} width='20%' />
            <h2>
              Save?
              <input className="savebutton" id="savebutton" type="button" defaultValue=" ✔ " onClick={async (event) => save(currRecipe)} />
            </h2> */}
            <RecipeCard recipe={currRecipe} handleSave={save}></RecipeCard>
          </div>
        )
        )
      }
    </ul >
  )
}

export default RecipeList
