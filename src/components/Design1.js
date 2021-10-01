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
    const [activatedPage, setActivatePage] = useState("")
    useEffect(() => {
                    const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {
                            console.log(snapshot)
                                    setSiteTitle(snapshot.val().savedSiteTitle)
                                    setHeaderTitle(snapshot.val().savedHeaderTitle)
                                    setSubHeaderTitle(snapshot.val().savedSubHeaderTitle)
                                    setAboutUsMain(snapshot.val().savedAboutMainText)
                                    setAboutUsSub(snapshot.val().savedAboutSubText)
                                    setLocation(snapshot.val().savedLocation)
                                    setSiteEmailData(snapshot.val().savedSiteEmail)
                                    setNumber(snapshot.val().savedNumber)
                            // snapshot.forEach(snap => {
                              
                            //     //  if (snap.hasChild("designName")) {
                            //     //     setActivatePage(snap.val().designName);
                            //     // }
                                    
                            // });
                        })
                    if(cookies.UserLoginKey) {
                        setActiveCookes(true)
                    }
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
   
    return (
        
        <div className="design1-properties">
            <header className="primary-bg-color pad-x-md">
                    <nav className="pad-y-md flex-space-between">
                        <div className="logo flex-default">
                            <div className="icon"></div>
                             <div className="app-name cursor-pointer">
                                <Link to="/design1">
                                    <h3 className="" id =""> {typeof(siteTitle) === 'undefined'? "Site title": siteTitle}</h3>
                                    
                                </Link>
                            </div>
                        </div>
                        <div className="nav-desktop-active">
                            <ul className="flex-default">
                                  <li>
                                       <Link to="/prayerWall">
                                            Prayer Wall
                                        </Link>
                                    </li>
                                    <li>
                                            <a href="#aboutUs">About Us</a>
                                    </li>
                                    <li>
                                            <a href="#contactUs">Contact Us</a>
                                    </li>
                                    <li>
                                       <Link to="/donationPage">
                                            Donate
                                        </Link>
                                    </li>
                                    <li onClick={handleServiceRedirect}>
                                            Services
                                    </li>

                            </ul>
                        </div>
                        <div className="nav-desktop-active">
                        {
                            activeCookies? <div> <UserProfile/></div>:  <Button
                            onClick = {getStarted}
                            variant="outlined"
                            className="btn-large primary-color"
                            color="primary"
                            size="large"
                            id="btn-large-primary-outline-black"
                            >
                            Get Started
                            </Button>
                        }
                       
                        </div>
                        <div className="burger-nav">
                            <TopNavGenWeb></TopNavGenWeb>
                        </div>
                    </nav>
                    <div className="align-text-center pad-y-lg">
                        <h1 className="" id ="dynamic-h1"> {typeof(headerTitle) === 'undefined'? "To God be the glory": headerTitle}</h1>
                        <p >{typeof(subHeaderTitle) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis nunc, non gravida ligula sodales commodo. Sed lectus mauris, mollis scelerisque diam vel": subHeaderTitle}</p>
                        <div className="pad-y-sm">
                             {
                            activeCookies? <div></div>:  
                            <Button
                                onClick = {getStarted}
                                variant="contained"
                                className="btn-large primary-color"
                                color="default"
                                size="large"
                                id="btn-large-primary-contained-black"
                                >
                                Get Started
                            </Button>
                        }
                            
                        </div>
                        
                        <div className="m-t-md">
                            <img src="https://images.unsplash.com/photo-1579975096649-e773152b04cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="church banner"></img>
                        </div>
                    </div>
                </header>
                <main className="pad-y-lg plain-white-color-bg">
                    <div className="align-text-center">
                        <p><b>News, Events, and Announcements</b></p>
                    </div>
                    <div className=" pad-y-md">
                        <Carousel />
                    </div>

                </main>
                <main className="pad-y-lg plain-white-color-bg primary-bg-color " id="aboutUs">
                    <div className="pad-xy-sm">
                        <div className="align-text-center">
                            <p><b>About Us</b></p>
                        </div>
                        <div className="align-text-center pad-y-md about-us align-text-center">
                        <h2>
                            { typeof(aboutUsMain) == 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipi scing elit. VivamLorem ipsum dolor sit amet, consectetur adipiscing ": aboutUsMain}
                            </h2>
                            <p className="pad-y-sm"> { typeof(aboutUsSub) == 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipi scing elit. VivamLorem ipsum dolor sit amet, consectetur adipiscing ": aboutUsSub}</p>
                            
                        </div>
                    
                    </div>

                </main>
                <main className="pad-y-lg plain-white-color-bg " id="contactUs">
                    <div className="pad-xy-sm">
                        <div className="align-text-center">
                            <p><b>Contact Us</b></p>
                        </div>
                        <div className="flex-no-wrap flex-default-center-xy contact-us pad-y-md">
                            <div className="box-default-width  pad-x-md ">
                            <h3>Location</h3>
                                <p className="pad-y-sm"> { typeof(location) == 'undefined'? "Novaliches Chapter: #123123 St. Anthony St. Brgy. Holy Spirit Quezon City": location}</p>
                            
                            </div>
                            <div className="box-default-width  pad-x-md">
                                <h3>Contacts</h3>
                                  <p className="pad-y-sm"> { typeof(number) == 'undefined'? "#12345678910": number}</p>
                                  <p className="pad-y-sm"> { typeof(siteEmailData) == 'undefined'? "example@gmailcom": siteEmailData}</p>

                            
                           </div>
                           
                            <div className="box-default-width pad-x-md">
                                <h3>Contact Personel</h3>
                                <p>Surname, First Name</p>
                                <p>Surname, First Name</p>
                                <p>Surname, First Name</p>
                            
                            </div>
                        </div>
                    
                    </div>

                </main>
        </div>
    )
}

export default Design1
