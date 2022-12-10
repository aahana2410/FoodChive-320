import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Discover from "./components/Discover/Discover";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import Saved from "./components/SavedRecipes/Saved";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Help from "./components/Help/Help";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// sets themes across the site
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#436a27",
        light: "#719852",
        dark: "#173f00",
      },
      secondary: {
        main: "#4e276a",
        light: "#7c5198",
        dark: "#22003f",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <div className="background">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className="sparce">
                  <Home />
                </div>
              }
            />
            <Route
              exact
              path="discover"
              element={
                <div className="sparce">
                  <Discover />
                </div>
              }
            />
            <Route exact path="saved" element={<Saved />} />
            <Route exact path="search" element={<Search />} />
            <Route
              exact
              path="profile"
              element={
                <div className="sparce">
                  <Profile />
                </div>
              }
            />
            <Route exact path="help" element={<Help />} />
            <Route
              exact
              path="login"
              element={
                <div className="sparce">
                  <Login />
                </div>
              }
            />
            <Route
              exact
              path="register"
              element={
                <div className="sparce">
                  <Register />
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
