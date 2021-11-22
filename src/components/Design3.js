import React, {useEffect, useState} from 'react'
import '../style/themes.css'
import '../style/style.css'
import { Button } from "@material-ui/core";
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import TopNavGenWeb from './TopNavGenWeb'
import UserProfile from './UserProfile';
import Carousel from './Carousel'
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player"
import Skeleton from '@mui/material/Skeleton';

function Design1() {
    
    const [siteTitle, setSiteTitle] = useState("");
    const [headerTitle, setHeaderTitle] = useState("");
    const [subHeaderTitle, setSubHeaderTitle] = useState("");
    const [aboutUsMain, setAboutUsMain] = useState("");
    const [aboutUsSub, setAboutUsSub] = useState("");
    const [location, setLocation] = useState("");
    const [siteEmailData, setSiteEmailData] = useState("");
    const [number, setNumber] = useState("");
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
    const [liveUrl, setLiveUrl] = useState("")
    // const [activatedPage, setActivatePage] = useState("")

    const [contact1, setContact1] = useState();
    const [contact2, setContact2] = useState();
    const [contact3, setContact3] = useState();
    useEffect(() => {
                    const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {
                                    setSiteTitle(snapshot.val().savedSiteTitle)
                                    setHeaderTitle(snapshot.val().savedHeaderTitle)
                                    setSubHeaderTitle(snapshot.val().savedSubHeaderTitle)
                                    setAboutUsMain(snapshot.val().savedAboutMainText)
                                    setAboutUsSub(snapshot.val().savedAboutSubText)
                                    setLocation(snapshot.val().savedLocation)
                                    setSiteEmailData(snapshot.val().savedSiteEmail)
                                    setNumber(snapshot.val().savedNumber)
                                    
                                     setContact1(snapshot.val().contactPerson1)
                                    setContact2(snapshot.val().contactPerson2)
                                    setContact3(snapshot.val().contactPerson3)
                          
                        })
                        
                    if(cookies.UserLoginKey) {
                        setActiveCookes(true)
                    }
                    
                    const dbLive = firebase.database().ref("liveUrl")
                    dbLive.once("value", (snap) => {
                        
                        if (new Date(snap.val().timestamp).getDate() != (new Date().getDate())) {
                            setLiveUrl("")
                        } else {
                            
                            setLiveUrl(snap.val().liveUrl)
                        }

                    })
                    
    }, []);

    function getStarted() {
        history.push("/genWebLogin")
    }

    function handleServiceRedirect() {
        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")

        }
    }

    function getStarted() {
        history.push("/genWebLogin")
    }
    function prayerWall() {
        history.push("/prayerWall")
    }
    function donate() {
        history.push("/donationPage")
    }
    function pod() {
        history.push("/userPodcast")
    }
    function handleServiceRedirect() {
        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")
        }
    }
   
    return (
        
        <div className="design3-properties">
            <header className="primary-bg-color pad-x-md">
                <Container>
                    <nav className="pad-y-md flex-space-between">
                        <div className="logo flex-default">
                            <div className="icon"></div>
                             <div className="app-name cursor-pointer">
                                <Link to="/design3">
                                    <h3 className="" id =""> {typeof(siteTitle) === 'undefined'? "Site title": siteTitle }</h3>
                                </Link>
                            </div>
                        </div>
                        <div className="nav-desktop-active">
                            <ul className="flex-default">
                                            <li onClick={prayerWall}>
                                                    Prayer Wall
                                            </li>
                                            <li onClick = {donate}>
                                                    Donate
                                            </li>
                                            <li onClick={handleServiceRedirect}>
                                                    Services
                                            </li>
                                            <li onClick={pod}>
                                                    Podcast
                                            </li>

                            </ul>
                        </div>
                        <div className="nav-desktop-active">
                        {
                            activeCookies? <div> <UserProfile/></div>:  <Button
                            onClick = {getStarted}
                            variant="outlined"
                            // className="btn-large primary-color"
                            color="primary"
                            size="large"
                            id="btn-large-primary-outline-white"
                            >
                            Get Started
                            </Button>
                        }
                       
                        </div>
                        <div className="burger-nav ">
                            <div className="flex-default">
                                <div className="pad-x-sm">
                                    <UserProfile/>
                                </div>
                                <TopNavGenWeb></TopNavGenWeb>
                                
                            </div>
                        </div>
                    </nav>
                    </Container>
                
                    <div className="align-text-center pad-y-lg">
                        <Container>
                            <h1  id ="dynamic-h1"> {typeof(headerTitle) === 'undefined'? "To God be the glory": headerTitle ? headerTitle : <Skeleton animation="wave"  variant="rectangular" width='100%' height={100} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} />}</h1>
                            
                            <p className="pad-y-md">{typeof(subHeaderTitle) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis nunc, non gravida ligula sodales commodo. Sed lectus mauris, mollis scelerisque diam vel": subHeaderTitle ? subHeaderTitle : <Skeleton animation="wave"  variant="rectangular" width='100%' height={100} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} />}</p>
                            <div className="pad-y-sm">
                                {
                                activeCookies? <div></div>:  
                                <Button
                                    onClick = {getStarted}
                                    variant="contained"
                                    className="btn-large primary-color"
                                    color="default"
                                    size="large"
                                    id="btn-large-primary-contained-white"
                                    >
                                    Get Started
                                </Button>
                            }
                                
                            </div>
                            
                        </Container>
                            <div className="m-t-md">
                                {liveUrl?
                                    <ReactPlayer
                                    url = {liveUrl}
                                    controls
                                    width="860" height="614" 
                                    /> :
                                    <img src="https://images.unsplash.com/photo-1579975096649-e773152b04cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="church banner"></img>
                                }
                                
                            </div>
                        </div>
                </header>
                
                <main className="pad-y-lg primary-bg-color ">
                    <div className="align-text-center">
                        <p><b>News, Events, and Announcements</b></p>
                    </div>
                    <div className=" pad-y-md carousel">
                        <Carousel />
                    </div>

                </main>
                
                    <main className="pad-y-lg plain-white-color-bg primary-bg-color " id="aboutUs">
                        <Container>
                            <div className="pad-xy-md">
                                <div className="align-text-center pad-y-md about-us ">
                                
                                    <div className="pad-y-md ">
                                        
                                        <div className="align-text-center">
                                                <p><b>About Us</b></p>
                                        </div>
                                        <h2 >
                                            
                                            
                                            { typeof(aboutUsMain) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipi scing elit. VivamLorem ipsum dolor sit amet, consectetur adipiscing ": aboutUsMain ? aboutUsMain : <Skeleton animation="wave"  variant="rectangular" width='100%' height={100} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} />}
                                        </h2>
                                    </div>
                                    
                                    
                                    <p className="pad-y-sm"> { typeof(aboutUsSub) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipi scing elit. VivamLorem ipsum dolor sit amet, consectetur adipiscing ": aboutUsSub ? aboutUsSub : <Skeleton animation="wave"  variant="rectangular" width='100%' height={100} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} /> }</p>
                                    
                                </div>
                            
                            </div>
                            
                     </Container>
                    </main>
                    
                <main className="pad-y-lg primary-bg-color " id="contactUs">
                    <Container>
                        
                    <div className="pad-xy-sm">
                        <div className="align-text-center">
                            <p><b>Contact Us</b></p>
                        </div>
                        <div className="flex-wrap contact-us pad-y-md flex-evenly">

                            <div className="box-default-width  ">
                                <h3>Location</h3>
                                <p className="pad-y-sm"> { typeof(location) === 'undefined'? "Novaliches Chapter: #123123 St. Anthony St. Brgy. Holy Spirit Quezon City": location ? location : <Skeleton animation="wave"  variant="rectangular" width='100%' height={100} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} /> }</p>
                            
                            </div>

                            <div className="box-default-width  ">
                                <h3>Contacts</h3>
                                  <p className="pad-y-sm"> { typeof(number) === 'undefined'? "#12345678910": number ? number : <Skeleton animation="wave"  variant="rectangular" width='100%' height={50} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} /> }</p>
                                  <p className="pad-y-sm"> { typeof(siteEmailData) === 'undefined'? "example@gmailcom": siteEmailData ? siteEmailData : <Skeleton animation="wave"  variant="rectangular" width='100%' height={50} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} /> }</p>
                            </div>
                           
                            <div className="box-default-width ">
                                <h3>Contacts Personnel</h3>

                                <p className="pad-y-sm"> { typeof(contact1) === 'undefined'? "example@gmail.com": contact1 ? contact1 : <Skeleton animation="wave"  variant="rectangular" width='100%' height={50} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} /> }</p>
                                <p className="pad-y-sm"> { typeof(contact2) === 'undefined'? "#12345678910": contact2 ? contact2 : <Skeleton animation="wave"  variant="rectangular" width='100%' height={50} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} /> }</p>
                                <p className="pad-y-sm"> { typeof(contact3) === 'undefined'? "Juan Dela Cruz": contact3 ? contact3 : <Skeleton animation="wave"  variant="rectangular" width='100%' height={50} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} /> }</p>

                            
                            </div>
                        </div>
                    
                    </div>
                    </Container>
                    
                </main>
        </div>
    )
}

export default Design1
