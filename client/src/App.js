import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Discover from "./components/Discover/Discover";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import Saved from "./components/SavedRecipes/Saved";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="Saved" element={<Saved />} />
          <Route exact path="Discover" element={<Discover />} />
          <Route exact path="Search" element={<Search />} />
          <Route exact path="Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
