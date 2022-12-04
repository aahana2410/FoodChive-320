import React from "react";
import { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar, IconButton, Typography } from "@mui/material";
import { environmentURL } from "../../environementURL";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";

function DiscoverRecipeList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
 
  
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
      if(user !== null){
       DRFilter = user.dietaryRestrictions;
      }
      if (DRFilter.length === 0) {
         message = "Our recomendation:"
        return true;
      }
    message = "Our Recommendation Based On Your Dietary Restrictions:";
      for (let i = 1; i < DRFilter.length; i++) {
        if (recipe.filters.indexOf(DRFilter[i].toLowerCase()) === -1) {
          foundDR = false;
        }
      }
    return (foundDR);
  });

  let len = search.length;
  let rand = Math.floor(Math.random() * len);  
  let showOne = [];
  if(len !== 0){
  showOne.push(search[rand]);
  }

  const state = useSelector((state) => state);
  let save = async (recipe) => {
    if (state.auth.user === null) {
      // do nothing
    }
    else {
      const savedRecipes = state.auth.user.recipes;
      if (savedRecipes.indexOf(recipe._id) !== -1) {
        //already been saved 
        return false;
      }

      let newUser = { ...state.auth.user }; // Clones the user 
      let newSaved = [...newUser.recipes];
      newSaved.push(recipe._id);
      newUser.recipes = newSaved;
      await (dispatch(updateUser(newUser)));
      window.location.reload(false);
      return true;
    }
  };
  

  return (
    <div>
      <Typography variant="h3">{message} </Typography>
        {showOne.map((currRecipe) => 
            (
            <RecipeCard
              recipe={currRecipe}
              handleCardClick={save}
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
    </div>
  );
}

export default DiscoverRecipeList;
