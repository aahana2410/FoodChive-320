import React from 'react';
import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
  return (
    <div data-testid="navbar" className="header">
      <Link to="/" className="header--logo">
        <img
          className="header--logo"
          src={require("../../images/FoodChiveLogo.png")} alt="logo"
        />
      </Link>
      <div className="header--tabs">
        <h2 className="tab">
          <Link to="discover">
            <img src={require("../../images/discover.png")} alt="discover" width="25rem" />
            Discover
          </Link>
        </h2>
        <h2 className="tab">
          <Link to="search">
            <img src={require("../../images/searchicon.png")} alt="search" width="25rem" />
            Search
          </Link>
        </h2>
        <h2 className="tab">
          <Link to="saved">
            <img src={require("../../images/saved.png")} alt="saved" width="25rem" />
            Saved
          </Link>
        </h2>
        <h2 className="tab">
          <Link to="profile">
            <img src={require("../../images/profile.png")} alt="profile" width="30rem" />
            Profile
          </Link>
        </h2>
      </div>
    </div>
  )
}

export default Navbar

