import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import { dietaryRestrictions } from "../Search/filters/index.js";
import Multiselect from "multiselect-react-dropdown";
import { Container, Paper, Typography } from "@mui/material";

function Profile() {
  const dispatch = useDispatch();
  let user = localStorage.getItem("user");

  // handles when the user wants to remove a saved dietary restriction 
  const removeFilter = async (selectedList, selectedItem) => {
    user = localStorage.getItem("user");
    let key = selectedItem.key.toLowerCase();
    let index = JSON.parse(user).dietaryRestrictions.indexOf(key);
    let newDR = [...JSON.parse(user).dietaryRestrictions];
    newDR.splice(index, 1);
    let newUser = { ...JSON.parse(user) };
    newUser.dietaryRestrictions = newDR;
    await dispatch(updateUser(newUser));
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // handles when the user wants to add a new dietary restriction
  const addFilter = async (selectedList, selectedItem) => {
    user = localStorage.getItem("user");
    let key = selectedItem.key.toLowerCase();
    let newDR = [...JSON.parse(user).dietaryRestrictions];
    newDR.push(key);
    let newUser = { ...JSON.parse(user) };
    newUser.dietaryRestrictions = newDR;
    await dispatch(updateUser(newUser));
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  let preselect = [];
  if (user !== null) {
    const email = JSON.parse(user).email;
    const name = JSON.parse(user).name;
    const DR = JSON.parse(user).dietaryRestrictions;
    for (let i = 0; i < dietaryRestrictions.length; i++) {
      if (DR.indexOf(dietaryRestrictions[i].key.toLowerCase()) !== -1) {
        preselect.push(dietaryRestrictions[i]);
      }
    }
    return (
      <Paper sx={{ padding: 5 }}>
        <center>
          <h2>
            {"Logged In As: "}
            {name}
            <div>
              {"Email: "} {email}
            </div>
            <br></br>
            <div>{"Update Your Dietary Restrictions: "}</div>
          </h2>
          <Container>
            <Multiselect
              placeholder="Dietary Restrictions"
              displayValue="display"
              groupBy="cat"
              onKeyPressFn={function noRefCheck() {}}
              onRemove={removeFilter}
              onSearch={function noRefCheck() {}}
              onSelect={addFilter}
              options={dietaryRestrictions}
              showCheckbox
              selectedValues={preselect}
            />
          </Container>
        </center>
      </Paper>
    );
  } else {
    return (
      <Paper>
        <center>
          <Typography variant="h2">
            You Are Not Logged In!
            <br></br>
            Go To The Login Or Register Page To Get Started!
          </Typography>
        </center>
      </Paper>
    );
  }
}

export default Profile;
