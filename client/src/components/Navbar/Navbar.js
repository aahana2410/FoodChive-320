import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { Box, Stack, AppBar, Toolbar, Typography, Button } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const navTabs = ["Discover", "Search", "Saved", "Profile", "Help"];
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
              src={require("../../images/FoodChiveIcon.png")}
              alt="Foodchive logo"
              style={{ minHeight: 32, maxHeight: 64, marginRight: 5 }}
            />
            <Typography variant="h3">FoodChive</Typography>
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
            {user ? (
              <Button variant="h4" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/Login" style={linkText}>
                  <Button variant="h4">Login</Button>
                </Link>
                <Link to="/Register" style={linkText}>
                  <Button variant="h4">Register</Button>
                </Link>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
