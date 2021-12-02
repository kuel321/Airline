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
import firebase from "firebase";
import config from '../firebaseConfig';



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
        search: "",

    };

    handleAirline = (i) => {
        console.log(i)
    }
    handleAirlineImage = () => {
        var options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
            params: { q: 'JFK Airport', pageNumber: '1', pageSize: '10', autoCorrect: 'true' },
            headers: {
                'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
                'x-rapidapi-key': 'd7ed104e32mshdda8c7649ffc716p16578ajsn9a87a6df4e52'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    controlAirline = () => {

    }
    handleConsole = () => {
        const db = firebase.database();
      /*  db.ref().orderByChild('code').equalTo('ATL').on('value', (snapshot) => {
            this.setState({
                   
            })
            console.log(snapshot.val());

        })
        */
       db.ref().once('value', (snapshot) => {
           this.setState ({
               airplaneDB: snapshot.val(),
           })
       })
    }
    handleSearch = (x) => {
        console.log(x);
    }
    
    filterAirlines() {
        var pushedData = [];
        /* for (let i = 0; i < this.state.trending.length; i++){
         const result = AirplaneData.filter(x => x.code.includes(this.state.trending[i]));
         console.log(result[i].code);
         pushedData.push(result[i].code);
         }
         this.setState({
             mainAirlines: pushedData
         })

               {this.state.airplaneDB.filter((val) => {
                                  if(this.state.search == "") {
                                      return;
                                  } else if (val.code.toLowerCase().includes(this.state.search.toLowerCase())) {
                                      return val;
                                  }
                              }).map((val, key) => {
                                  return (
                                      <div className="resultItem" key={key}>
                                          <AirlineModal airlineTitle={val.code} data1={val} />
                                          
                                      </div>
                                  );
                              })}
      */
        for (let i = 0; i < this.state.trending.length; i++) {
            const result = AirplaneData.filter((x) => x.code.includes(this.state.trending[i]))
            //console.log(result[0].code.toString())
            const db = firebase.database();
            pushedData.push(<div className="trendingZoom">


                <div className="trendingZoomName">   <AirlineModal airlineTitle={result[0].code.toString()}  airlineAddress={result[0].city.toString() + ", " + result[0].state.toString()}  /> </div>
                <Airports name={result[0].code.toString()} description={result[0].name.toString()} img={this.state.trendingImages[i]} />
            </div>);

        }
        this.setState({
            mainAirlines: pushedData,
        })
    }


   async componentDidMount() {
 firebase.initializeApp(config);


        this.filterAirlines();
        
        const db = firebase.database();
        await db.ref().once('value', (snapshot) => {
            //console.log(snapshot.val());
            this.setState ({
                airplaneDB: snapshot.val(),
            })
        })

        //console.log(this.state.airplaneDB);

    }
    render() {


        return (
            <div>

                <Navbar />

<button onClick={this.handleConsole}>TEST</button>
                <div className="searchContainer">
                    <div className="searchBox">
                        <h1 className="searchBoxTitle">Make sure it's good to go before you go</h1>
                        <h4 className="searchBoxParagraph">Search for restroom reviews here</h4>
                        <div className="searchInput">
                            <form>
                                <input type="text"
                                    placeholder="Search.."
                                    onChange={(event) => {
                                        this.setState({ search: event.target.value });
                                    }}
                                />
                                <div className="resultBox">
                                {this.state.airplaneDB.filter((val) => {
                                  if(this.state.search == "") {
                                      return;
                                  } else if (val.code.toLowerCase().includes(this.state.search.toLowerCase())) {
                                      return val;
                                  }
                              }).map((val, key) => {
                                  return (
                                      <div className="resultItem" key={key}>
                                          <AirlineModal airlineTitle={val.code} data1={val} thiskey={key} />
                                          
                                      </div>
                                  );
                              })}
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h1 className="trendingTitle">Currently trending airports</h1>
                <div className="trendingAirportcontainer">

                    <div className="trendingAirport">


                        <div className="wallpaper"></div>


                        {this.state.mainAirlines}
                    </div>

                </div>
            </div >
        )
    }
}

