import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";
import Discover from "./components/Discover";
import Search from "./components/Search";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <div className="header">
          <img
            src={require("./images/FoodChiveLogo.png")}
            className="header--logo"
          />
          <div className="header--tabs">
            <h2 className="tab">
              <Link to="/">Discover</Link>
            </h2>
            <h2 className="tab">
              <Link to="search">Search</Link>
            </h2>
            <Link to="profile">
              <img
                src={require("./images/profile.png")}
                className="header--profile"
              />
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" element={<Discover />} />
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
