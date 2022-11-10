import React from "react";
import '../RecipeList/PageStyles.css'
import RecipeList from "../RecipeList/RecipeList";
import cuisine from "./Cuisine";
import ingredients from "./Ingredients"
import foodType from "./Type"
import skill from "./Skill"
import dietaryRestrictions from "./DietaryRestrictions";
import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown"

function Search() {
  const [inputText, setInputText] = useState([]);
  const [query, setQuery] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState([]);
  const [ingredientsFilter, setIngredientsFilter] = useState([]);
  const [foodTypeFilter, setFoodTypeFilter] = useState([]);
  const [skillFilter, setSkillFilter] = useState([]);
  const [DRFilter, setDRFilter] = useState([]);

  // initialize each 
  useEffect(() => {
    setCuisineFilter("");
    setIngredientsFilter("");
    setFoodTypeFilter("");
    setSkillFilter("");
    setDRFilter("");
    setQuery("");
  }, []);
  // handle the search bar
  let searchBarHandler = (inputKey) => {
    setInputText(inputKey.target.value);
    if (inputKey.key === "Enter") {
      let sendQuery = inputText + '\n' + cuisineFilter + '\n' + ingredientsFilter + '\n' + foodTypeFilter + '\n' + skillFilter + '\n' + DRFilter;
      setQuery(sendQuery);
    }
  };
  // handle the search button
  let clickHandler = () => {
    let sendQuery = inputText + '\n' + cuisineFilter + '\n' + ingredientsFilter + '\n' + foodTypeFilter + '\n' + skillFilter + '\n' + DRFilter;
    setQuery(sendQuery);
  };
  // handle adding a filter
  let addFilter = (selectedList, selectedItem) => {
    switch (selectedItem.cat) {
      case "Cuisine":
        setCuisineFilter(cuisineFilter + " " + selectedItem.key);
        break;

      case "Ingredients":
        setIngredientsFilter(ingredientsFilter + " " + selectedItem.key);
        break;

      case "Type":
        setFoodTypeFilter(foodTypeFilter + " " + selectedItem.key);
        break;

      case "Skill Level":
        setSkillFilter(skillFilter + " " + selectedItem.key);
        break;

      case "Dietary Restrictions":
        setDRFilter(DRFilter + " " + selectedItem.key);
        break;

      default:
        alert("Catagory not recognized.")
        break;
    }
  }
  // handle removing a filter 
  let removeFilter = (selectedList, selectedItem) => {
    let removed = "";
    switch (selectedItem.cat) {
      case "Cuisine":
        removed = cuisineFilter.replace((" " + selectedItem.key), "");
        setCuisineFilter(removed);
        break;

      case "Ingredients":
        removed = ingredientsFilter.replace((" " + selectedItem.key), "");
        setIngredientsFilter(removed);
        break;

      case "Type":
        removed = foodTypeFilter.replace((" " + selectedItem.key), "");
        setFoodTypeFilter(removed);
        break;

      case "Skill Level":
        removed = skillFilter.replace((" " + selectedItem.key), "");
        setSkillFilter(removed);
        break;

      case "Dietary Restrictions":
        removed = DRFilter.replace((" " + selectedItem.key), "");
        setDRFilter(removed);
        break;

      default:
        alert("Catagory not recognized.")
        break;
    }
  }
  // handles automatically updating the page when a filter is selected or removed
  // without these weird comments, it has a warning since the clickHandler is outside of useEffect, but this does not affect performance. 
  useEffect(() => {
    clickHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuisineFilter]);
  useEffect(() => { clickHandler() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [ingredientsFilter]);
  useEffect(() => {
    clickHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodTypeFilter]);
  useEffect(() => {
    clickHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillFilter]);
  useEffect(() => {
    clickHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DRFilter]);

  return (
    <div data-testid="search">
      <center>
        <input type="text" name="search" onKeyUp={searchBarHandler} placeholder="Search Recipes..." />
        <input className="button" id="searchbutton" type="button" defaultValue="Search" onClick={clickHandler} />
        <div className="checkbox">
          <Multiselect
            placeholder="Cuisine"
            displayValue="display"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeFilter}
            onSearch={function noRefCheck() { }}
            onSelect={addFilter}
            options={cuisine}
            showCheckbox
          />
          <Multiselect
            placeholder="Ingredients"
            displayValue="display"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeFilter}
            onSearch={function noRefCheck() { }}
            onSelect={addFilter}
            options={ingredients}
            showCheckbox
          />
          <Multiselect
            placeholder="Type"
            displayValue="display"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeFilter}
            onSearch={function noRefCheck() { }}
            onSelect={addFilter}
            options={foodType}
            showCheckbox
          />
          <Multiselect
            placeholder="Skill Level"
            displayValue="display"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeFilter}
            onSearch={function noRefCheck() { }}
            onSelect={addFilter}
            options={skill}
            showCheckbox
          />
          <Multiselect
            placeholder="Dietary Restrictions"
            displayValue="display"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeFilter}
            onSearch={function noRefCheck() { }}
            onSelect={addFilter}
            options={dietaryRestrictions}
            showCheckbox
          />
        </div>
        <RecipeList input={query} />
      </center>
    </div>
  );
}
export default Search;
