import React from 'react'
import Rating from '@mui/material/Rating';

import StarIcon from '@mui/icons-material/Star';

import { styled } from '@mui/material/styles';
export default function StarRating(props) {
    const StyledRating = styled(Rating)({
        "& .MuiRating-iconFilled": {
          color: "#000000"
        },
        "& .MuiRating-iconHover": {
          color: "#000000"
        }
      });
    return (
        <div>
             <StyledRating
  name="customized-color"
  value={props.rating} readOnly
  sx={{padding: 0}}
  precision={0.5}
  icon={<StarIcon fontSize="inherit" />}
  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
/>
        </div>
    )
}
