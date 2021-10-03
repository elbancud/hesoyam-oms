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
function PrayerWall() {

    const [siteTitle, setSiteTitle] = useState("");
   
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

    useEffect(() => {
                    const dbRef = firebase.database().ref("account-details");
                        dbRef.on('value', snapshot => {
                            snapshot.forEach(snap => {
                                if (snap.val().email === cookies.User) {
                                    setSiteTitle(snap.val().savedSiteTitle)
                                 
                                }
                            
                            });
                        })
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
                    
    }, [update]);
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
                            setAlertMessage("That's it right there, Event or announcement posted")
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
                                       <Link to="/donate">
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
                            cookies.UserLoginKey? <div> <UserProfile/></div>:  <Button
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
                    <Container>
                        <div className="align-text-center pad-y-md">
                            <h1 className="" id ="dynamic-h1"> Submit it to God</h1>
                            <p >This page is a wall on which prayers are inscribed. Please be reminded to keep courtesy, pour it to God. Rest assured that identity is hidden.</p>
                        </div>
                    <div className="pad-y-md width-sm flex-default-align-default ">
                                <TextField error={titleErrorState} helperText={titleError} onChange={e => { setTitleInput(e.target.value) }} value={titleInput} id="outlined-full-width" fullWidth label="Enter post" variant="outlined" className="text-input-deafult" />
                            
                        
                            {/* <TextField multiline rows={4} error={descriptionInputErrorState} helperText={descriptionInputError} onChange={e => { setDescriptionInput(e.target.value) }} value={descriptionInput} id="outlined-full-width" fullWidth label="Description" variant="outlined" type="text" className="text-input-deafult" /> */}
                                <Button
                                    onClick={postPrayer}
                                    variant="contained"
                                    className="btn-large primary-color"
                                    color="default"
                                    size="large"
                                    id="btn-large-primary-contained-black"
                                >
                                post
                                 </Button>
                                
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
                    <main>
                        {prayerArray ? prayerArray.map((data)=> {
                                    return (
                                    <div className="m-y-sm "  key={data.id}>
                                        <div className="box width-sm">
                                                    <div className="pad-xy-sm ">
                                                        <div className="">
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
