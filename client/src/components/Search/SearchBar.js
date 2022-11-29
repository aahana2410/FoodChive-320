import React from "react";
import {
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";

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
        placeholder="Search Through Recipes"
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
