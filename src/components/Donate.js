import React, {useState, useEffect} from 'react';
import "../style/style.css";
import "../style/themes.css"
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import RingLoader from "react-spinners/RingLoader";
import {  Link, useHistory} from 'react-router-dom';
import TopNavGenWeb from './TopNavGenWeb'
import { useCookies } from 'react-cookie';
import UserProfile from './UserProfile';
import Skeleton from '@mui/material/Skeleton';
import QuickLinks from './QuickLinks';

export default function Donate(){
  //variables
  const history = useHistory();

  const [loadingState, setLoadingState] = useState(false)
  const [alertStatus, setAlertStatus] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [usernameInput, setUsernameInput] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorState, setUsernameErrorState] = useState(false);

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [amountErrorState, setAmountErrorState] = useState(false);
  const [siteTitle, setSiteTitle] = useState("");
  const [cookies] = useCookies(['user']);
  const [activeCookies, setActiveCookes] = useState(false)
  const [qrArray, setQrArray] = useState('')
    const [activeDesign, setActiveDesign] = useState("")
  

  function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  
  const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertStatus(false);
  };
  function getStarted() {
        history.push("/genWebLogin")
    
  }

  function handleSubmitDonation(e) {

    e.preventDefault();

    if (!amount) {

      setAmountErrorState(true);
      setAmountError("Please input a valid number");

    }
    else if (isNaN(parseInt(amount, 10))) {

      setAmountErrorState(true);
      setAmountError("Please input a valid number [0-9]");

    } else {

      setAmountErrorState(false);
      setAmountError("");

    }
    if (!usernameInput) {

      setUsernameErrorState(true)
      setUsernameError("Please enter your name")

    } else {

      setUsernameErrorState(false)
      setUsernameError("")
      setLoadingState(true);
      
      if (amountErrorState === false && !isNaN(parseInt(amount, 10)) && usernameErrorState === false) {

        const db = firebase.database().ref('user-donations')
        const userDonationData = {
          donator: usernameInput,
          donationAmount: amount
        }

        db.push(userDonationData).then(() => {
          setLoadingState(false);
          setAlertStatus(true)
          setFeedbackVariant("success")
          setAlertMessage("Donation Posted.")
          setAmount("")
          setUsernameInput("")

        })

      }
    }
   
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
    useEffect(() => {
                    const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {

                                    setSiteTitle(snapshot.val().savedSiteTitle)
                            });
                       
    
                    if(cookies.UserLoginKey) {
                        setActiveCookes(true)
                    }
                    const dbQR= firebase.database().ref('qr-e-wallet')
                      dbQR.once("value")
                          .then(function (snapshot) {
                          const snap = snapshot.val().eWalletLink;
                              setQrArray(snap)
                      });
       const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
    }, []);
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
                            <h1 className="" id ="dynamic-h1"> Psalm 112:5</h1>
                           <p>Good will come to those who are generous and lend freely, who conduct their affairs with justice.</p>                    
                                  {
                            qrArray? 
                            <img src={qrArray} className="pad-xy-md qr" alt="qr"/> : <Skeleton animation="wave"  variant="rectangular" width={500} height={400} sx={{ borderRadius: '5px', bgcolor: 'grey.900' }} />
                      }
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
            
      
      </div>
      
  );
}

