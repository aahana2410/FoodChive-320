import React from "react";
import './PageStyles.css'
import RecipeList from "./RecipeList";
import { useState } from "react";

function Search() {
  const [inputText, setInputText] = useState([]);
  const [query, setQuery] = useState([]);
  let inputHandler = (e) => {
    setInputText(e.target.value);

    if (e.key === "Enter") {
      setQuery(inputText);
    }
  };

  let clickHandler = () => {
    setQuery(inputText)
  };


  return (
    <center>
      <input type="text" name="search" onKeyUp={inputHandler} placeholder="Search Recipes..." />
      <input className="button" id="searchbutton" type="button" defaultValue="Search" onClick={clickHandler} />
      <RecipeList input={query} />
    </center>
  );
}

export default Search;
