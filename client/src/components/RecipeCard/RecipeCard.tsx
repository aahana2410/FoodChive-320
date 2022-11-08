import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function RecipeCard({ recipe, handleSave }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 450, bgcolor: "#fafafa" }}>
			<CardHeader
				// avatar={
				// 	<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
				// 		R
				// 	</Avatar>
				// }
				// action={
				// 	<IconButton aria-label="settings">
				// 		<MoreVertIcon />
				// 	</IconButton>
				// }
				title={recipe.name}
				// subheader="September 14, 2016"
			/>
			<CardMedia
				component="img"
				height="300"
				image={recipe.imgs[0]}
				alt="recipe"
			/>
			{/* <CardContent>
				{recipe.ingredients.map((ingredient) => {
					return (
						<Typography variant="body2" color="text.secondary" key={ingredient}>
							{ingredient}
						</Typography>
					);
				})}
			</CardContent> */}
			<CardActions disableSpacing>
				<IconButton
					title="Save Recipe"
					aria-label="add to favorites"
					onClick={() => handleSave(recipe)}
				>
					{/* <CheckIcon /> */}
					<BookmarkBorderIcon></BookmarkBorderIcon>
				</IconButton>
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
					{/* enter content here */}
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
