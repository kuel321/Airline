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
    const [airlineName, setairlineName] = React.useState(null);
    const [updateEffect, setUpdateEffect] = React.useState(null);
    const [reviewText, setReviewText] = React.useState("asdf");
    const [editMode, setEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState({
        reviewText: "",
    })
    React.useEffect(() => {
        // console.log(props.data);
        axios.get('https://localhost:7138/api/Airline/airplane/' + props.data.airlineId).then(res => {
            setairlineName(res.data[0].name)

            //console.log(res.data)
        });
        axios.get('https://localhost:7138/api/Review/reviewid/' + props.data.id).then(res => {
            setReviewText(res.data?.result?.reviewText);
            //console.log(res.data.result.reviewText);
           // console.log(props.data)
        })
              

    //     axios.get('https://localhost:7138/api/Auth/user/' + sessionStorage.getItem('userId').replace(/['"]+/g, '')).then(res => {
    //         setReviewText(res.data.reviewText)
    // }
        
  })
    const StyledRating = styled(Rating)({
        "& .MuiRating-iconFilled": {
            color: "#000000"
        },
        "& .MuiRating-iconHover": {
            color: "#000000"
        }
    });

    const handleDelete = () => {
        if(window.confirm("Are you sure?")){

        
        axios.delete('https://localhost:7138/api/Review/delete/' + props.data.id);
        props.unMount();
        setUpdateEffect("a");
        props.unMount();
        }else {
            console.log("nothing")
        }
        
    }

    const handleUpdate = () => {
        setEditMode(true);


    }

    function update() {
        console.log(props.data)
        const response = axios.put('https://localhost:7138/api/Review/updatereview/' + props.data.id, {
            ...formData
        }).then(res => setEditMode(false))

    }
    function updateFormData(evt) {
        const value = evt.target.value;

        setFormData({
            ...formData,
            [evt.target.name]: value

        });
    }
    return (
        <Card sx={{ maxWidth: 350, minWidth: 250, boxShadow: 0, padding: 2 }}>
            <CardHeader sx={{ boxShadow: 0, boxShadow: 'none', padding: 0 }}

                title={airlineName}

            />
            <CardContent sx={{ padding: 0, maxWidth: 100 }}>
                <StyledRating
                    name="customized-color"
                    value={props.data.starRating} readOnly
                    sx={{ padding: 0 }}
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </CardContent>

            <CardContent sx={{ padding: 0, maxWidth: 100 }} >
                {editMode ? <div className="editBox">  <TextField variant="outlined" type="text" name="reviewText" label="Edit" onChange={updateFormData} multiline rows={7}
                ></TextField> <button className="signinOptions" onClick={update}>Update</button>  </div> : <div> <Typography variant="body2" color="text.secondary">
                    {reviewText}  </Typography> </div>}

                <IconButton><DeleteIcon onClick={handleDelete}></DeleteIcon></IconButton>
                <IconButton><EditIcon onClick={handleUpdate}></EditIcon></IconButton>

            </CardContent>
            <CardActions disableSpacing>



            </CardActions>

        </Card>
    );
}