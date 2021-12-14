import React, {useEffect, useState} from 'react'
import '../style/themes.css'
import '../style/style.css'
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import TopNavGenWeb from './TopNavGenWeb'
import TextField from "@material-ui/core/TextField";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import UserProfile from './UserProfile';
import QuickLinks from './QuickLinks';

function PrayerWall() {

    const [siteTitle, setSiteTitle] = useState("");
    const [activeCookies, setActiveCookes] = useState(false)
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [titleErrorState, setTitleErrorState] = useState(false);
    const [titleError, seTitleError] = useState("");
    const [titleInput, setTitleInput] = useState("");
    const [update, setUpdate] = useState(false);

    const [prayerArray, setPrayerArray] = useState();
    const [activeDesign, setActiveDesign] = useState("")
    const [liturgyPage, setLiturgyPage] = useState(false);
    const [staffPage, setStaffPage] = useState(false);
    const [outReachPage, setOutreactPage] = useState(false);
    const [quickLinksPage, setQuickLinksPage] = useState(false);
    const [sacramentsPage, setSacramentsPage] = useState(false);
    
    useEffect(() => {
         const dbPages = firebase.database().ref("pages")
                    dbPages.once("value").then((snap) => {
                        setLiturgyPage(snap.val().liturgyPage)
                        setStaffPage(snap.val().staffPage)
                        setOutreactPage(snap.val().outReachPage)
                        setQuickLinksPage(snap.val().quickLinkPage)
                        setSacramentsPage(snap.val().sacramentsPage)
                    })
        
                    const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {

                                    setSiteTitle(snapshot.val().savedSiteTitle)
                        });
        if(cookies.UserLoginKey) {
                            setActiveCookes(true)
                        }
        
         const dbRefPrayers = firebase.database().ref("prayerWallPosts");
            dbRefPrayers.once("value")
                .then(function (snapshot) {
                    const snaps = snapshot.val();
                    const prayerArray = [];
                    for (let id in snaps) {
                        prayerArray.push({id, ...snaps[id]});
                    }
                    setPrayerArray(prayerArray)
                });
        
            const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
    }, [update]);
   
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
    function getStarted() {
        history.push("/genWebLogin")
    }
      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
     const postPrayer = (event) => {
        
        if (titleInput.length < 8) {
            setTitleErrorState(true)
            seTitleError("Please enter atleast 8 characters or 3 words above.")
            setAlertStatus(true)
            setFeedbackVariant("warning")
            setAlertMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
        } else {
            setTitleErrorState(false)
            seTitleError("")
        
                const dbRefPush = firebase.database().ref("prayerWallPosts");
                dbRefPush.orderByChild('announcementTitle').equalTo(titleInput).once('value').then(snapshot => {
                    const postInput = {
                        postInput: titleInput,
                    }
                        dbRefPush.push(postInput).then(() => {
                            setAlertStatus(true)
                            setFeedbackVariant("success")
                            setAlertMessage("That's it right there, Prayers posted")
                            setTitleInput('')
                        })
                        setUpdate(!update);
                            
                });
        }
      
    }
       const handleCloseAlert = (event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }

                setAlertStatus(false);
    };
    function handleServiceRedirect() {
        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")

        }
    }
    return (
        <div className={activeDesign === "design1" ? "design1-properties position-relative" : activeDesign === "design2 " ? "design2-properties position-relative" : "design3-properties position-relative"}>
            <div className="pad-xy-sm position-fixed-top-z-1 full-width primary-bg-color height-400">
            </div>

            <header className="pad-x-md">
                <nav className="pad-y-sm  primary-bg-color ">
                    <div className="flex-space-between nav-inside">
                        
                        <div className="logo flex-default">
                            <div className="icon"></div>
                             <div className="app-name cursor-pointer">
                                <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" :"/design3"}>
                                    <h3 className="" id =""> {typeof(siteTitle) === 'undefined'? "Site title": siteTitle }</h3>
                                </Link>
                            </div>
                        </div>
                        <div className="nav-desktop-active ">
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
                            size="small"
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
                                      activeCookies? <UserProfile/> : ""

                                  }
                                </div>
                                <TopNavGenWeb></TopNavGenWeb>
                                
                            </div>
                        </div>
                    </div>

                    </nav>
                    <Container>
                        <div className="align-text-center pad-y-md">
                            <h1 className="" id ="dynamic-h1"> Submit it to God</h1>
                            <p >This page is a wall on which prayers are inscribed. Please be reminded to keep courtesy, pour it to God. Rest assured that identity is hidden.</p>
                        </div>
                    
                
                    </Container>
                    {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success">
                            {alertMessage}
                        </Alert>
                    </Snackbar> :
                    feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="warning">
                            {alertMessage}
                        </Alert>
                    </Snackbar> :
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="error">
                        {alertMessage}
                        </Alert>
                    </Snackbar>
                }
                </header>
            <Container className="pad-y-md">
                <div className="pad-y-md width-sm flex-default-align-default position-relative">
                                        <TextField   error={titleErrorState} helperText={titleError} onChange={e => { setTitleInput(e.target.value) }} value={titleInput} id="outlined-full-width" fullWidth label="Enter post" variant="outlined" className="text-input-deafult m-x-sm" />
                                      
                                    
                            <div className="pad-x-sm">
                                <Button
                                    onClick={postPrayer}
                                    variant="contained"
                                    color="default"
                                    size="large"
                                    className=""
                                    id="btn-large-primary-contained-black"
                                >
                                post
                                 </Button>
                                  </div>

                            {/* <TextField multiline rows={4} error={descriptionInputErrorState} helperText={descriptionInputError} onChange={e => { setDescriptionInput(e.target.value) }} value={descriptionInput} id="outlined-full-width" fullWidth label="Description" variant="outlined" type="text" className="text-input-deafult" /> */}
                                
                        </div>
                    <main>
                        {prayerArray ? prayerArray.map((data)=> {
                                    return (
                                    <div className="m-y-sm "  key={data.id}>
                                        <div className=" width-sm">
                                                    <div className="pad-xy-sm ">
                                                        <div className="" id="font-dark">
                                                            <p>{data.postInput}</p>
                                                        </div>
                                                    
                                                    </div>
                                        </div>
                                    </div>
                                    )
                            }) : ""}
                    </main>
                
                </Container>
        </div>
             
    )
}

export default PrayerWall
