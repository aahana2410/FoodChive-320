import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Avatar, Button, ThemeProvider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { login, reset } from "../../features/auth/authSlice";
import { Stack } from "@mui/system";
import { Typography, TextField, Fade, CircularProgress } from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const paperStyle = {
    padding: "10vh 20px 10vh 20px",
    height: "70vh",
    width: 280,
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // handle clicking the login button
  const handleClick = (e) => {
    e.preventDefault();
    checkAndSend();
  };

  // handle typing in any of the input boxes
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handles when the enter key is pressed
  let handleEnter = (event) => {
    if (event.key === "Enter") {
      checkAndSend();
    }
  };

  // checks that all information is entered correctly and sends the login request
  let checkAndSend = () => {
    if (email === "") {
      alert("Please enter an email");
    } else if (email.indexOf("@") === -1) {
      alert("Please enter a valid email");
    } else if (password === "") {
      alert("Please enter a password");
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
      setLoading(true);
    }
  };

  return (
    <div data-testid="login">
      <ThemeProvider theme={theme}>
        <Paper elevation={10} style={paperStyle}>
          <Stack align="center" alignItems="center" spacing={1}>
            <Avatar
              style={{ backgroundColor: `${theme.palette.secondary.main}` }}
            ></Avatar>
            <Typography variant="h4">Sign In</Typography>
          </Stack>
          <Stack spacing={2}>
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
            Sign In
          </Button>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default Login;
