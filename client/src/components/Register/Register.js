import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Fade,
  CircularProgress,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import { register, reset } from "../../features/auth/authSlice";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const Register = () => {
  const theme = useTheme();
  const paperStyle = {
    padding: "5vh 20px 5vh 20px",
    height: "70vh",
    width: 280,
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setLoading(false);
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // handles when the sign up button is pressed
  const handleClick = (e) => {
    e.preventDefault();
    checkAndSend();
  };

  // checks the input in all fields and if correct sends the register request
  const checkAndSend = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (name === "") {
      alert("Please enter a name");
    } else if (email === "") {
      alert("Please enter an email");
    } else if (email.indexOf("@") === -1) {
      alert("Please enter a valid email");
    } else if (password === "") {
      alert("Please enter a password");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
      setLoading(true);
    }
  };
  
  // handles the input in each text field
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handles when enter is pressed
  let handleEnter = (event) => {
    if (event.key === "Enter") {
      checkAndSend();
    }
  };

  return (
    <div data-testid="register">
      <ThemeProvider theme={theme}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Stack align="center" alignItems="center" spacing={1}>
              <Avatar
                style={{ backgroundColor: `${theme.palette.secondary.main}` }}
              ></Avatar>
              <Typography variant="h4">Sign Up</Typography>
            </Stack>
            <Stack spacing={2}>
              <TextField
                name="name"
                placeholder="Enter name"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="email"
                placeholder="Enter email"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="password"
                placeholder="Enter password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                onKeyUp={handleEnter}
                fullWidth
                required
              />
            </Stack>
            <Fade in={loading} unmountOnExit>
              <CircularProgress />
            </Fade>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={handleClick}
              fullWidth
            >
              Sign Up
            </Button>
          </Paper>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Register;
