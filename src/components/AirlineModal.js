import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Button from "@material-ui/core/Button";

import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import firebase from 'firebase/compat/app';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import { useState } from 'react';
import { Utility } from '../utility';
import Reviews from './Reviews';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    padding: "10px 25px"
});

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {

    width: "80vw",
   
    height: "80%",
    bgcolor: 'white',
    border: 'none',
    p: 2,
    px: 4,
    pb: 3,
};
const about = (
    <div>About</div>
)

const photos = (
    <div>Photos</div>
)







export default function ModalUnstyledDemo(props) {

    const [data2, setData] = React.useState(null);

    const [open, setOpen] = React.useState(true);
    

    const handleOpen = () => {
        setOpen(props.openModal);
        console.log(props.data1.reviews);
        setData(props.data1.reviews);
        var x = true;

       

    }
    const handleClose = () => setOpen(false);
    const handleComponentPhotos = () => setBottomComponent(photos)
    const handleComponentsReview = () => setBottomComponent(null)
    const handleComponentAbout = () => setBottomComponent(about)
    const [bottomComponent, setBottomComponent] = React.useState(<div>
        {props.data1.reviews.map((val, key) => {
           console.log(val);
            return (
               
                
                <Reviews reviewDesc={val.reviewText} reviewTitle={val.firstName ?? "blank"} />
                
            )
        })}
    </div>)
  
    const handleSubmit = (e) => {
        e.preventDefault();


    }
    const handleInput = (e) => {
        e.preventDefault();
        setData(e.target.value);
    }
 

    return (
        <div>
  
      
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <div>
                        <div className="closeButton">
                            <Button onClick={handleClose}>
                                Back
                            </Button>
                         

                        </div>
                        <div className="modalContainer">
                     

                            <div className="headerContainer">
                                <p className="headerTitle">{props.airlineTitle}</p>
                                <p className="headerName">{props.headerName}</p>
                                <p className="headerAddress">{props.airlineAddress}</p>

                            </div>
                            <div className="reviewContainer">
                                <Box sx={{ flexGrow: 1 }}>
                                    <AppBar position="static">
                                        <Toolbar>


                                            <Button onClick={handleComponentsReview} color="inherit">Reviews</Button>
                                            <Button onClick={handleComponentPhotos} color="inherit">Photos</Button>
                                            <Button onClick={handleComponentAbout} color="inherit">About</Button>
                                        </Toolbar>
                                    </AppBar>
                                </Box>

                              
                                  
                                <div className="bottomComponent">
                                    {bottomComponent}

                                    <form onSubmit={handleSubmit}>
                                        <label> Review </label>
                                        <input type="text"
                                            onChange={handleInput} />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </Box>
            </StyledModal>
        </div>
    );
}
