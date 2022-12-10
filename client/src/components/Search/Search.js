import React from "react";
import RecipeList from "../RecipeList/RecipeList";
import SearchBar from "./SearchBar";
import {
  cuisine,
  ingredients,
  type,
  skill,
  dietaryRestrictions,
} from "./filters/index.js";
import { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";

// search page
function Search() {
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [ingredientsFilter, setIngredientsFilter] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const user = localStorage.getItem("user");
  let userDR = "";
  if (user !== null) {
    let userRestrictions = JSON.parse(user).dietaryRestrictions;
    for (let i = 0; i < userRestrictions.length; i++) {
      userDR += " " + userRestrictions[i].toLowerCase();
    }
  }
  const [DRFilter, setDRFilter] = useState(userDR);

  // update the query with the search query and filters
  const changeQuery = () => {
    let sendQuery =
      inputText +
      "\n" +
      cuisineFilter +
      "\n" +
      ingredientsFilter +
      "\n" +
      foodTypeFilter +
      "\n" +
      skillFilter +
      "\n" +
      DRFilter;
    setQuery(sendQuery);
  };

  // handle the search bar
  let searchBarHandler = (event) => {
    setInputText(event.target.value);
  };

  //handle pressing enter 
  let enterHandler = (event) => {
    if (event.key === "Enter") changeQuery();
  };

  // handle the search button
  let clickHandler = () => {
    changeQuery();
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
        alert("Catagory not recognized.");
        break;
    }
  };
  // handle removing a filter
  let removeFilter = (selectedList, selectedItem) => {
    let removed = "";
    switch (selectedItem.cat) {
      case "Cuisine":
        removed = cuisineFilter.replace(" " + selectedItem.key, "");
        setCuisineFilter(removed);
        break;

      case "Ingredients":
        removed = ingredientsFilter.replace(" " + selectedItem.key, "");
        setIngredientsFilter(removed);
        break;

      case "Type":
        removed = foodTypeFilter.replace(" " + selectedItem.key, "");
        setFoodTypeFilter(removed);
        break;

      case "Skill Level":
        removed = skillFilter.replace(" " + selectedItem.key, "");
        setSkillFilter(removed);
        break;

      case "Dietary Restrictions":
        removed = DRFilter.replace(" " + selectedItem.key, "");
        setDRFilter(removed);
        break;

      default:
        alert("Catagory not recognized.");
        break;
    }
  };
  // handles automatically updating the page when a filter is selected or removed
  // without these weird comments, it has a warning since the clickHandler is outside of useEffect, but this does not affect performance.
  useEffect(() => {
    clickHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuisineFilter]);
  useEffect(
    () => {
      clickHandler();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ingredientsFilter]
  );
  useEffect(() => {
    clickHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodTypeFilter]);
  useEffect(() => {
    clickHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillFilter]);
  useEffect(() => {
    clickHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DRFilter]);

  let preselect = [];
  if (user !== null) {
    const DR = JSON.parse(user).dietaryRestrictions;
    for (let i = 0; i < dietaryRestrictions.length; i++) {
      if (DR.indexOf(dietaryRestrictions[i].key.toLowerCase()) !== -1) {
        preselect.push(dietaryRestrictions[i]);
      }
    }
  }
  return (
    <div data-testid="search" style={{ paddingTop: 20 }}>
      <center>
        <Container>
          <SearchBar
            handleKeyUp={searchBarHandler}
            handleClick={clickHandler}
            handleEnter={enterHandler}
            inputValue={inputText}
          />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="filters"
              id="filters"
            >
              <TuneIcon sx={{ marginRight: 1 }} />
              <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ paddingTop: 0, paddingLeft: 4, paddingRight: 4 }}
            >
              <div className="checkbox">
                <Multiselect
                  placeholder="Cuisine"
                  displayValue="display"
                  groupBy="cat"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={removeFilter}
                  onSearch={function noRefCheck() {}}
                  onSelect={addFilter}
                  options={cuisine}
                  showCheckbox
                />
                <Multiselect
                  placeholder="Ingredients"
                  displayValue="display"
                  groupBy="cat"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={removeFilter}
                  onSearch={function noRefCheck() {}}
                  onSelect={addFilter}
                  options={ingredients}
                  showCheckbox
                />
                <Multiselect
                  placeholder="Type"
                  displayValue="display"
                  groupBy="cat"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={removeFilter}
                  onSearch={function noRefCheck() {}}
                  onSelect={addFilter}
                  options={type}
                  showCheckbox
                />
                <Multiselect
                  placeholder="Skill Level"
                  displayValue="display"
                  groupBy="cat"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={removeFilter}
                  onSearch={function noRefCheck() {}}
                  onSelect={addFilter}
                  options={skill}
                  showCheckbox
                />
                <Multiselect
                  placeholder="Dietary Restrictions"
                  displayValue="display"
                  groupBy="cat"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={removeFilter}
                  onSearch={function noRefCheck() {}}
                  onSelect={addFilter}
                  options={dietaryRestrictions}
                  showCheckbox
                  selectedValues={preselect}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </Container>
        <RecipeList input={query} />
      </center>
    </div>
  );
}
export default Search;
