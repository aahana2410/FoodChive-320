import React from "react";
import { useState, useEffect } from "react";
import './PageStyles.css'

function RecipeList(query) {

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(
        `http://localhost:5000/recipes`,
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
    if (query.input == '') { return true; }
    return el.name.toLowerCase().includes(query.input.toLowerCase());
  });

  let save = async (recipe) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: recipe
    };
    const response = await fetch('http://localhost:5000/savedRecipes', requestOptions)
    console.log(response.json)
  };

  return (
    < ul >
      {
        search.map((currRecipe) => (
          <div>
            <div>
              <h2>
                {currRecipe.name}
              </h2>
            </div>
            <img className="recipe-img" alt="recipe" src={currRecipe.imgs[0]} width='20%' />
            <h2>
              Save?
              <input className="savebutton" id="savebutton" type="button" defaultValue=" ✔ " onClick={(event) => save(currRecipe)} />
            </h2>
          </div>
        )
        )
      }
    </ul >
  )
}

export default RecipeList
