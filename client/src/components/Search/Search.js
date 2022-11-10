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
  const [skillFitler, setSkillFilter] = useState([]);
  const [DRFilter, setDRFilter] = useState([]);

  useEffect(() => {
    setCuisineFilter("");
    setIngredientsFilter("");
    setFoodTypeFilter("");
    setSkillFilter("");
    setDRFilter("");
    setQuery('');
  }, []);

  let inputHandler = (e) => {
    setInputText(e.target.value);
    if (e.key === "Enter") {
      let sendQuery = inputText + '\n' + cuisineFilter + '\n' + ingredientsFilter + '\n' + foodTypeFilter + '\n' + skillFitler + '\n' + DRFilter;
      setQuery(sendQuery);
    }
  };

  let clickHandler = () => {
    let sendQuery = inputText + '\n' + cuisineFilter + '\n' + ingredientsFilter + '\n' + foodTypeFilter + '\n' + skillFitler + '\n' + DRFilter;
    setQuery(sendQuery);
  };




  let addCuisine = (selectedList, selectedItem) => {
    setCuisineFilter(cuisineFilter + " " + selectedItem.key);
  }
  let addIngredients = (selectedList, selectedItem) => {
    setIngredientsFilter(ingredientsFilter + " " + selectedItem.key);
  }
  let addFoodType = (selectedList, selectedItem) => {
    setFoodTypeFilter(foodTypeFilter + " " + selectedItem.key);
  }
  let addSkill = (selectedList, selectedItem) => {
    setSkillFilter(skillFitler + " " + selectedItem.key);
  }
  let addDR = (selectedList, selectedItem) => {
    setDRFilter(DRFilter + " " + selectedItem.key);
  }

  let removeCuisine = (selectedList, selectedItem) => {
    let removed = cuisineFilter.replace((" " + selectedItem.key), "");
    setCuisineFilter(removed);
  }
  let removeIngredients = (selectedList, selectedItem) => {
    let removed = ingredientsFilter.replace((" " + selectedItem.key), "");
    setIngredientsFilter(removed);
  }
  let removeFoodType = (selectedList, selectedItem) => {
    let removed = foodTypeFilter.replace((" " + selectedItem.key), "");
    setFoodTypeFilter(removed);
  }
  let removeSkill = (selectedList, selectedItem) => {
    let removed = skillFitler.replace((" " + selectedItem.key), "");
    setSkillFilter(removed);
  }
  let removeDR = (selectedList, selectedItem) => {
    let removed = DRFilter.replace((" " + selectedItem.key), "");
    setDRFilter(removed);
  }

  return (
    <div data-testid="search">
      <center>
        <input type="text" name="search" onKeyUp={inputHandler} placeholder="Search Recipes..." />
        <input className="button" id="searchbutton" type="button" defaultValue="Search" onClick={clickHandler} />
        <div className="checkbox">

          <Multiselect
            placeholder="Cuisine"
            displayValue="key"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeCuisine}
            onSearch={function noRefCheck() { }}
            onSelect={addCuisine}
            options={cuisine}
            showCheckbox
          />
          <Multiselect
            placeholder="Ingredients"
            displayValue="key"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeIngredients}
            onSearch={function noRefCheck() { }}
            onSelect={addIngredients}
            options={ingredients}
            showCheckbox
          />
          <Multiselect
            placeholder="Type"
            displayValue="key"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeFoodType}
            onSearch={function noRefCheck() { }}
            onSelect={addFoodType}
            options={foodType}
            showCheckbox
          />
          <Multiselect
            placeholder="Skill Level"
            displayValue="key"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeSkill}
            onSearch={function noRefCheck() { }}
            onSelect={addSkill}
            options={skill}
            showCheckbox
          />
          <Multiselect
            placeholder="Dietary Restrictions"
            displayValue="key"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeDR}
            onSearch={function noRefCheck() { }}
            onSelect={addDR}
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
