import React from "react";
import '../RecipeList/PageStyles.css'
import RecipeList from "../RecipeList/RecipeList";
import recipeFilters from "./RecipeFilters";
import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown"

function Search() {
  const [inputText, setInputText] = useState([]);
  const [query, setQuery] = useState([]);

  useEffect(() => {
    setQuery('');
  }, []);

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
    <div data-testid="search">
      <center>
        <input type="text" name="search" onKeyUp={inputHandler} placeholder="Search Recipes..." />
        <input className="button" id="searchbutton" type="button" defaultValue="Search" onClick={clickHandler} />
        <div className="checkbox">
          <Multiselect
            displayValue="key"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={function noRefCheck() { }}
            onSearch={function noRefCheck() { }}
            onSelect={function noRefCheck() { }}
            options={recipeFilters}
            showCheckbox
          />
        </div>
        <RecipeList input={query} />
      </center>
    </div>
  );
}

export default Search;
