import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Collapse from "@mui/material/Collapse";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

// handles expanding the card to full screen to view full recipe
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// creates the recipe card that each recipe is view as across the site
export default function RecipeCard({
  recipe,
  handleSaveClick,
  check,
  toggleSnackBar,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorPosition, setAnchorPosition] = React.useState(null);

  const user = useSelector((state) => state.auth.user);

  // handles expanding to view the ingredients
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //handles the click to open the expanded view to see the whole recipe 
  const handleCardClick = () => {
    setAnchorPosition({ top: 0, left: 500 });
  };

  // handles closing the open full recipe view
  const handleClose = () => {
    setAnchorPosition(null);
  };

  const open = Boolean(anchorPosition);
  const expand_title = expanded ? "Close Ingredients" : "Show Ingredients";

  return (
    <Card sx={{ maxWidth: 450, bgcolor: "#fafafa" }}>
      <CardActionArea title="Show Full Recipe" onClick={handleCardClick}>
        <CardHeader
          sx={{ textOverflow: "ellipsis", overflow: "hidden", display: "block" }}
          title={
            <Typography variant="h6" noWrap gutterBottom>
              {recipe.name}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="300"
          image={recipe.imgs[0]}
          alt="recipe"
        />
      </CardActionArea>
      <CardActions disableSpacing>
        {check && (
          <IconButton
            title="Save Recipe"
            aria-label="add to favorites"
            onClick={async () => {
              let valid = await handleSaveClick(recipe);

              if (user === null) {
                toggleSnackBar("You are not logged in!");
              }
              else if (valid) {
                toggleSnackBar("Saved Recipe!");
              } else {
                toggleSnackBar("You already saved this recipe!");
              }
            }}
          >
            <BookmarkBorderIcon></BookmarkBorderIcon>
          </IconButton>
        )}
        {!check && (
          <IconButton
            title="Delete Recipe"
            aria-label="delete from favorites"
            onClick={async () => {
              await handleSaveClick(recipe);
              toggleSnackBar("Recipe Deleted");
            }}
          >
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          title={expand_title}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Popover
          open={open}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          PaperProps={{ style: { width: '100%' } }}
        >
          <Typography align="right">
            {check && (
              <IconButton
                title="Save Recipe"
                aria-label="add to favorites"
                onClick={async () => {
                  let valid = await handleSaveClick(recipe);
                  if (user === null) {
                    toggleSnackBar("You are not logged in!");
                  }
                  else if (valid) {
                    toggleSnackBar("Saved Recipe!");
                  } else {
                    toggleSnackBar("You already saved this recipe!");
                  }
                }}
              >
                <BookmarkBorderIcon></BookmarkBorderIcon>
              </IconButton>
            )}
            {!check && (
              <IconButton
                title="Delete Recipe"
                aria-label="delete from favorites"
                onClick={async () => {
                  await handleSaveClick(recipe);
                  toggleSnackBar("Recipe Deleted!");
                }}

              >
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </IconButton>
            )}
            <IconButton
              title="Close Recipe Page"
              aria-label="close recipe popup"
              onClick={handleClose}
            >
              <CloseIcon fontSize="medium"> </CloseIcon>
            </IconButton>
          </Typography>
          <Typography align="center" variant="h4" noWrap gutterBottom>
            {recipe.name}
          </Typography>
          <Typography align="center">
            <img src={recipe.imgs[0]} alt="recipe-img" height="400"></img>
          </Typography>
          <Typography align="center" variant="h6"> Ingredients </Typography>
          {recipe.ingredients.map((ingredient) => {
            return (
              <Typography
                align="center"
                variant="body1"
                color="text.primary"
                key={ingredient}
              >
                {ingredient}
              </Typography>
            );
          })}
          <Typography align="left" variant="h6" sx={{ pl: 3 }}> Instructions </Typography>
          {recipe.steps.map((step, index) => {
            return (<Typography
              variant="body1"
              color="text.primary"
              key={step}
              sx={{ pl: 3, pr: 3, pb: 2 }}
            >
              {index + 1}. {step}
            </Typography>
            );
          })}
        </Popover>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          Ingredients
          {recipe.ingredients.map((ingredient) => {
            return (
              <Typography
                variant="body2"
                color="text.secondary"
                key={ingredient}
              >
                {ingredient}
              </Typography>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}