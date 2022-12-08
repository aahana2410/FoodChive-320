import React from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Home() {
  return (
    <div>
      <center>
        <h1>Welcome to FoodChive!</h1>
        <h2>
          <br></br>
          Our goal is to help you find your all your favorite recipes!
          <br></br>
          <br></br>
          <ExploreIcon fontSize="large"></ExploreIcon>{"  "}Jump right in by heading to our Discover page to find a new recipe right away! 
          <br></br>
          <br></br>
          <SearchIcon fontSize="large"></SearchIcon>{"  "} Or head over to Search to find exactly what you are looking for! 
          <br></br>
          <br></br>
          <AccountCircleIcon fontSize = "large"></AccountCircleIcon>{"  "} Create an account to adjust your dietary restrictions and save your favorites!
          <br></br>
          <br></br>
          <BookmarksIcon fontSize="large"> </BookmarksIcon>{"  "}Check out the saved page to view all your saved recipes!
        </h2>
      </center>
    </div>
  );
}

export default Home;
