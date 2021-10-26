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
                          
                        })
                    if(cookies.UserLoginKey) {
                        setActiveCookes(true)
                    }
                    
                    const dbLive = firebase.database().ref("liveUrl")
                    dbLive.once("value", (snap) => {
                        setLiveUrl(snap.val().liveUrl)
                        // alert(liveUrl)

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
                                    <h3 className="" id =""> {typeof(siteTitle) === 'undefined'? "Site title": siteTitle}</h3>
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
                            <h1  id ="dynamic-h1"> {typeof(headerTitle) === 'undefined'? "To God be the glory": headerTitle}</h1>
                            
                            <p className="pad-y-md">{typeof(subHeaderTitle) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis nunc, non gravida ligula sodales commodo. Sed lectus mauris, mollis scelerisque diam vel": subHeaderTitle}</p>
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
                                            
                                            
                                            { typeof(aboutUsMain) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipi scing elit. VivamLorem ipsum dolor sit amet, consectetur adipiscing ": aboutUsMain}
                                        </h2>
                                    </div>
                                    
                                    
                                    <p className="pad-y-sm"> { typeof(aboutUsSub) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipi scing elit. VivamLorem ipsum dolor sit amet, consectetur adipiscing ": aboutUsSub}</p>
                                    
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
                        <div className="flex-no-wrap contact-us pad-y-md flex-evenly">

                            <div className="box-default-width  ">
                                <h3>Location</h3>
                                <p className="pad-y-sm"> { typeof(location) === 'undefined'? "Novaliches Chapter: #123123 St. Anthony St. Brgy. Holy Spirit Quezon City": location}</p>
                            
                            </div>

                            <div className="box-default-width  ">
                                <h3>Contacts</h3>
                                  <p className="pad-y-sm"> { typeof(number) === 'undefined'? "#12345678910": number}</p>
                                  <p className="pad-y-sm"> { typeof(siteEmailData) === 'undefined'? "example@gmailcom": siteEmailData}</p>
                            </div>
                           
                            <div className="box-default-width ">
                                <h3>Contact Personel</h3>
                                <p>Surname, First Name</p>
                                <p>Surname, First Name</p>
                                <p>Surname, First Name</p>
                            
                            </div>
                        </div>
                    
                    </div>
                    </Container>
                    
                </main>
        </div>
    )
}

export default Design1
