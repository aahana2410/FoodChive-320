import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Discover from "./components/Discover/Discover";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import Saved from "./components/SavedRecipes/Saved";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="saved" element={<Saved />} />
          <Route exact path="discover" element={<Discover />} />
          <Route exact path="search" element={<Search />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
