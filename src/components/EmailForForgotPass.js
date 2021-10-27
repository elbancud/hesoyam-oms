import React, {useState } from 'react';
import "../style/style.css";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import uiBanner from "../images/ui-oms.png";
import ErrorIcon from '@material-ui/icons/Error';
import validator from 'validator';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';


const Login = (props) => {
  //variables
  const history = useHistory();
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailErrorState, setEmailErrorState] = useState(false);

  const [alertStatus, setAlertStatus] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
             return;
        }

        setAlertStatus(false);
    };
    
  function handleSubmitEmail(e) {

    e.preventDefault();

    if (emailInput === "") {

      setEmailError("Please enter your Email");
      setEmailErrorState(true);
      setError("Please complete the fields");

    } else if (!validator.isEmail(emailInput)) {

      setEmailError("Please enter a valid email");
      setEmailErrorState(true);
      setError("Please enter a valid email");

    } else {

        firebase.auth().sendPasswordResetEmail(emailInput)
        .then(() => {
            setAlertStatus(true)
            setFeedbackVariant("success")
            setAlertMessage("Success! new password link is sent to  " + emailInput )
            
            setError("");
            setEmailErrorState("");
            setEmailErrorState(false);
            setTimeout(() => {
               history.push("/login");
               setCookie("EmailForget", emailInput)
            
          }, 2000);
        })
        .catch((error) => {
            setAlertStatus(true)
            setFeedbackVariant("error")
            setAlertMessage(error.message)
        });

        
    }
   
       
  
  }
  return (
    <div>
  
      <main className="full-height flex-flow-wrap">
        <div className="pad-xy-md width-sm tertiary-gradient full-height left-banner position-relative">
            <nav className="pad-y-sm pad-y-md ">
              <div className=" align-text-left pad-xy-md ">
                  <div className="app-name align-text-center ">
                        <Link to="/">
                            <h3 className="secondary-color-text">Hesoyam</h3>
                        </Link>

                    </div>
                        <h2>Trouble remembering your password? Say less, We got you covered</h2>                    
                   
              </div>
            </nav>
            <div className="graphics-offset">
              <img src={uiBanner} className="rotate" alt="church banner"></img>
            </div>
        </div>
       
        <div className="full-width">
          <div className="pad-xy-sm width-sm ">
              {error &&
                  <div className="flex-default">
                    <div className="m-r-sm">
                      <ErrorIcon className= "error-red" />
                    </div>
                    <p className= "error-red" ><b>{error}</b></p>
                  </div>
              }
              <div className="subtitle ">
                <h3>Forgot password</h3>   
                <p>
                    Please enter your registered Email so we can send you a link
                </p>  
              </div>
              <form autoComplete="off" onSubmit={handleSubmitEmail}>
                <div className="pad-y-sm">
                    <TextField error={emailErrorState} helperText={emailError} onChange={e => {setEmailInput(e.target.value)}} value={emailInput}   id="outlined-full-width" fullWidth label="Email" variant="outlined" className="text-input-deafult"/>
                </div>
                <div>
                  
                  
                  <div className="pad-y-sm">
                    <Button
                    variant="contained"
                    className="btn-large primary-color full-width"
                    color="secondary"
                    size="large"
                    id="btn-large-primary"
                    type="submit">
                        Send reset link
                    </Button>
                  </div>
                
                  </div>
                
              </form>
            </div>
        </div>
      </main>
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
  );
}

export default Login;
