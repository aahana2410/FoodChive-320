import React from "react";
import { useSelector } from "react-redux";
import { dietaryRestrictions } from '../Search/filters/index.js';
import Multiselect from "multiselect-react-dropdown";
import { Container } from "@mui/material";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  let removeFilter = (selectedList, selectedItem) => {

    let key = selectedItem.key.toLowerCase();
    let index = user.dietaryRestrictions.indexOf(key);
    let newDR = [...user.dietaryRestrictions];
    newDR.splice(index, 1);

    // UPDATE USER WITH NEWDR
  }

  let addFilter = (selectedList, selectedItem) => {
    let key = selectedItem.key.toLowerCase();
    let newDR = [...user.dietaryRestrictions];
    newDR.push(key);

    // UPDATE USER WITH NEWDR
  }

  if (user !== null) {
    const email = user.email;
    const name = user.name;
    const DR = user.dietaryRestrictions;
    let preselect = [];
    for (let i = 0; i < dietaryRestrictions.length; i++) {
      if (DR.indexOf(dietaryRestrictions[i].key.toLowerCase()) !== -1) {
        preselect.push(dietaryRestrictions[i]);
      }
    }
    return <div>
      <center>
        <h2>
          {"Logged In As: "}
          {name}
          <div>
            {"Email: "} {email}
          </div>
          <br></br>
          <div>
            {"Update Your Dietary Restrictions: "}
          </div>
        </h2>
        <Container>
          <Multiselect
            placeholder="Dietary Restrictions"
            displayValue="display"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() { }}
            onRemove={removeFilter}
            onSearch={function noRefCheck() { }}
            onSelect={addFilter}
            options={dietaryRestrictions}
            showCheckbox
            selectedValues={preselect}
          />
        </Container>
      </center>
    </div>;

  }
  else {
    return <div>
      <center>
        <h2>
          You Are Not Logged In!
          <br></br>
          Go To The Login Or Register Page To Get Started!
        </h2>
      </center>
    </div>;
  }
}

export default Profile;
