import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

export default function RecipeReviewCard(props) {

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#000000"
    },
    "& .MuiRating-iconHover": {
      color: "#000000"
    }
  });

 
  return (
    <Card sx={{ maxWidth: 250, minWidth: 250, boxShadow: 0, padding: 2}}>
      <CardHeader sx={{boxShadow: 0, boxShadow: 'none', padding: 0}}
       
        title={props.data.firstName}
     //  {...console.log(props.data)}
      />
      <CardContent sx={{padding: 0, maxWidth: 100}}>
      <StyledRating
  name="customized-color"
  value={props.data.starRating} readOnly
  sx={{padding: 0}}
  precision={0.5}
  icon={<StarIcon fontSize="inherit" />}
  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
/>
</CardContent>
      
      <CardContent sx={{padding: 0, maxWidth: 100}} >

        <Typography variant="body2" color="text.secondary">
         {props.data.reviewText} 
        
        </Typography>
      
      </CardContent>
      <CardActions disableSpacing>
       
      
       
      </CardActions>
     
    </Card>
  );
}