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

export default function SignIn(props) {



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
              <form >

                <TextField variant="outlined" type="text" name="username" label="Email" helperText={props.responseMesssage} onChange={props.updateLoginData}
                ></TextField>
                <TextField variant="outlined" label="Password" name="password" onChange={props.updateLoginData}></TextField>
                <div className="signinOptionsContainer">
                  <div ><button className="signinOptions" onClick={props.handleCreateAccount}>Create account</button> </div> 
                  <div ><button className="signinOptions2" onClick={props.handleLogin}>Already have an account? Log in</button></div>
                  <div ><button className="signinOptions2" onClick={props.handleStorage}>Get session storage</button></div>
                 

             </div>
              </form>
            </div>

          </Box>
        </div>
      </div>
    )
}