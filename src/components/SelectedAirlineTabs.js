import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Reviews from './Reviews';
import Rating from '@mui/material/Rating';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { Input } from "@material-ui/core";
import axios from 'axios';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [ratingValue, setRatingValue] = React.useState(0);
  const [signedIn, isSignedin] = React.useState(false);
  const [signinModal, setSignInModal] = React.useState(false);
  const [responseMesssage, setResponseMessage] = React.useState("");
  const [effectUpdate, seteffectUpdate] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: sessionStorage?.getItem('userData')?.replace(/['"]+/g, '') ?? "",
    reviewText: "",
    dateCreated: Date,
    airlineId: props.data.id,
    starRating: 1.5,
    terminal : "",
    gate: "",
    userId: sessionStorage?.getItem('userId')?.replace(/['"]+/g, '') ?? "",

  });


  const [loginData, setLoginData] = React.useState({
    username: "",
    password: ""
  });

 useEffect(() => {
   var sesh = sessionStorage.getItem('userId');
   var userIdReplacedString = sesh?.replace(/['"]+/g, '');
  // console.log("repeat");
   
   if (sesh == null)
   {
     isSignedin(false);
    // setSignInModal();
    // console.log("was false")
   }
   else {
     //props.handlepropsSignIn();
    isSignedin(true);
    
    
    //console.log("sessions storage was true");
   }
   


   
 })

 
  const handleClick = () => {
   // console.log(props.data.reviews[0].firstName);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFormData({
      ...formData,
      starRating: newValue
    });

  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#000000"
    },
    "& .MuiRating-iconHover": {
      color: "#000000"
    }
  });
  const style = {
    marginTop: 3,
    margin: 1,
    padding: 5

  }

  
  function updateFormData(evt) {
    const value = evt.target.value;

    setFormData({
      ...formData,
      [evt.target.name]: value

    });
  }

  function updateLoginData(evt) {
    const value = evt.target.value;

    setLoginData({
      ...loginData,
      [evt.target.name]: value

    });
  }



  const handleSignIn = () => {
   
    setSignInModal(true);
  }

  const handleCreateAccount = (event) => {

    event.preventDefault();
    //console.log(loginData);
    axios.post('https://localhost:7138/api/Auth/register/', {
      ...loginData
    })
      .then(function (response) {
        localStorage.setItem('user name', response.data.username);
        
        setResponseMessage("");
        isSignedin(true);
      //  console.log(response);
      })
      .catch(function (error) {
        setResponseMessage(error.response.data); 
       // console.log(error.response.data);
      });

  }
  const handleLogin = (event) => {

  // setSignInModal(false);
     
  event.preventDefault();
    
   // console.log(loginData);
    axios.post('https://localhost:7138/api/Auth/login/', {
      ...loginData
    })
      .then(function (response) {
        isSignedin(true);
        
        console.log(response);
        sessionStorage.setItem('userData', JSON.stringify(response.data.username));
        sessionStorage.setItem('userToken', JSON.stringify(response.data.token));
        sessionStorage.setItem('userId', JSON.stringify(response.data.id));
        
       // setResponseMessage("");
        setSignInModal(false);
       // console.log(signinModal);
       props.handlepropsSignIn();
        
      })
      .catch(function (error) {
       // console.log(error);
        setResponseMessage(error.response.data);
      });
      
         
  }
 

  const handleSubmitForm = (event) => {
    console.log(formData)
    event.preventDefault();   
   // console.log(formData);
    axios.post('https://localhost:7138/api/Airline/', {
      ...formData
    })
      .then(function (response) {
        console.log(response);
        props.remount();
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(formData);

  }
  //seteffectUpdate(true);
  //(event, newValue) => {
  // setRatingValue(newValue);
  //}
  function setRatingValueChange(e, newValue) {
    setRatingValue(newValue);
    setFormData({
      ...formData,
      starRating: newValue
    });
  }
 
  if (signinModal == true) {
    return (

      <div className='signinModal'>
        
        <div className='signinModalContainer'>
          <Box

            sx={{
              '& .MuiTextField-root': { m: 1, width: '50vw' },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="reviewFormContainer">
              <form onSubmit={props.setData}>

                <TextField variant="outlined" type="text" name="username" label="Email" helperText={responseMesssage} onChange={updateLoginData}
                ></TextField>
                <TextField variant="outlined" label="Password" name="password" onChange={updateLoginData}></TextField>
                <div className="signinOptionsContainer">
                  <div ><button className="signinOptions" onClick={handleCreateAccount}>Create account</button> </div> 
                  <div ><button className="signinOptions2" onClick={handleLogin}>Already have an account? Log in</button></div>
                  
                 

             </div>
              </form>
            </div>

          </Box>
        </div>
      </div>


    )
  }


  return (

    <Box sx={{ width: '100%' }}>

   
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Reviews" {...a11yProps(0)} />
          <Tab label="About" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '30px', width: '40vw', height: 'auto' }} >

          {props.data.reviews.map((val, key) => {

            return (


              <Reviews data={val} averageRating={props.data} />


            )
          })}

        </Box>
        <div className="reviewForm">
          <div className="reviewFormTitle">
            <h1>Thoughts on {props.data.name}?</h1>

          </div>
          <Box

            sx={{
              '& .MuiTextField-root': { m: 1, width: '50vw' },
            }}
            noValidate
            autoComplete="off"
          >
            {signedIn ? <div className="reviewFormContainer">
              <form onSubmit={handleSubmitForm}>
                <div className="reviewFormRating">
                  <StyledRating
                    name="customized-color"
                    value={ratingValue}
                    onChange={setRatingValueChange}
                    sx={{ padding: 0, fontSize: 40 }}
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                </div>
                <div className='gateandTerminal'><TextField label="Gate" type="text" name="gate"  onChange={updateFormData} ></TextField><TextField label="Terminal" type="text" name="terminal"  onChange={updateFormData} ></TextField></div>
                <TextField label="Review" type="text" name="reviewText" multiline rows={7} fullWidth onChange={updateFormData} ></TextField>
                <IconButton type="submit"><AddCircleIcon sx={{ fontSize: 50 }} htmlType="submit"></AddCircleIcon></IconButton>
              </form>
            </div> : <div><button className="signinOptions" onClick={handleSignIn}>Sign in to write a review</button></div>
      }

          </Box>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
          <Typography style={style} variant="h4">
            {props.data.name}
          </Typography>
          <Typography style={style} variant="h7">
            {props.data.code}
          </Typography>
          <Box mr="5rem">
            <Typography style={style} variant="body1">
              {props.summary}
            </Typography>
          </Box>
        </Box>
      </TabPanel>
   
    </Box>
  );
}