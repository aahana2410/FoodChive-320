import React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar, IconButton, Grid, Typography, Paper } from "@mui/material";
import { environmentURL } from "../../environementURL";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";

// the helper file for the search page, which reads and filters the full recipe database
function RecipeList(fullQuery) {
  const dispatch = useDispatch();

  // FOR SNACKBAR
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();

  // handles showing a message when a recipe card is clicked
  const toggleSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpen(true);
  };

  // handles closing a recipe view
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

  // loads in the recipes from the database 
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

  //searches and filters the recipes that were loaded in
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
      foundDR
    );
  });

  // handles saving a recipe
  const user = localStorage.getItem("user");
  let save = async (recipe) => {
    if (user === null) {
      // do nothing
    } else {
      if (JSON.parse(user).recipes.indexOf(recipe._id) !== -1) {
        //already been saved
        return false;
      }
      let newUser = { ...JSON.parse(user) }; // Clones the user
      let newSaved = [...newUser.recipes];
      newSaved.push(recipe._id);
      newUser.recipes = newSaved;
      await dispatch(updateUser(newUser));
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
  };

  return (
    <div style={{ width: "75vw" }}>
      <Paper
        sx={{ marginTop: 5, marginBottom: 5, paddingLeft: 5, paddingRight: 5 }}
      >
        <Typography variant="h3">Results For: {fullQuery.input}</Typography>
      </Paper>
      <Grid container spacing={4}>
        {search.map((currRecipe) => (
          <Grid key={currRecipe.name.toLowerCase()} item xs={4}>
            <RecipeCard
              recipe={currRecipe}
              handleSaveClick={save}
              check={true}
              toggleSnackBar={toggleSnackBar}
            ></RecipeCard>
          </Grid>
        ))}
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message={snackBarMessage}
          action={action}
        />
      </Grid>
    </div>
  );
}

export default RecipeList;
