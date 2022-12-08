import React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar, IconButton, Typography } from "@mui/material";
import { environmentURL } from "../../environementURL";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import RefreshIcon from '@mui/icons-material/Refresh';

function Discover() {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
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

  let message = "";
  let DRFilter = [];

  const search = recipes.filter((recipe) => {
    let foundDR = true;
    // Filter dietary restrictions
    if (user !== null) {
      message = "Our Recommendation Based On Your Dietary Restrictions:";
      DRFilter = JSON.parse(user).dietaryRestrictions;
    }
    else {
      message = "Our Recommendation:"
      return true;
    }

    for (let i = 0; i < DRFilter.length; i++) {
      if (recipe.filters.indexOf(DRFilter[i].toLowerCase()) === -1) {
        foundDR = false;
      }
    }
    return (foundDR);
  });

  let len = search.length;
  let rand = Math.floor(Math.random() * len);
  let showOne = [];
  if (len !== 0) {
    showOne.push(search[rand]);
  }

  let refresh = async () => {
    setSnackBarMessage("");
    await setOpen(true);
    setOpen(false);
    };

  let save = async (recipe) => {
    if (user === null) {
      // do nothing
    }
    else {
      if (JSON.parse(user).recipes.indexOf(recipe._id) !== -1) {
        //already been saved 
        return false;
      }
      let newUser = { ...JSON.parse(user) }; // Clones the user 
      let newSaved = [...newUser.recipes];
      newSaved.push(recipe._id);
      newUser.recipes = newSaved;
      await (dispatch(updateUser(newUser)));
      localStorage.setItem('user', JSON.stringify(newUser))
      return true;
    }
  };
 


  return (
    <div>
      <center>
      <Typography variant="h3">{message} </Typography>
      {showOne.map((currRecipe) =>
      (
        <RecipeCard
          recipe={currRecipe}
          handleSaveClick={save}
          check={true}
          toggleSnackBar={toggleSnackBar}
        ></RecipeCard>
      )
      )
      }
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message={snackBarMessage}
        action={action}
      />
      <IconButton onClick={refresh}><RefreshIcon fontSize="large" /></IconButton>
      </center>
    </div>
  );
}

export default Discover;
