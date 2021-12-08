import React, { useEffect, useState}from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import UserProfile from './UserProfile';
import { Button } from "@material-ui/core";
import TopNavGenWeb from './TopNavGenWeb'
import ReactPlayer from "react-player"
import QuickLinks from './QuickLinks';

function UserLivestream() {
    const [siteTitle, setSiteTitle] = useState("");
    const [liturgyPage, setLiturgyPage] = useState(false);
    const [staffPage, setStaffPage] = useState(false);
    const [outReachPage, setOutreactPage] = useState(false);
    const [quickLinksPage, setQuickLinksPage] = useState(false);
    const [sacramentsPage, setSacramentsPage] = useState(false);
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
    const [livestreamtArray, setLivestreamArray] = useState()
    const [activeDesign, setActiveDesign] = useState("")
    
    useEffect(() => {
                     const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {

                                    setSiteTitle(snapshot.val().savedSiteTitle)
                            });
                        if(cookies.UserLoginKey) {
                            setActiveCookes(true)
                            }
        const dbPages = firebase.database().ref("pages")
                    dbPages.once("value").then((snap) => {
                        setLiturgyPage(snap.val().liturgyPage)
                        setStaffPage(snap.val().staffPage)
                        setOutreactPage(snap.val().outReachPage)
                        setQuickLinksPage(snap.val().quickLinkPage)
                        setSacramentsPage(snap.val().sacramentsPage)
                    })
            const dbRefPod = firebase.database().ref("recordedliveUrl");
            dbRefPod.once("value").then(function (snapshot) {
                    const postSnap = snapshot.val();
                    const livestreamtArray = [];
                    for (let id in postSnap) {
                        livestreamtArray.push({id, ...postSnap[id]});
                    }
                    setLivestreamArray(livestreamtArray)
            });
          const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
            })

        
    }, []);
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
            <header>

            <div className="position-relative font-light">
                    <Container> 

                    <div className="pad-xy-sm position-fixed-top-z-1 full-width under-garment-gradient height-90">
                    </div>
                    
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
                                            {/* <li onClick={livestream}>
                                                    Streams
                                            </li> */}
                                            <li className = "flex-space-between" >
                                                    <QuickLinks/>
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
                                        {
                                            activeCookies? <div> <UserProfile/></div>: ""
                                        }
                                </div>
                                <TopNavGenWeb></TopNavGenWeb>
                                
                            </div>
                        </div>
                    </nav>
                        
                        <div className="align-text-center pad-y-lg">
                            <h2 className="" id ="dynamic-h1"> Recorded Streams</h2>
                        </div>
                        
                    </Container>

                    
                
            </div>
            </header>
            <main>
                   <div className="flex-flow-wrap-start-center-xy ">
                            {livestreamtArray ? livestreamtArray.map((data)=> {
                                    return (
                                    <div key={data.id} className="m-xy-md height-fixed-450" id="font-dark">
                                                
                                        <div  className=" width-sm ">
                                                    <div className="pad-xy-sm" >
                                                        <ReactPlayer
                                                            url = {data.liveUrl}
                                                            controls
                                                            className="react-player"
                                                            width="100%" height="100%" 
                                                        /> 
                                                        <div>
                                                        </div>    
                                                    </div>
                                                

                                            </div>
                                                        <p>{data.timeStamp}</p>
                                            
                                    </div>

                                    )
                            }) : "No livestreams uploaded yet"}
                        </div>     
            </main>
        </div>
    )
}

export default UserLivestream
