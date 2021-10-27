import React,{useState} from 'react';
import "../style/style.css";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import uiBanner from "../images/ui-oms.png";
import {Link, useHistory,} from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';
import validator from 'validator';
import { auth } from '../firebase';
import firebase from 'firebase';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useCookies } from 'react-cookie';

function NewPassword() {

  //useRef gives acces to an id

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorState, setUsernameErrorState] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [emailErrorState, setEmailErrorState] = useState(false);
  
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorState, setPasswordErrorState] = useState(false);

  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [passwordConfirmErrorState, setPasswordConfirmErrorState] = useState(false);

  const [error, setError] = useState('');
  const [showPasswordState, setShowPasswordState] = useState(false);

  const [alertStatus, setAlertStatus] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  
  const [cookies, setCookies, removeCookie] = useCookies(["user"]);
  const [code, setCode] = useState('')

  //get signup
  const history = useHistory();

  function getParameterByName(name, url = window.location.href) {
   name = name.replace(/[\[\]]/g, '\\$&');
   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  // document.addEventListener('DOMContentLoaded', () => {

  //   const actionCode = getParameterByName('oobCode');
 
  //     setCode(actionCode)
  // }, false);

  
  //button event for registration
  function showPassword(e) {
    e.preventDefault();
    setShowPasswordState(!showPasswordState);
  }
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
    
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertStatus(false);
  };
  function handleSubmit(e) {

    e.preventDefault();
    const actionCode = getParameterByName('oobCode');
    
    if (passwordInput === "") {
      setPasswordError("Please enter your Password");
      setPasswordErrorState(true);
      setError("Please complete the fields");
    } else if (!validator.isStrongPassword(passwordInput, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1
    })) {
      setPasswordError('Weak password: TRY Minimum of 8 characters, 1 Lowercase, 1 Uppercase, 1 Number, 1 Symbol')
      setPasswordErrorState(true);
      setError("Please enter a strong password");
    } else {
      setPasswordError("");
      setPasswordErrorState(false);
      setError("");
    }
    if (!passwordConfirmInput) {
      setPasswordConfirmError("Please repeat your Password");
      setPasswordConfirmErrorState(true);
      setError("Please complete the fields");
      
    } else if (passwordInput !== passwordConfirmInput) {
      setPasswordConfirmError("Please repeat your Password");
      setPasswordConfirmErrorState(true);
      setError("Passwords do not match");
    }
    else if(passwordInput && validator.isStrongPassword(passwordInput, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1
    }) && passwordConfirmInput && passwordConfirmInput === passwordInput) {

      setPasswordConfirmError("");
      setPasswordConfirmErrorState(false);

      firebase.auth().confirmPasswordReset(actionCode, passwordConfirmInput)
        .then(function () {
          setAlertStatus(true)
          setFeedbackVariant("success")
          setAlertMessage("Keep it to yourself chief! password updated.")

          setTimeout(() => {
            history.push("/")
            
          }, 2000);
          removeCookie("EmailForget");
        })
        .catch(function (error) {
          setAlertStatus(true)
          setFeedbackVariant("error")
          setAlertMessage(error.message)

        })
   
    }
  }
    return (
      <div>
      <main className=" full-height flex-flow-wrap">
        <div className="pad-xy-md width-sm secondary-gradient full-height left-banner position-relative">
          <nav className="pad-y-sm pad-y-md ">
            <div className=" align-text-left pad-xy-md ">
              <div className="app-name align-text-center">
                <Link to="/">
                  <h3 className="secondary-color-text">Hesoyam</h3>
                </Link>
              </div>
              <h2>We told you, we got you covered</h2>
            </div>
          </nav>
          <div className="graphics-offset">
            <img src={uiBanner} className="rotate" alt="church banner"></img>
          </div>
        </div>
        <div className="full-width">
          <div className="pad-xy-sm width-sm ">
            <div className="subtitle pad-y-sm">
              {error &&
                <div className="flex-default">
                  <div className="m-r-sm">
                    <ErrorIcon className="error-red" />
                  </div>
                  <p className="error-red" ><b>{error}</b></p>
                </div>
              }
              <header>
                <div className="app-name m-b-md ">
                  <nav>
                    <div className="burger-nav">
                      <Link to="/">
                        <h3 className="secondary-color-text">Hesoyam</h3>
                      </Link>
                                
                    </div>
                            
                  </nav>

                </div>
              </header>
              <h3>Silly you, New passowrd?</h3>
              <p>We assume you are here from the email. Please type in your new password.</p>
            </div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  
                
              <div>
                <div className="pad-y-sm position-relative">
                  <TextField error={passwordErrorState} helperText={passwordError} onChange={e => { setPasswordInput(e.target.value) }} value={passwordInput} id="outlined-full-width" fullWidth label="Password" variant="outlined" type={showPasswordState ? "text" : "password"} />
                  <div className="position-absolute-right">
                    <IconButton onClick={showPassword}>
                      {showPasswordState ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                </div>
                <div className="pad-y-sm">
                  <TextField error={passwordConfirmErrorState} helperText={passwordConfirmError} onChange={e => { setPasswordConfirmInput(e.target.value) }} value={passwordConfirmInput} id="outlined-full-width" fullWidth label="Confirm Password" variant="outlined" type="password" />
                      
                </div>
                <div>

                </div>
                <div className="pad-y-sm">
                  <Button
                    variant="contained"
                    className="btn-large primary-color full-width"
                    color="secondary"
                    size="large"
                    id="btn-large-secondary"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
                
              </div>
                              
            </form>
          </div>
        </div>
        {feedbackVariant === "success" ? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success">
            {alertMessage}
          </Alert>
        </Snackbar> :
          feedbackVariant === "warning" ? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="warning">
              {alertMessage}
            </Alert>
          </Snackbar> :
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity="error">
                {alertMessage}
              </Alert>
            </Snackbar>
        }
      </main>
       </div>
    );
  }

export default NewPassword;
