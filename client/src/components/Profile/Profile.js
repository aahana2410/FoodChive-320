import React from "react";
import { useSelector } from "react-redux";


function Profile() {
  const user = useSelector((state) => state.auth.user);
if(user !== null)  {
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
else{
  return <div>
    <center>
      <h2>
        Not Logged In.
      </h2>
    </center>
  </div>;
}
}

export default Profile;
