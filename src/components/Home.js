import React, { Component } from 'react'
import Navbar from './Navbar'
import AirplaneData from './json/airports.json'
import Airports from './Airports';
import axios from 'axios'
import losangeles from '../media/losangeles.jpg'
import houston from '../media/houston.jpg'
import sanfrancisco from '../media/sanfrancisco.jpg'
import atlanta from '../media/atlanta.jpg'
import dallas from '../media/dallas.jpg'
import losvegas from '../media/losvegas.jpg'
import orlando from '../media/orlando.jpg'
import queens from '../media/queens.jpg'
import denver from '../media/denver.jpg'
import chicago from '../media/chicago.jpg'
import Input from '@mui/material/Input';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AirlineModal from './AirlineModal';
import firebase from 'firebase/compat/app';
import config from '../firebaseConfig';
import Navbar3 from './Navbar3';
import { Button } from '@mui/material';
import { useSpring, animated } from 'react-spring'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SignIn from './SignIn';
import SelectedAirline from './SelectedAirline';
import { Reviews } from '@mui/icons-material';
import ReviewNav from './ReviewNav';
import FlightIcon from '@mui/icons-material/Flight';

import ReactLoading from 'react-loading';

export default class Home extends Component {

    state = {
        mainAirlines: null,
        trending: [
            'ATL',
            'ORD',
            'LAX',
            'DFW',
            'DEN',
            'JFK',
            'SFO',
            'IAH',
            'MCO',
            'LAS'
        ],
        trendingImages: [
            atlanta,
            chicago,
            losangeles,
            dallas,
            denver,
            queens,
            sanfrancisco,
            houston,
            orlando,
            losvegas

        ],
        pushedTrending: null,
        airplaneDB: [],
        airlineArray: null,
        AirlineData: "",
        search: "",
        FetchedData: [],
        isLoaded: false,
        modalData: null,
        openModal: true,
        randomKey: Math.random(),
        AirlineView: null,
        selectedData: null,
        signedIn: null,
        logInView: false,
        username: "Not signed in",
        accountView: false,
        userData: null,
        deletedReview: false,

    };
    handleTrending = (i) => {

        this.setState({
            selectedData: i,
            AirlineView: true
        })
        console.log(this.state.selectedData)
    }

    handleAccountView = () => {
        /*
        this.setState({
            logInView: false,
            AirlineView: false,
            accountView: true,
        })
        */
       this.fetchUserData();
    }


    filterAirlines() {
        var pushedData = [];

        for (let i = 0; i < this.state.trending.length; i++) {
            const result = this.state.FetchedData.filter((x) => x.code.includes(this.state.trending[i]))
            //console.log(result[0].code.toString())

            pushedData.push(<div className="trendingZoom">



                <Airports name={result[0].code.toString()} selectedTrending={this.handleTrending.bind(null, result[0])} data1={this.state.FetchedData[0]} description={result[0].name.toString()} img={this.state.trendingImages[i]} />
            </div>);

        }
        this.setState({
            mainAirlines: pushedData,
        })
    }

    async fetchApi() {

        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({

            AirlineData: data[0].title,
            FetchedData: data,
            isLoaded: true
        })

    }
    filterIt = () => {
        const x = this.state.FetchedData.filter(z => z.length > 6)
        //console.log(x);
    }
    handleSearch = (val) => {


        this.setState({
            selectedData: val,
            AirlineView: true
        })



    }
    handleHome = () => {
        this.setState({
            AirlineView: false,
            accountView: false,
            
        })
    }
   async fetchUserData() {
     //  console.log('my account clicked')
       this.setState({
           isLoaded: false,
       })
       axios.get('https://localhost:7138/api/Auth/user/' + sessionStorage.getItem('userId').replace(/['"]+/g, '')).then(res => {
          // console.log(res);
           this.setState({
               userData: res.data,
               isLoaded: true,
               AirlineView: false,
               SelectedAirline: false,
               accountView: true,

           })
       })
      // console.log(this.state.userData)
      
       
   }
    async myAccount() {
        
       await this.fetchUserData();
    }
    
    async logAxios() {
        axios.get("https://angry-panther-0.loca.lt").then(res => {
            const data = res.data
            this.setState({
                FetchedData: data,
                isLoaded: true,
            })
        })
    }

    async componentDidMount() {

        //https://angry-panther-0.loca.lt

        // const url = "https://192.168.68.104:45455/api/airline/country/united%20states";
        //const url = "https://192.168.68.104:45455/api/airline/country/United%20States";
        const url = "https://localhost:7138/api/airline/country/United%20States";
        const response = await fetch(url);
        const data = await response.json();

        this.setState({


            FetchedData: data,
            isLoaded: true,
            username: sessionStorage.getItem('userData') ?? "Not signed in"
        })



        this.filterAirlines();


        //console.log(data)
    }
    
    handleSignIn = () => {
        this.setState({
            username: sessionStorage.getItem('userData'),
            
        })
      //  console.log("works");
    }
    logOut = () => {
        sessionStorage.clear();
        this.setState({
            username: "Not signed in",
        })
    }
    unMount = () => {
       // console.log("works");
       this.fetchUserData();
       
    }
    reMount = ()  => {
      //  console.log('nothing')
    }
    render() {


        if (!this.state.isLoaded) {
            return <div className="loading"><FlightIcon /><ReactLoading type='spin' color='blue'/></div>
        }

        if (this.state.AirlineView) {
            return <div>
                <div className="navigation">
                    <div className="navigationContainer" ><Navbar handlePropSignIn={this.handleSignIn} logOut={this.logOut} home={this.handleHome} myAccount={this.handleAccountView} username={this.state.username}/></div></div>
                <SelectedAirline handlePropSignIn={this.handleSignIn} reMount={this.reMount} selectedData={this.state.selectedData} />
            </div>
        }
        if (this.state.logInView)
        {
            return <div>
            <Navbar handlePropSignIn={this.handleSignIn} home={this.handleHome} myAccount={this.handleAccountView} username={this.state.username}/>
            <SignIn />
        </div>
        }
        if (this.state.accountView) {
            return (
                <div>
                    <div className="navigation">
                        <div className='navigationContainer'>
  <Navbar handlePropSignIn={this.handleSignIn} logOut={this.logOut} home={this.handleHome} username={this.state.username} myAccount={this.handleAccountView}/>
  </div>
  </div>
  <div className="mainBody">
                    <div className="searchContainer">

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


                        }} >
                         <div className="accountViewTitle" >
                             My Reviews
                         </div>
                            <div className="trendingAirports">
                                <div className="trendingAirportsContainer">
                                   
                                                   {this.state.userData?.map((val, key) => {
                                                       return (
                                                           <div key={key}>
                                                               
                                                               {val.reviews.map((sub, i) => {
                                                                   return (
                                                                       <ReviewNav unMount={this.unMount} data={sub} />
                                                                   )
                                                               })}
                                                               
                                                               
                                                                </div>
                                                       )
                                                   })}





                                </div>
                            </div>
                        </Box>

                    </div>


                </div>
                </div>
            )
        }
        return (
            <div>

                <div className="navigation">
                    <div className="navigationContainer" ><Navbar handlePropSignIn={this.handleSignIn} logOut={this.logOut} username={this.state.username} myAccount={this.handleAccountView} /></div></div>


                <div className="mainBody">
                    <div className="searchContainer">

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


                        }} >
                            <div className="searchBox">
                                <h1 className="searchBoxTitle">Make sure it's good to go before you go</h1>
                                <h4 className="searchBoxParagraph">Search for restroom reviews here</h4>
                                <div className="searchInput">
                                    <form className="searchForm">
                                        <input type="text" className="searchText"
                                            placeholder="Search.."
                                            onChange={(event) => {
                                                event.preventDefault();
                                                this.setState({ search: event.target.value });

                                            }}
                                        />
                                        <div className="resultBox">
                                            {this.state.FetchedData.filter((val) => {
                                                if (this.state.search == "") {
                                                    return;
                                                } else if (val?.code?.toLowerCase().includes(this.state.search.toLowerCase())) {
                                                    return val;
                                                }
                                            }).map((val, key) => {
                                                return (
                                                    <div className="resultItem" key={key}>
                                                        <Button sx={{ fontSize: 'inherit' }} onClick={this.handleSearch.bind(null, val)}>{val.code} </Button>
                                                        {/*  <AirlineModal  airlineID={val.id} airlineTitle={val.code} data1={val} airlineAddress={val.city + "," + "" + val.state} thiskey={key} headerName={val.name} /> */}

                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </form>

                                </div>

                            </div>
                            <div className="trendingAirports">
                                <div className="trendingAirportsContainer">
                                    {this.state.mainAirlines}
                                </div>
                            </div>
                        </Box>

                    </div>


                </div>
            </div >
        )
    }
}

