import React from "react";
import { Container } from "@mui/material";


function Help() {
  return (
    <div>
      <center>
        <Container style={{ backgroundColor: "white" }}>
          {/* <Paper sx={{ maxWidth: "75vw", padding: 2 }}> */}
          <h1>Help Page</h1>
          <br />
          <br />
          <h2>Email Support</h2>
          <div>
            {" "}
            You can email us at foodchive@gmail.com. Please ensure to include
            your complete company name and contact information.
          </div>
          <div>
            {" "}
            Email requests are typically answered within 24 business hours.
          </div>
          <br />
          <br />
          <h2>Support Hours</h2>
          <div>
            {" "}
            Normal support hours are Monday through Friday, from 9:00 AM to 6:00
            PM EST.
          </div>
          <div>
            If you require after hours support, please fill our contact form or
            send us an email.
          </div>
          <br />
          <br />
          <h2>Contact Form</h2>
          <div>
            To ensure that we answer all of your questions and queries, please
            use our Contact Form down below.
          </div>
          {/* This comment hides a warning, but it is fine*/}
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title*/}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdH_FuB3AtquL8e_SmPqHRXPVqyf-FPSNp6zgwhY70w-AkTUw/viewform?embedded=true"
            width="708"
            height="843"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading…
          </iframe>
        </Container>
      </center>
    </div>
  );
}

export default Help;
