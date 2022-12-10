import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { Box, Stack, AppBar, Toolbar, Typography, Button } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import "./Navbar.css";

// creates the navbar that is on the top of every page in the site
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const navTabs = ["Discover", "Search", "Help", "Saved", "Profile"];
  const tabIcons = [
    <ExploreIcon />,
    <SearchIcon />,
    <HelpIcon />,
    <BookmarksIcon />,
    <AccountCircleIcon />,
  ];
  const linkText = {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
  };

  const activeTab = ({ isActive }) => ({
    ...linkText,
    backgroundImage: isActive
      ? "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))"
      : "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))",
    borderRadius: 5,
  });

  return (
    <Box key="navbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          style={{ height: "10vh", minHeight: 32, maxHeight: 120 }}
        >
          <NavLink to="/" style={linkText}>
            <img
              src={require("../../images/FoodChiveIcon.png")}
              alt="Foodchive logo"
              style={{ height: "9vh", maxHeight: 84, marginRight: 5 }}
            />
            <Typography variant="h3">FoodChive</Typography>
          </NavLink>
          <Stack sx={{ marginLeft: "auto" }} spacing={2} direction="row">
            {navTabs.map((tab) => (
              <NavLink key={tab} style={activeTab} to={tab.toLowerCase()}>
                <Button variant="h4">
                  <Stack justifyContent="center" alignItems="center">
                    {tabIcons[navTabs.indexOf(tab)]} {tab}
                  </Stack>
                </Button>
              </NavLink>
            ))}

            {user ? (
              <Button variant="h4" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <>
                <NavLink to="/login" style={activeTab}>
                  <Button variant="h4">Login</Button>
                </NavLink>
                <NavLink to="/register" style={activeTab}>
                  <Button variant="h4">Register</Button>
                </NavLink>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
