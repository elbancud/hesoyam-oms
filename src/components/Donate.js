import React, {useState} from 'react';
import "../style/style.css";
import "../style/themes.css"
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import uiBanner from "../images/ui-oms.png";
<<<<<<< HEAD
import firebase from 'firebase';
import NavUser from "./NavUser";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import RingLoader from "react-spinners/RingLoader";

export default function Donate(){
  //variables
    const [loadingState, setLoadingState] = useState(false)
  const [alertStatus, setAlertStatus] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

=======
import ErrorIcon from '@material-ui/icons/Error';
// import firebase from 'firebase';
import NavUser from "./NavUser";

export default function Donate(){
  //variables
  const [error, setError] = useState('');

 
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorState, setUsernameErrorState] = useState(false);

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [amountErrorState, setAmountErrorState] = useState(false);

<<<<<<< HEAD
  function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  
  const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertStatus(false);
    };
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
    <Container>

      <div className="position-absolute full-width">
        <NavUser/>

        </div>
    </Container>
        
=======
  
  function handleLoginSubmit(e) {
   
  }
  return (
    <div className = "position-relative">
      <div className="position-absolute full-width">
        <NavUser/>

      </div>
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
      <div className="">
        <main className="full-height flex-flow-wrap ">
          <div className="  pad-xy-md width-sm primary-bg-color-off-white full-height left-banner position-relative">
              <nav className="pad-y-sm pad-y-md ">
                <div className=" align-text-left pad-xy-md ">
                
                      <h2>Psalm 112:5</h2>
                    <p>Good will come to those who are generous and lend freely, who conduct their affairs with justice.</p>                    
                </div>
              </nav>
              <div className="graphics-offset">
                <img src={uiBanner} className="rotate" alt="Church"></img>
              </div>
          </div>
          <div className="full-width">
            <div className="pad-xy-sm width-sm ">
<<<<<<< HEAD
                
                <div className="subtitle ">
                  <h3>Donate</h3>     
                  <p>We are grateful for your donation, it will help us to further our goals. Do you mind if we get your information just the basic ones. We will make sure your identity is secured. </p>
                </div>
                <form autoComplete="off" onSubmit={handleSubmitDonation}>
                  <div className="pad-y-sm">
                       <TextField  error={usernameErrorState} helperText={usernameError} onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} id="outlined-full-width" fullWidth label="Name" variant="outlined" type="text" className="text-input-deafult" />
=======
                {error &&
                    <div className="flex-default">
                      <div className="m-r-sm">
                        <ErrorIcon className= "error-red" />
                      </div>
                      <p className= "error-red" ><b>{error}</b></p>
                    </div>
                }
                <div className="subtitle ">
                  <h3>Donate</h3>     
                  <p>We are grateful for your donation, it will help us to further our goals</p>
                </div>
                <form autoComplete="off" onSubmit={handleLoginSubmit}>
                  <div className="pad-y-sm">
                       <TextField  error={usernameErrorState} helperText={usernameError} onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} id="outlined-full-width" fullWidth label="Name (optional)" variant="outlined" type="text" className="text-input-deafult" />
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8

                  </div>
                  <div>
                  
                    <div>
                    <div className="pad-y-sm position-relative">
<<<<<<< HEAD
                        <TextField type="text" error={amountErrorState} helperText={amountError} onChange={e => { setAmount(e.target.value) }} value={amount} id="outlined-full-width" fullWidth label="Amount" variant="outlined" className="text-input-deafult" />
=======
                        <TextField type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} error={amountErrorState} helperText={amountError} onChange={e => { setAmount(e.target.value) }} value={amount} id="outlined-full-width" fullWidth label="Amount" variant="outlined" className="text-input-deafult" />
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
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
<<<<<<< HEAD
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
=======
    </div>
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
      
  );
}

