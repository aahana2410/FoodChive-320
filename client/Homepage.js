import * as crud from './crud.js';

window.onload = async function () {

  if (document.URL.includes("SearchResults.html")) {
    let recipe = await crud.readRecipes();
    recipe = recipe[0];
    let parent = document.getElementById("search")
    let ingredients = recipe.ingredients;
    let name = recipe.name;
    let steps = recipe.steps;
    console.log(recipe)
    let l1 = document.createElement("li");
    l1.innerHTML = `Recipe Name: ${name}`;
    let l2 = document.createElement("li");
    l2.innerHTML = `Instructions: ${steps[0]}`;
    let data = document.createElement("ul");
    data.appendChild(l1);
    ingredients.forEach((ingredient, i) => {
      let l = document.createElement("li");
      if (i === 0) {
        l.innerHTML = `Ingredients: ${ingredient}`;
      } else {
        l.innerHTML = ingredient;
      }
      data.appendChild(l);
    });
    data.appendChild(l2);
    parent.appendChild(data);

  } else {
    let searchbar = document.getElementById('searchbar');
    searchbar.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchbutton").click();
      }
    });
    let search = document.getElementById("searchbutton");
    search.addEventListener("click", e => {
      window.location.href = "SearchResults.html";
      search_recipes();
    })
  }
}
