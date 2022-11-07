import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";
import Discover from "./components/Discover";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Saved from "./components/Saved";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <div className="header">
          <Link to="/" className="header--logo">
            <img
              className="header--logo"
              src={require("./images/FoodChiveLogo.png")} alt = "logo"
            />
          </Link>
          <div className="header--tabs">
            <h2 className="tab">
              <Link to="discover">
                <img src = {require("./images/discover.png")} alt="discover" width="25rem" />
                Discover    
              </Link>
            </h2>
            <h2 className="tab">
              <Link to="search">
                <img src={require("./images/searchicon.png")} alt = "search" width="25rem" />
               Search    
                </Link>
            </h2>
            <h2 className="tab">
              <Link to="saved">
                <img src={require("./images/saved.png")} alt="saved" width="25rem" />
                Saved
              </Link>
            </h2>
            <h2 className="tab">
            <Link to="profile">
                <img src={require("./images/profile.png")} alt = "profile" width="30rem" />
                Profile
            </Link>
            </h2>
          </div>
        </div>
        <Switch>
          <Route exact path="/" element={<Home />} />
          <Route exact path="saved" element={<Saved />} />
          <Route exact path="discover" element={<Discover />} />
          <Route exact path="search" element={<Search />} />
          <Route exact path="profile" element={<Profile />} />
        </Switch>
      </Router>
    </div>
  );
}

// function callApi() {
//   fetch("/recipes", { method: "GET" })
//     .then((data) => data.json())
//     .then((json) => alert(JSON.stringify(json)));
// }

export default App;
