import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Avatar, Button, ThemeProvider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { login, reset } from "../../features/auth/authSlice";
import { Stack } from "@mui/system";
import { Typography, TextField } from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  const btnstyle = { margin: "8px 0" };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleClick = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  let handleEnter = (event) => {
    if (event.key === "Enter") {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
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
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleClick}
            style={btnstyle}
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
