import React from "react";
import { useState, useEffect } from "react";
import "./PageStyles.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { environmentURL } from "../../environementURL";

function RecipeList(fullQuery) {
  // FOR SNACKBAR
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();

  const toggleSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  // SNACKBAR ENDS

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
    let splitQuery = fullQuery.input.split('\n');
    let query = splitQuery[0];
    let foundSearch = false;
    if (query === "") { foundSearch = true; }
    foundSearch = (recipe.name.toLowerCase().includes(query.toLowerCase()));


    let foundCuisine = false;
    let foundIngredients = false;
    let foundFoodType = false;
    let foundSkill = false;
    let foundDR = true;
    // this handles when the page first loads.
    if (splitQuery.length === 1) {
      splitQuery.push('\n');
      splitQuery.push('\n');
      splitQuery.push('\n');
      splitQuery.push('\n');
      splitQuery.push('\n');
      foundCuisine = true;
      foundIngredients = true;
      foundFoodType = true;
      foundSkill = true;
      foundDR = true;
    }

    // Filter Cuisine
    let cuisineFilters = splitQuery[1].split(" ");
    if (cuisineFilters.length === 1) { foundCuisine = true; }
    for (let i = 1; i < cuisineFilters.length; i++) {
      if (recipe.filters.indexOf(cuisineFilters[i].toLowerCase()) !== -1) {
        foundCuisine = true;
      }
    }
    // Filter Ingredients
    let ingredientsFilters = splitQuery[2].split(" ");
    if (ingredientsFilters.length === 1) { foundIngredients = true; }
    for (let i = 1; i < ingredientsFilters.length; i++) {
      if (recipe.filters.indexOf(ingredientsFilters[i].toLowerCase()) !== -1) {
        foundIngredients = true;
      }
    }
    // Filter food type
    let foodTypeFilter = splitQuery[3].split(" ");
    if (foodTypeFilter.length === 1) { foundFoodType = true; }
    for (let i = 1; i < foodTypeFilter.length; i++) {
      if (recipe.filters.indexOf(foodTypeFilter[i].toLowerCase()) !== -1) {
        foundFoodType = true;
      }
    }
    // Filter Skill level
    let skillFilter = splitQuery[4].split(" ");
    if (skillFilter.length === 1) { foundSkill = true; }
    for (let i = 1; i < skillFilter.length; i++) {
      if (recipe.filters.indexOf(skillFilter[i].toLowerCase()) !== -1) {
        foundSkill = true;
      }
    }
    // Filter dietary restrictions
    let DRFilter = splitQuery[5].split(" ");
    if (DRFilter.length === 1) { foundDR = true; }
    for (let i = 1; i < DRFilter.length; i++) {
      if (recipe.filters.indexOf(DRFilter[i].toLowerCase()) === -1) {
        foundDR = false;
      }
    }
    return foundSearch && foundCuisine && foundIngredients && foundFoodType && foundSkill && foundDR;

  });

  let save = async (recipe) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    };
    let response = await fetch(
      `${environmentURL}/savedRecipes`,
      requestOptions
    );
    if (!response.ok) {
      const message = `You already saved this recipe!`;
      window.alert(message);
      return false;
    }
    return true;
  };

  return (

    <div>
      <div data-testid="recipe-list">
        {
          search.map((currRecipe) => (
            <div key={currRecipe.name} className="card">
              <RecipeCard recipe={currRecipe} handleCardClick={save} check={true} toggleSnackBar={toggleSnackBar}></RecipeCard>
            </div>))
        }
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message={snackBarMessage}
          action={action}
        />
      </div>

    </div>
  );
}

export default RecipeList;
