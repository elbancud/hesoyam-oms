import React, {useState, useEffect} from 'react';
import "../style/style.css";
import "../style/themes.css"
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import uiBanner from "../images/ui-oms.png";
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import RingLoader from "react-spinners/RingLoader";
import {  Link, useHistory} from 'react-router-dom';
import TopNavGenWeb from './TopNavGenWeb'
import { useCookies } from 'react-cookie';
import UserProfile from './UserProfile';

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
          setAlertMessage("Audio uploaded.")
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
       
    }, []);
  return (
      <div>
     {
                loadingState? <div className="middle-fix" >
                <div className="flex-default-center-xy">
                    <RingLoader color={"#533c9f"} loading={loadingState} size={80} speedMultiplier="1.4" /><br />
                </div>
                <div className="pad-y-sm"><p><b>Uploading...</b></p></div>
                </div>: ""
            }
    <div className="position-relative">

      <div className="position-absolute full-width">
        <Container>
            <header>
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
                                    <li>
                                       <Link to="/userPodcast">
                                            Podcast
                                        </Link>
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
                        <div className="burger-nav ">
                            <div className="flex-default">
                                <div className="pad-x-sm">
                                    <UserProfile/>
                                </div>
                                <TopNavGenWeb></TopNavGenWeb>
                                
                            </div>
                        </div>
                    </nav>

            </header>
        </Container>

        </div>
        
      <div className="">
        <main className="full-height flex-flow-wrap ">
          <div className="  pad-xy-md width-sm primary-bg-color-off-white full-height left-banner position-relative">
              <nav className="pad-y-sm pad-y-md ">
                <div className=" align-text-left pad-xy-md ">
                
                      <h2>Psalm 112:5</h2>
                    <p>Good will come to those who are generous and lend freely, who conduct their affairs with justice.</p>                    
                </div>
              </nav>
              <img src={qrArray} className="qr" alt="qr"/>
              {/* <div className="graphics-offset">
                  <img src={qrArray} className="rotate" alt="qr"/>
                {
                  qrArray ?
                  :
                  <img src={uiBanner} className="rotate" alt="Church"></img>
                }
              </div> */}
          </div>
          <div className="full-width">
            <div className="pad-xy-sm width-sm ">
                
                <div className="subtitle ">
                  <h3>Donate</h3>     
                  <p>We are grateful for your donation, it will help us to further our goals. Do you mind if we get your information just the basic ones. We will make sure your identity is secured. </p>
                </div>
                <form autoComplete="off" onSubmit={handleSubmitDonation}>
                  <div className="pad-y-sm">
                       <TextField  error={usernameErrorState} helperText={usernameError} onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} id="outlined-full-width" fullWidth label="Name" variant="outlined" type="text" className="text-input-deafult" />

                  </div>
                  <div>
                  
                    <div>
                    <div className="pad-y-sm position-relative">
                        <TextField type="text" error={amountErrorState} helperText={amountError} onChange={e => { setAmount(e.target.value) }} value={amount} id="outlined-full-width" fullWidth label="Amount" variant="outlined" className="text-input-deafult" />
                      </div>
                    </div>
                    <div className="pad-y-sm">
                      <Button
                        variant="contained"
                        className="btn-large primary-color full-width"
                        color="secondary"
                        size="large"
                        id="btn-large-primary"
                        type="submit">
                        Donate
                      </Button>
                    </div>
                      
                  
                    </div>
                  
                </form>
              </div>
          </div>
        </main>
        </div>
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
      </div>
      </div>
      
  );
}

