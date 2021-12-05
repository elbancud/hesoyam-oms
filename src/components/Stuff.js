import React, {useEffect, useState} from 'react'
import '../style/themes.css'
import '../style/style.css'
import { Button } from "@material-ui/core";
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import TopNavGenWeb from './TopNavGenWeb'
import UserProfile from './UserProfile';
import Container from "@material-ui/core/Container";

function Stuff() {
    
    const [siteTitle, setSiteTitle] = useState("");
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
    const [liveUrl, setLiveUrl] = useState("")
    const [profileArray, setProfileArray] = useState()

    // const [activatedPage, setActivatePage] = useState("")


    const [liturgyPage, setLiturgyPage] = useState(false);
    const [staffPage, setStaffPage] = useState(false);
    const [outReachPage, setOutreactPage] = useState(false);
    const [quickLinksPage, setQuickLinksPage] = useState(false);
    const [sacramentsPage, setSacramentsPage] = useState(false);
    const [activeDesign, setActiveDesign] = useState("")
    
    useEffect(() => {
                     const dbData = firebase.database().ref("generated-data");
                        dbData.on('value', snapshot => {
                                    setSiteTitle(snapshot.val().savedSiteTitle)
                                    
                          
                        })
                        
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
        
                    const dbRef = firebase.database().ref("data/staff");
                    dbRef.once("value")
                        .then(function (snapshot) {
                            const postSnap = snapshot.val();
                            const profileArray = [];
                            for (let id in postSnap) {
                                profileArray.push({id, ...postSnap[id]});
                            }
                            setProfileArray(profileArray)
                        });
                        const dbTheme = firebase.database().ref("themeChosen")
                        dbTheme.on('value', snap => {
                            setActiveDesign(snap.val().designName)      
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
    function lit() {
        history.push("/liturgy")
    }
    function outreach() {
        history.push("/outreach")
    }
    function staff() {
        history.push("/staff")
    }
    function lit() {
        history.push("/liturgy")
    }
    function sacrament() {
        history.push("/sacrament")
    }
    function quick() {
        history.push("/quickLink")
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
        <div className={activeDesign === "design1" ? "design1-properties " : activeDesign === "design2 " ? "design2-properties " : "design3-properties "}>
            <header className=" pad-x-md position-relative">
                 <div className="pad-xy-sm position-fixed-top-z-1 full-width primary-bg-color height-90">
                    </div>
                <Container>
                    <nav className="pad-y-md flex-space-between">
                        <div className="logo flex-default">
                            <div className="icon"></div>
                             <div className="app-name cursor-pointer">
                                <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" :"/design3"}>
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
                                            {liturgyPage? 
                                                <li onClick={lit}>
                                                    Liturgy & Music
                                                </li>: ""
                                            }{outReachPage? 
                                                <li onClick={outreach}>
                                                    Outreach
                                                </li>: ""
                                            }{staffPage
                                                ? 
                                                <li onClick={staff}>
                                                    Meet the Stuff
                                                </li>: ""
                                            }{sacramentsPage? 
                                                <li onClick={sacrament}>
                                                    Sacraments
                                                </li>: ""
                                            }{quickLinksPage? 
                                                <li onClick={quick}>
                                                    Quick Links
                                                </li>: ""
                                            }

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
                            <h1  id ="dynamic-h1">Meet the Staff</h1>
                            {/* <p className="pad-y-md">{typeof(subHeaderTitle) === 'undefined'? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis nunc, non gravida ligula sodales commodo. Sed lectus mauris, mollis scelerisque diam vel": subHeaderTitle ? subHeaderTitle : <Skeleton animation="wave"  variant="rectangular" width='100%' height={100} sx={{ borderRadius: '5px', bgcolor:'grey.900'}} />}</p> */}
                            
                        </Container>
                            
                </div>
                <div>
                    
                </div>
                </header>
                <main>
                    <Container>
                    <div className="flex-no-wrap">
                        {profileArray ? profileArray.map((data)=> {
                                 return (
                                 <div key={data.id} className=" box-default-width-sm m-xy-sm theme-img" >
                                    <div className ="flex-space-between ">   
                                        <div className="box-default-width">
                                            <div className="" id="font-dark">
                                                <div className="bg-color-brown ">
                                                         <img src={data.staffImage} alt="staff profile"/>
                                                </div>
                                                <div className="profile-info">
                                                    <b><h3>{data.name}</h3></b>
                                                    <p>{data.email}</p>
                                                    <p>{data.number}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                 </div>
                                )
                            
                        }) : ""}
                    </div>
                    </Container>
                </main>
                
        </div>
    )
}

export default Stuff
