import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  height: '40vh',
  bgcolor: 'white',
  backgroundColor: 'white',
  boxShadow: 24,
  p: 10,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [responseMesssage, setResponseMessage] = React.useState("");
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: ""
  });

  const handleCreateAccount = (event) => {

    event.preventDefault();
    //console.log(loginData);
    axios.post('https://localhost:7138/api/Auth/register', {
      ...loginData
    })
      .then(function (response) {
        localStorage.setItem('user name', response.data.username);
        
        setResponseMessage("");
        //isSignedin(true);
        console.log(response);
      })
      .catch(function (error) {
        setResponseMessage(error.response.data); 
        console.log(error.response.data);
      });

  }

  function updateLoginData(evt) {
    const value = evt.target.value;

    setLoginData({
      ...loginData,
      [evt.target.name]: value

    });
  }
  const handleLogin = (event) => {

    // setSignInModal(false);
       
    event.preventDefault();
      
      //console.log(loginData);
      axios.post('https://localhost:7138/api/Auth/login', {
        ...loginData
      })
        .then(function (response) {
          //isSignedin(true);
          
          
          sessionStorage.setItem('userData', JSON.stringify(response.data.username));
          sessionStorage.setItem('userToken', JSON.stringify(response.data.token));
          sessionStorage.setItem('userId', JSON.stringify(response.data.id));
          
         // setResponseMessage("");
       // console.log("logging from post res lambda")
         // console.log(signinModal);
         props.handlepropsSignIn();
          handleClose(true);
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
         // setResponseMessage(error.response.data);
        });

        handleClose();
      //  props.handlepropsSignIn();
           
    }
  return (
    <div>
         <Button onClick={handleOpen}>Log In</Button>
         <Modal 
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description">
     <div className='navSignInModal' style={{backgroundColor: 'white !important'}}>
       
        <div className='navSignInModal'>
          <Box
            style={style}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50vw' },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="navSignInModal">
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
      </Modal>
    </div>
  );
}