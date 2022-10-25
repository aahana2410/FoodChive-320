import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Discover from "./components/Discover";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <header className="header">
        <img src="./images/logo.png" className="header--logo" />
        <div className="header--tabs">
          <h2 className="tab">
            <Link to="/">Discover</Link>
          </h2>
          <h2 className="tab">
            <Link to="search">Search</Link>
          </h2>
          <Link to="profile">
            <img src="./images/profile" />
          </Link>
        </div>
      </header>
      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={Discover} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </main>
    </div>
  );
}
