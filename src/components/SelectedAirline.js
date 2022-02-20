import React, { Component } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Example from '../media/crw.jpg'
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import Tab from './SelectedAirlineTabs';
import wikipedia from './Wikipedia';
import parse from 'html-react-parser';
import DirectionsIcon from '@mui/icons-material/Directions';
import StarRating from './StarRating';
import axios from 'axios';

export default class SelectedAirline extends Component {
    state = {
        wikiData: null,
        wikiImage: null,
        wikiLocation: null,
        averageReviews: null,
        reviewData: this.props.selectedData,

    }
    handleClick = () => {
        console.log(this.props.selectedData);
    }
   

    async componentDidMount() {

        //const res = await wikipedia.get("", { params: { page: this.props.selectedData.name } });

        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/` + this.props.selectedData.name);
        const data = await response.json();

        this.setState({
            wikiData: data.extract,
            wikiImage: data.thumbnail?.source,
            wikiLocation: data.coordinates,
            //reviewData: this.props.selectedData

        })
         console.log(this.props.selectedData);
       // console.log(this.state.averageReviews);

    }
    remount = () => {
        console.log("remount");
        axios.get('https://localhost:7138/api/Airline/airplane/' + this.props.selectedData.id).then(res => {
            this.setState({
                reviewData: res.data[0]
            })
            
            console.log(res.data);
        })
        //this.props.reMount();
    }

    handleSignIn = () => {
        this.props.handlePropSignIn();
    }

    render() {
        return (
            <div>

                <div className="selectedAirlinesBody">
                    <div className="selectedAirlinesBodyContainer">
                        <Box>
                           
                            <Box sx={{
                                boxShadow: 2,
                                width: '90vw',
                                height: 'auto',
                                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                color: (theme) =>
                                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                p: 1,
                                m: 1,
                                borderRadius: 2,

                                fontSize: '0.875rem',
                                fontWeight: '700',
                            }} >
                                <Box sx={{}}>
                                    <Grid direction="row"
                                        display="flex"
                                        justifyContent="flex-start"
                                    >
                                        <div>
                                            <img className="airportImage" src={this.state.wikiImage}></img>
                                        </div>
                                        <Box flexOrder="2" marginTop="4rem" marginLeft="4rem">
                                            <IconButton onClick={() => window.open(`https://www.google.com/maps/place/` + this.state.wikiLocation.lat + ',' + this.state.wikiLocation.lon)}><DirectionsIcon sx={{ fontSize: '50px' }} /></IconButton>
                                        </Box>

                                    </Grid>
                                    <Grid container sx={{ display: 'flex' }}>
                                        <div className="selectedAirportTitle">
                                            <div className="selectedAirportTitleText">
                                                {this.props.selectedData.name}
                                                <div className="selectedAirportTotalReviews">{this.props.selectedData.reviews.length + " Reviews"} </div>
                                                <div className="selectedAirportStarRating"><StarRating sx={{fontSize: 50}} rating={this.props.selectedData.averageRating} /> </div>


                                            </div>
                                        </div>
                                    </Grid>
                                </Box>
                                <Grid sx={{ width: '70vw', marginBottom: '3rem' }}>

                                    <div className="selectedAirlinesTab">
                                        <Tab  handlepropsSignIn={this.handleSignIn} remount={this.remount} data={this.state.reviewData} summary={this.state.wikiData} id={this.props.selectedData.id} />

                                    </div>
                                </Grid>

                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        )
    }
}
