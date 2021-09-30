import React, {useEffect, useState} from 'react'
import '../style/themes.css'
import '../style/style.css'
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import TopNavGenWeb from './TopNavGenWeb'
import UserProfile from './UserProfile';
import { Button } from "@material-ui/core";
function Design1() {
    const [siteTitle, setSiteTitle] = useState("");
    
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
    
    useEffect(() => {
                    const dbRef = firebase.database().ref("account-details");
                        dbRef.on('value', snapshot => {
                            snapshot.forEach(snap => {
                              
                                  if (snap.val().email === cookies.User) {
                                    setSiteTitle(snap.val().savedSiteTitle)
                                 
                                }

                            });
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
    const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
    };
    return (
        
        <div className="design1-properties">
            <header className="primary-bg-color pad-x-md full-width">
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
                 
                </header>
                
        </div>
    )
}

export default Design1
