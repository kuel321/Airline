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



export default function RecipeReviewCard(props) {
  

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 0}}>
      <CardHeader sx={{boxShadow: 0, boxShadow: 'none'}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.reviewName}
          </Avatar>
        }
        
        title={props.reviewTitle}
        subheader={props.reviewDate}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.reviewDesc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
       
      
       
      </CardActions>
     
    </Card>
  );
}