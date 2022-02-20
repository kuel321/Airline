import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FlightIcon from '@mui/icons-material/Flight';
import Button from '@mui/material/Button';
import SignInModal from './SignInModal';

export default function MenuAppBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedIn, SetLoggedIn] = React.useState(null);
 const checkLogIn = sessionStorage.getItem('userData');
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [openModal, setOpenModal] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const checkStorage = () => {
    console.log(sessionStorage.getItem('userData'));
  }
  const modalOpen = () => {
    setOpenModal(true);
  }
 const handleSignIn = () => {
    props.handlePropSignIn();
}

  const style = {
    background: "white",
    text: "black",
    color: "black",
    shadows: ["none"]
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" style={style}>
        <Toolbar>
         <IconButton><FlightIcon /></IconButton>
         <div className="navTitle">
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: "black" }}>
            AirlineJohnny
          </Typography>
          </div>
          <div className='usernameNavbarContainer'><p className="usernameText">{props.username.replace(/['"]+/g, '')}</p></div>
         <IconButton edge="start"><Button edge="start" onClick={props.home}>Home </Button></IconButton> 
         <IconButton edge="start"><Button edge="start" onClick={props.myAccount}>My account </Button></IconButton> 
         <div>
         {checkLogIn ? <div> <IconButton edge="start"><Button edge="start" onClick={props.logOut}> 
         (Log out) </Button></IconButton> </div> : <div>  <SignInModal handlepropsSignIn={handleSignIn} /> </div>}
         
         </div>
        
       
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
