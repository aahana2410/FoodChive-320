import * as crud from './crud.js';

window.onload = async function () {



  if (document.URL.includes("SearchResults.html")) {
    let recipe = await crud.readRecipes();
    let parent = document.getElementById("search")
    // console.log(recipe)
    let data = document.createElement("div");
    console.log(recipe)
    data.innerHTML = JSON.stringify(recipe);
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
