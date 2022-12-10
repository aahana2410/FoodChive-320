import React from "react";
import {
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";

// the search bar that is used across the site
function SearchBar({ handleKeyUp, handleClick, handleEnter, inputValue }) {
  return (
    <Stack direction="row" sx={{ marginBottom: 2 }}>
      <Button
        className="buttonRounded"
        variant="contained"
        size="small"
        onClick={handleClick}
        disableElevation={true}
        style={{
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
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
  );
}

export default SearchBar;
