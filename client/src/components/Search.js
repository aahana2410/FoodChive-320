import React from "react";
import './PageStyles.css'
import RecipeList from "./RecipeList";
import { useState } from "react";
import Multiselect from "multiselect-react-dropdown"

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
      <div className ="checkbox">
              <Multiselect
  displayValue="key"
  groupBy="cat"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
    {
      cat: 'Cuisine',
      key: 'American'
    },
    {
      cat: 'Cuisine',
      key: 'Chinese'
    },
    {
      cat: 'Cuisine',
      key: 'Japanese'
    },
    {
      cat: 'Ingredients',
      key: 'Chicken'
    },
    {
      cat: 'Ingredients',
      key: 'Pork'
    },
    {
      cat: 'Ingredients',
      key: 'Beef'
    },
    {
      cat: 'Ingredients',
      key: 'Fish'
    },
    {
      cat: 'Type',
      key: 'Breakfast'
    },
    {
      cat: 'Type',
      key: 'Lunch'
    },
    {
      cat: 'Type',
      key: 'Dinner'
    },
    {
      cat: 'Type',
      key: 'Dessert'
    },
    {
      cat: 'Type',
      key: 'Appetizer & Snack'
    }
  ]}
  showCheckbox
/>
              </div>
      <RecipeList input={query} />
    </center>
    
  );
}

export default Search;
