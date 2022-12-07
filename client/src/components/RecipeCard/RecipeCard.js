import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";

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

export default function RecipeCard({
  recipe,
  handleCardClick,
  check,
  toggleSnackBar,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 450, bgcolor: "#fafafa" }}>
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
      <CardActions disableSpacing>
        {check && (
          <IconButton
            title="Save Recipe"
            aria-label="add to favorites"
            onClick={async () => {
              let valid = await handleCardClick(recipe);
              if(user ===null){
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
            onClick={async () =>{
              await handleCardClick(recipe);
              toggleSnackBar("Recipe Deleted");
            }
          }
          >
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
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
