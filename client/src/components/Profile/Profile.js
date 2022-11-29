import React from "react";
import { useSelector } from "react-redux";


function Profile() {
  const user = useSelector((state) => state.auth.user);
  const email = user.email;
  const name = user.name;
  const savedRecipes = user.recipes;
  return <div>
    <center>
      <h2>
        {"Logged In As: "}
        {name}
        <div>
          {"Email: "} {email}
        </div>
        <div>
          {"Saved Recipe IDs: "}
          {savedRecipes}
        </div>
      </h2>
    </center>
  </div>;
}

export default Profile;
