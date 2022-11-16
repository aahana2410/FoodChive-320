import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, AppBar, Toolbar, Typography, Button } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Navbar.css";

function Navbar() {
  const navTabs = ["Discover", "Search", "Saved", "Profile"];
  const tabIcons = [
    <ExploreIcon />,
    <SearchIcon />,
    <BookmarksIcon />,
    <AccountCircleIcon />,
  ];
  const linkText = {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{ minHeight: 32, height: 96 }}>
          <Link to="/" style={linkText}>
            <img
              src={require("../../images/FoodChive192.png")}
              alt="Foodchive logo"
              style={{ minHeight: 32, maxHeight: 64 }}
            />
            <Typography variant="h3">Foodchive</Typography>
          </Link>
          <Stack sx={{ marginLeft: "auto" }} spacing={6} direction="row">
            {navTabs.map((tab) => (
              <Link to={tab.toLowerCase()} style={linkText}>
                <Button variant="h4">
                  <Stack justifyContent="center" alignItems="center">
                    {tabIcons[navTabs.indexOf(tab)]} {tab}
                  </Stack>
                </Button>
              </Link>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
