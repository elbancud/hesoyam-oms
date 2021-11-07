import React, { useState ,useEffect} from 'react';
import "../style/style.css";
import "../style/themes.css"
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {  Link, useHistory} from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';
import validator from 'validator';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import firebase from 'firebase';
import { useAuth } from "../context/AuthContext";
import { useCookies } from 'react-cookie';
import mtg from '../images/MTQ.png'


export default function GeneratedWebLogin(){
  //variables
  const history = useHistory();
  const [error, setError] = useState('');
  const [showPasswordState, setShowPasswordState] = useState(false);

  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailErrorState, setEmailErrorState] = useState(false);
  
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorState, setPasswordErrorState] = useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const [siteTitle, setSiteTitle] = useState("");
  const [activeDesign, setActiveDesign] = useState("")

  const { login } = useAuth();
  useEffect(() => {
     
                    const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {
                                    setSiteTitle(snapshot.val().savedSiteTitle)
                                   
                        })
    
            const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
              
                    
    }, []);
   function showPassword(e) {
    e.preventDefault();
    setShowPasswordState(!showPasswordState);
  }
  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!emailInput ) {
      setEmailError("Please enter your Email");
      setEmailErrorState(true);
      setError("Please complete the fields");
    } else if (!validator.isEmail(emailInput)) {
      setEmailError("Please enter a valid email");
      setEmailErrorState(true);
      setError("Please complete the fields");
    } else {
      setError("");
      setEmailErrorState(false);
    }
    if(!passwordInput) {
      setPasswordError("Please enter your password");
      setPasswordErrorState(true);
      setError("Please complete the fields");
    } else {
      try {
          await login(emailInput, passwordInput);
          const dbAccountDetails = firebase.database().ref("user-account-details") 
                  
          dbAccountDetails.orderByChild("email").equalTo(emailInput).once('value').then(snapshot => {
            if (snapshot.exists()) {
              if (activeDesign === "design1") {
                history.push("/design1")
                
              } else if (activeDesign === "design2") {
                history.push("/design2")
                
              } else {
                history.push("/design3")
                
              }
              setPasswordError("");
              setPasswordErrorState(false);
              setError("");
              const db = firebase.database().ref("user-account-details");
              db.on('value', snapshot => {
                snapshot.forEach(snap => {
                  if (snap.val().email === emailInput) {
                    setCookie('UserLoginKey', snap.key);
                    setCookie('UserFirstName', snap.val().username)
                    setCookie('UserLastName',snap.val().lastname)
                    setCookie('UserEmail', snap.val().email)
                    return true;
                  }
                  window.location.reload()
                })
              })
              
            } else {
              setEmailError("Invalid email or password");
              setEmailErrorState(true);
              setError("Invalid email or password");
              setPasswordError("Invalid email or password");
              setPasswordErrorState(true);
            }
          })
      }
      catch (error)  {
        if ( error.code === "auth/wrong-password") {
          setEmailError("Invalid email or password");
          setEmailErrorState(true);
          setError("Invalid email or password");
          setPasswordError("Invalid email or password");
          setPasswordErrorState(true);
        } else if (error.code === "auth/user-not-found") {
          setEmailError("User not found, please anter a registered account");
          setEmailErrorState(true);
          setError("User not found, please anter a registered account");
          setPasswordError("User not found, please anter a registered account");
          setPasswordErrorState(true);
        }
      }
    }
  }
  return (
    <div>

      <div >

        <main className="full-height flex-flow-wrap ">
          <div className={activeDesign === "design1" ? "design1-properties position-relative" : activeDesign === "design2 " ? "design2-properties position-relative" : "design3-properties position-relative"}>
          <div className=" pad-xy-md width-sm primary-bg-color full-height left-banner position-relative">
              <nav className="pad-y-sm pad-y-md ">
                <div className=" align-text-left pad-xy-md ">
                    <div className="app-name align-text-center">
                          <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" :"/design3"}>

                              <h3 className="secondary-color-text cursorPointer" >{siteTitle}</h3>
                          </Link>
                      </div>
                    <h2>Ready to keep spreading the words of God?</h2>                    
                </div>
              </nav>
              <div className="">
                <img src={mtg} alt="Church"></img>
              </div>
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
                <div className="subtitle " >
                  <h3>Sign in your account</h3>     
                </div>
                <form autoComplete="off" onSubmit={handleLoginSubmit} >
                  <div className="pad-y-sm">
                      <TextField error={emailErrorState} helperText={emailError} onChange={e => {setEmailInput(e.target.value)}} value={emailInput}   id="outlined-full-width" fullWidth label="Email" variant="outlined" className="text-input-deafult"/>
                  </div>
                  <div>
                  <div className="flex-end">
                        <Link to ="emailForgetPass">
                          <p className="primary-color-text"><b>Forgot Password?</b></p>
                      
                        </Link>
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
                    </div>
                    <div className="pad-y-sm">
                      <Button
                      variant="contained"
                      className="btn-large primary-color full-width"
                      color="secondary"
                      size="large"
                      id="btn-large-primary"
                      type="submit">
                      Login
                      </Button>
                    </div>
                      
                    <div className="pad-y-sm align-text-center">
                        <p>Not a member yet? No worries 
                          <Link to="/genWebRegistration">
                            <span className="primary-color-text cursor-pointer"><b> Sign Up</b> </span>
                          </Link>
                    </p>
                      </div>
                    </div>
                  
                </form>
              </div>
          </div>
        </main>
        </div>
    </div>
      
  );
}

