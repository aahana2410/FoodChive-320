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
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme1 = createTheme({
    palette: {
      primary: {
        main: "#436A27",
        contrastText: "#EAEBED",
      },
      secondary: {
        main: "#D9B953",
        contrastText: "#EAEBED",
      },
    },
  });

  const theme2 = createTheme({
    palette: {
      primary: {
        main: "#5D781B",
        contrastText: "#EAEBED",
      },
      secondary: {
        main: "#FBCA6B",
        contrastText: "#EAEBED",
      },
    },
  });

  const theme3 = createTheme({
    palette: {
      primary: {
        main: "#ffcd29",
        contrastText: "#333333",
      },
      secondary: {
        main: "#FBCA6B",
        contrastText: "#333333",
      },
    },
  });

  return (
    <ThemeProvider theme={theme2}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="saved" element={<Saved />} />
          <Route exact path="discover" element={<Discover />} />
          <Route exact path="search" element={<Search />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
