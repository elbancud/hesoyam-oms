import React,{useState,useEffect} from 'react';
import "../style/style.css";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';
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
import "../style/themes.css";
import mtg from '../images/MTQ.png'


const GeneratedWebRegistration = (props) => {
    const [activatePage, setActivatePage] = useState("");
    const history = useHistory();
  const [activeDesign, setActiveDesign] = useState("")

    useEffect(() => {
                   
                      const dbRefGen = firebase.database().ref("generated-data");
                        dbRefGen.on('value', snapshot => {
                                    setSiteTitle(snapshot.val().savedSiteTitle)
                                   
                        })
                        const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
    }, []);
  //useRef gives acces to an id
  const [usernameInput, setUsernameInput] = useState('');

  const [lastNameInput, setLastNameInput] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [lastNameInputState, setLastNameInputState] = useState(false);

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorState, setUsernameErrorState] = useState(false);
  const [emailInput, setEmailInput] = useState('');
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

  const [cookies, setCookie] = useCookies(['user']);

  const [siteTitle, setSiteTitle] = useState("");


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
   
    
    if (!usernameInput) {
      setUsernameError("Please enter your First name");
      setUsernameErrorState(true);
      setError("Please complete the fields");
    }else {
      setUsernameError("");
      setUsernameErrorState(false);
      setError("");
    }
    if (!lastNameInput) {
      setLastNameError("Please enter your lastname");
      setLastNameInputState(true);
      setError("Please complete the fields");
      
    }else {
      setLastNameError("");
      setLastNameInputState(false);
      setError("");
    }
    if (!emailInput ) {
      setEmailError("Please enter your Email");
      setEmailErrorState(true);
      setError("Please complete the fields");
    }else if (!validator.isEmail(emailInput)) {
      setEmailError("Please enter a valid Email");
      setEmailErrorState(true);
    }else {
      setEmailError("");
      setEmailErrorState(false);
      setError("");

    }
  
    if (!passwordInput ) {
      setPasswordError("Please enter your Password");
      setPasswordErrorState(true);
      setError("Please complete the fields");
    }else if (!validator.isStrongPassword(passwordInput, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1
    })) {
      setPasswordError('Weak password: TRY Minimum of 8 characters, 1 Lowercase, 1 Uppercase, 1 Number, 1 Symbol')
      setPasswordErrorState(true);
      setError("Please enter a strong password");
    }else {
      setPasswordError("");
      setPasswordErrorState(false);
      setError("");

    }
    
    if (!passwordConfirmInput ) {
      setPasswordConfirmError("Please repeat your Password");
      setPasswordConfirmErrorState(true);
      setError("Please complete the fields");
      
    } else if (passwordInput !== passwordConfirmInput) {
      setPasswordConfirmError("Please repeat your Password");
      setPasswordConfirmErrorState(true);
      setError("Passwords do not match");
    }
    else {
      setPasswordConfirmError("");
      setPasswordConfirmErrorState(false);
         const dbRef = firebase.database().ref("user-account-details");
          dbRef.orderByChild('username').equalTo(usernameInput).once('value').then(snapshot => {
            if (snapshot.exists()) {
              setUsernameErrorState(true);
              setUsernameError("Username already taken");
              setError("Please enter a different username");
            }
            else  {
                    auth.createUserWithEmailAndPassword(emailInput, passwordConfirmInput).then((user) => {
          
                          const usernameReferenceFromDb = firebase.database().ref("user-account-details");
                          const userDetails = {
                            username: usernameInput,
                            lastname: lastNameInput,
                            email: emailInput,
                          
                          }
                          usernameReferenceFromDb.push(userDetails);
                          setAlertStatus(true)
                          setFeedbackVariant("success")
                          setAlertMessage("Let's go! one step at a time. Now login.")
                        
                          setTimeout(
                            () => {
                               const dbRef = firebase.database().ref("user-account-details");
                                dbRef.on('value', snapshot => {
                                    snapshot.forEach(snap => {
                                        if (emailInput === snap.val().email) {
                                            setCookie('Key', snap.key);
                                            }
                                        });
                                })
                              history.push('/genWebLogin');

                            }, 
                            1000
                          );
                        }).catch(error => {
                          setError(error.message);
                          if (error.code === "auth/email-already-in-use") {
                            setEmailError("Email already registered");
                            setEmailErrorState(true);
                            setError("Please enter another registered email");
          
                          }
          
                        });
              
            }
          
          });
              
     }
   

 

  }
 
  return (
      <div >


      <main className=" full-height flex-flow-wrap">
        <div className={activeDesign === "design1" ? "design1-properties position-relative" : activeDesign === "design2 " ? "design2-properties position-relative" : "design3-properties position-relative"}>

              <div className= "pad-xy-md width-sm  primary-bg-color full-height left-banner position-relative" >
              <nav className="pad-y-sm pad-y-md ">
                <div className=" align-text-left pad-xy-md ">
                    <div className="app-name align-text-center">
                        <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" :"/design3"}>

                              <h3 className="secondary-color-text cursorPointer" >{siteTitle}</h3>
                          </Link>
                              
                    </div>
                    <h2>Let there be light to open the eyes of the blind</h2>
                </div>
              </nav>
              <div className="">
                <img src={mtg} alt ="login banner"></img>
              </div>
        </div>
        </div>

        <div className="full-width">
            <header>
                <div className="app-name m-b-md ">
                        <nav>
                            <div className="burger-nav">
                                <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" :"/design3"}>

                                  <h3 className="secondary-color-text">{siteTitle}</h3>
                              </Link>
                              
                            </div>
                          
                        </nav>

                  </div>
              </header>
          <div className="pad-xy-sm width-sm " >
          <div className="subtitle pad-y-sm">
              {error &&
                  <div className="flex-default">
                    <div className="m-r-sm">
                      <ErrorIcon className= "error-red" />
                    </div>
                    <p className= "error-red" ><b>{error}</b></p>
                  </div>
              }
                <h3>Sign up your account</h3>
                <p>Let’s  get you all set up so you can verify your personal account and started making website</p>
              </div>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <div className="pad-y-sm ">
                       <TextField  error={usernameErrorState} helperText={usernameError} onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} id="outlined-full-width" fullWidth label="First Name" variant="outlined" type="text" className="text-input-deafult" />
                  </div>
                   <div className="pad-y-sm">
                       <TextField  error={lastNameInputState} helperText={lastNameError} onChange={e => { setLastNameInput(e.target.value) }} value={lastNameInput} id="outlined-full-width" fullWidth label="Last Name" variant="outlined" type="text" className="text-input-deafult" />
                  </div>
                  <div className="pad-y-sm">
                <TextField error={emailErrorState} helperText={emailError} onChange={e => { setEmailInput(e.target.value) }} value={emailInput} id="outlined-full-width" fullWidth label="Email" variant="outlined" type="email" className="text-input-deafult"/>
                  </div>
                  <div>
                    <div className="pad-y-sm position-relative">
                      <TextField error={passwordErrorState} helperText={passwordError} onChange={e => { setPasswordInput(e.target.value) }} value={passwordInput} id="outlined-full-width" fullWidth label="Password" variant="outlined" type={showPasswordState?"text":"password"}/>
                          <div  className="position-absolute-right">
                              <IconButton onClick = {showPassword}>
                                {showPasswordState?<Visibility />:<VisibilityOff />}
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
                      Register
                    </Button>
                  </div>
                  <div className="pad-y-sm align-text-center">
                   
                    <p>Already a member?
                      <Link to="/genWebLogin">
                        <span className="secondary-color-text cursor-pointer"><b> Sign In</b> </span>
                      </Link>
                    </p>
                    </div>
                  </div>
                              
                </form>
            </div>
      </div>
       {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
            feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
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

export default GeneratedWebRegistration;
