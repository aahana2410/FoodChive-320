import React from "react";
import Recipe from "./Recipe";
import { useState, useEffect } from "react";
import axios from "axios";

function Discover() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`/recipes/`, { method: "GET" });
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const recipesList = await response.json();
      console.log(recipesList);
      setRecipes(recipesList);
    }

    getRecipes();

    return;
  }, []);
  // async function getRecipes() {
  //   try {
  //     const response = await fetch(`/recipes`);
  //     console.log(response);
  //     const recipesList = response.json();
  //     setRecipes(recipesList);
  //   } catch (err) {
  //     window.alert(err);
  //   }
  // }
  // getRecipes();
  return <div>{recipes[0] && <Recipe recipe={recipes[0]}></Recipe>}</div>;
}

export default Discover;
