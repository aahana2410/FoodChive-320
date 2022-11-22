import React from "react";
import {
  TextField,
  Autocomplete,
  createFilterOptions,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Box, Stack } from "@mui/system";
import { ClassNames } from "@emotion/react";

function SearchBar({ handleKeyUp, handleClick, handleEnter, inputValue }) {
  return (
    // <Container>
    <Stack direction="row" sx={{ marginBottom: 2 }}>
      <Button
        className="buttonRounded"
        variant="contained"
        size="small"
        onClick={handleClick}
        disableElevation={true}
      >
        <SearchIcon />
      </Button>
      <TextField
        className="inputRounded"
        placeholder="Search for Recipes"
        inputProps={{ "aria-label": "search" }}
        onChange={handleKeyUp}
        onKeyUp={handleEnter}
        value={inputValue}
        fullWidth={true}
        size="small"
      />
    </Stack>
    // </Container>
  );
}

export default SearchBar;
