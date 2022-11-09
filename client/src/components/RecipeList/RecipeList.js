import React from "react";
import { useState, useEffect } from "react";
import "./PageStyles.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { environmentURL } from "../../environementURL";

function RecipeList(query) {
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

  const search = recipes.filter((el) => {
    if (query.input == "") {
      return true;
    }
    return el.name.toLowerCase().includes(query.input.toLowerCase());
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
      // window.alert(message);
      return false;
    }
    return true;
  };

  return (
    <div data-testid="recipe-list">
      {search.map((currRecipe) => (
        <div key={currRecipe.name} className="card">
          <RecipeCard
            recipe={currRecipe}
            handleCardClick={save}
            check={true}
            toggleSnackBar={toggleSnackBar}
          ></RecipeCard>
        </div>
      ))}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message={snackBarMessage}
        action={action}
      />
    </div>
  );
}

export default RecipeList;
