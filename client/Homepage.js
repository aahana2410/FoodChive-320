function search_recipes() {
    testSearch = document.getElementById('searchbar').value
    testSearch=testSearch.toLowerCase();
    window.sessionStorage.setItem("query", testSearch);
}

document.getElementById('search').innerHTML = window.sessionStorage.getItem("query");

