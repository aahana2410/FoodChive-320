import React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { environmentURL } from "../../environementURL";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";


function RecipeList(fullQuery) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`${environmentURL}/recipes`, {
        //mode: "no-cors",
        method: "GET",
      });
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
      }
      const recipesList = await response.json();
      setRecipes(recipesList);
    }

    getRecipes();

    return;
  }, []);

  const search = recipes.filter((recipe) => {
    // Check Search Query
    let splitQuery = fullQuery.input.split("\n");
    let query = splitQuery[0];
    let foundSearch = false;
    // if there is no query, show every recipe
    if (query === "") {
      foundSearch = true;
    } else {
      foundSearch = recipe.name.toLowerCase().includes(query.toLowerCase());
    }

    // Check if the recipe is in the users saved list
    let isSaved = false;
    if (user !== null) {
      if (user.recipes.indexOf(recipe._id) !== -1) {
        isSaved = true;
      }
    }
    let foundCuisine = true;
    let foundIngredients = true;
    let foundFoodType = true;
    let foundSkill = true;
    let foundDR = true;
    let firstLoad = false;

    // this handles when the page first loads.
    if (splitQuery.length === 1) {
      firstLoad = true;
    }

    if (!firstLoad) {
      foundCuisine = false;
      foundIngredients = false;
      foundFoodType = false;
      foundSkill = false;
      foundDR = true;

      // Filter Cuisine
      let cuisineFilters = splitQuery[1].split(" ");
      if (cuisineFilters.length === 1) {
        foundCuisine = true;
      }
      for (let i = 1; i < cuisineFilters.length; i++) {
        if (recipe.filters.indexOf(cuisineFilters[i].toLowerCase()) !== -1) {
          foundCuisine = true;
        }
      }
      // Filter Ingredients
      let ingredientsFilters = splitQuery[2].split(" ");
      if (ingredientsFilters.length === 1) {
        foundIngredients = true;
      }
      for (let i = 1; i < ingredientsFilters.length; i++) {
        if (
          recipe.filters.indexOf(ingredientsFilters[i].toLowerCase()) !== -1
        ) {
          foundIngredients = true;
        }
      }
      // Filter food type
      let foodTypeFilter = splitQuery[3].split(" ");
      if (foodTypeFilter.length === 1) {
        foundFoodType = true;
      }
      for (let i = 1; i < foodTypeFilter.length; i++) {
        if (recipe.filters.indexOf(foodTypeFilter[i].toLowerCase()) !== -1) {
          foundFoodType = true;
        }
      }
      // Filter Skill level
      let skillFilter = splitQuery[4].split(" ");
      if (skillFilter.length === 1) {
        foundSkill = true;
      }
      for (let i = 1; i < skillFilter.length; i++) {
        if (recipe.filters.indexOf(skillFilter[i].toLowerCase()) !== -1) {
          foundSkill = true;
        }
      }

      // Filter dietary restrictions
      let DRFilter = splitQuery[5].split(" ");
      if (DRFilter.length === 1) {
        foundDR = true;
      }
      for (let i = 1; i < DRFilter.length; i++) {
        if (recipe.filters.indexOf(DRFilter[i].toLowerCase()) === -1) {
          foundDR = false;
        }
      }
    }
    return (
      foundSearch &&
      foundCuisine &&
      foundIngredients &&
      foundFoodType &&
      foundSkill &&
      foundDR &&
      isSaved
    );
  });


  let deleteRecipe = async (recipe) => {
    // TODO 
    let newSaved = [...user.recipes]; // Clones the saved recipe list
    let index = newSaved.indexOf(recipe._id);
    if (index !== -1) {
      newSaved.splice(index, 1);   // Deletes the recipe id from the saved recipe list
    }
    let newUser = { ...user };
    newUser.recipes = newSaved;
    // update user to newuser
    await(dispatch(updateUser(newUser)));
    window.location.reload(false);
  };

  return (
    <div>
      <div data-testid="saved">
        <center>
          {search.map((currRecipe) => (
            <div key={currRecipe.name} className="card">
              <br></br>
              <RecipeCard
                recipe={currRecipe}
                handleCardClick={deleteRecipe}
                check={false}
              ></RecipeCard>
            </div>
          ))}
        </center>
      </div>
    </div>
  );
}

export default RecipeList;
