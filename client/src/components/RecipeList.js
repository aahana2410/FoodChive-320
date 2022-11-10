import React from "react";
import { useState, useEffect } from "react";
import './PageStyles.css'
import SavedRecipeList from './SavedRecipeList';


function RecipeList(query) {
  
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

  const search = recipes.filter((el) => {
    if (query.input == '') { return false; }
    return el.name.toLowerCase().includes(query.input.toLowerCase());
  });

  let save = (recipe) => {
    /*
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React PUT Request Example' })
    };

    fetch('https://foodchive-api.onrender.com/api/SavedRecipes', requestOptions)
      .then(response => response.json())
      .then(data => recipe);
    */
    if (SavedRecipeList.list.includes(recipe._id)) {
      alert("Recipe is already saved.");
    }
    else {
      SavedRecipeList.list.push(recipe._id);
      alert("Saved " + recipe.name);
    }
  };

  return (
    <ul>
      {search.map((currRecipe) => (
        <div>
          <div>
            <h2>
              {currRecipe.name}
            </h2>
          </div>
          <img className="recipe-img" alt="recipe" src={currRecipe.imgs[0]} width='20%' />
          <h2>
            Save?
            <input className="savebutton" id="savebutton" type="button" defaultValue=" ✔ " onClick={event => save(currRecipe)} />
          </h2>
        </div>
      )
      )
      }
    </ul>
  )
}

export default RecipeList
