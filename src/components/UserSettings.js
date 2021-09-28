import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie'
import {  Link, useHistory} from 'react-router-dom';
import UserProfile from './UserProfile';
import firebase from "../firebase"
import Divider from '@mui/material/Divider';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import validator from 'validator';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function UserSettings() {
    const {userSideLogin} = useAuth()
    const [value, setValue] = React.useState(0);
    const [cookies, setCookies] = useCookies(['user'])
    const [siteTitle, setSiteTitle] = useState("")
    const history = useHistory();
    const [usernameInput, setUsernameInput] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [usernameErrorState, setUsernameErrorState] = useState(false);
  
    const [lastNameInput, setLastNameInput] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [lastNameInputState, setLastNameInputState] = useState(false);

    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailErrorState, setEmailErrorState] = useState(false);
  
    const [textField, setTextField] = useState(true);

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [passwordInput, setPasswordInput] = useState('');

    const [passwordCurrentInput, setPasswordCurrentInput] = useState('');
    const [passwordCurrentError, setPasswordCurrentError] = useState('');
    const [passwordCurrentErrorState, setPasswordCurrentErrorState] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState(false);

    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [passwordConfirmErrorState, setPasswordConfirmErrorState] = useState(false);
    const [showPasswordState, setShowPasswordState] = useState(false);
    const [passwordEnable, setPasswordEnable] = useState(true);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function handleServiceRedirect() {
        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")

        }
    }
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
    useEffect(() => {
        const dbRef = firebase.database().ref("account-details");
        dbRef.on('value', snapshot => {
            snapshot.forEach(snap => {
                              
                if (snap.val().email === cookies.User) {
                    setSiteTitle(snap.val().savedSiteTitle)
                }
            });
        })
        setUsernameInput(cookies.UserFirstName)
        setEmailInput(cookies.UserEmail)
        setLastNameInput(cookies.UserLastName)
    }, []);
    const setTextFieldEnable = () => {
        setTextField(false)
    }
    const setPasswordEnableTrue = () => {
        setPasswordEnable(false)
    }
    const savePersonalInfo = () => {
        if (!usernameInput) {
            setUsernameError("Please enter your First name");
            setUsernameErrorState(true);
        } else {
            setUsernameError("");
            setUsernameErrorState(false);
        }
        if (!lastNameInput) {
            setLastNameError("Please enter your lastname");
            setLastNameInputState(true);
        
        } else {
            setLastNameError("");
            setLastNameInputState(false);
        }
        if (!emailInput) {
            setEmailError("Please enter your Email");
            setEmailErrorState(true);
        } else if (!validator.isEmail(emailInput)) {
            setEmailError("Please enter a valid Email");
            setEmailErrorState(true);
        } else {
            setEmailError("");
            setEmailErrorState(false);
            if (!emailErrorState && !lastNameInputState && !usernameErrorState) {
                if (usernameInput === cookies.UserFirstName && lastNameInput === cookies.UserLastName && emailInput === cookies.UserEmail ) {
                          setAlertStatus(true)
                          setFeedbackVariant("warning")
                          setAlertMessage("OooOps, nothing seems like to be changed.")
                        
                } else if (!emailErrorState && !lastNameInputState && !usernameErrorState) {
                    const db = firebase.database().ref("user-account-details/" + cookies.UserLoginKey);
                        db.update({ username: usernameInput })
                        db.update({ lastname: lastNameInput })
                        db.update({ email: emailInput })
                        firebase.auth().currentUser.updateEmail(emailInput).then(() => {
                            setAlertStatus(true)
                            setFeedbackVariant("success")
                            setAlertMessage("Perfect, personal info updated")
                            setCookies('UserFirstName', usernameInput)
                            setCookies('UserLastName',lastNameInput)
                            setCookies('UserEmail', emailInput)
                            window.location.reload();
                        }).catch(() => {
                            
                        })
                        
                  
                }
            }
        }
    }
    const resetPassword = () => {
        auth.signInWithEmailAndPassword(cookies.UserEmail, passwordCurrentInput)
              .then(() => {
                setPasswordCurrentError("");
                 setPasswordCurrentErrorState(false);
                 
            }).catch(() => {
                 setPasswordCurrentError("Incorrect password");
                 setPasswordCurrentErrorState(true);
            })
        
        if (!passwordCurrentInput) {
            setPasswordCurrentError("Please enter your current password");
            setPasswordCurrentErrorState(true);

        } else {
            setPasswordCurrentError("");
            setPasswordCurrentErrorState(false);
        }if (!passwordInput) {
             setPasswordError("Please enter your new password");
             setPasswordErrorState(true);
        } if (!validator.isStrongPassword(passwordInput, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1
            })) {
            setPasswordError('Weak password: TRY Minimum of 8 characters, 1 Lowercase, 1 Uppercase, 1 Number, 1 Symbol')
            setPasswordErrorState(true);
        } else {
           setPasswordError('')
            setPasswordErrorState(false);
        } if (passwordConfirmInput === "") {
             setPasswordConfirmError("Please re-enter your new password");
             setPasswordConfirmErrorState(true);
        }if (passwordConfirmInput !== passwordInput) {
             setPasswordConfirmError("Passwords do not match");
             setPasswordConfirmErrorState(true);
        }else {
           setPasswordConfirmError('')
            setPasswordConfirmErrorState(false);
        }
            if (!passwordConfirmErrorState && !passwordErrorState && !passwordCurrentErrorState) {
                firebase.auth().currentUser.updatePassword(passwordConfirmInput).then(() => {
                    setPasswordConfirmError("");
                    setPasswordConfirmErrorState(false);
                    setPasswordError('')
                    setPasswordErrorState(false);
                    setAlertStatus(true)
                    setFeedbackVariant("success")
                    setAlertMessage("Keep it to yourself chief! password updated.")
                    setPasswordInput("")
                    setPasswordConfirmInput("")
                    setPasswordCurrentError("")
                })
               
        }
        
    }
    const cancelTextField = () => {
        setTextField(true);
        setPasswordEnable(true)
    }
  return (
    <div className="position-relative">
        <div className="design1-properties">
              <div className="position-absolute " id="primary-bg-color">
                  
            </div>
        </div>
        <Container>
            <header>
                 <nav className="pad-y-sm flex-space-between">
                        <div className="logo flex-default">
                            <div className="icon"></div>
                             <div className="app-name cursor-pointer">
                                <Link to="/design1">
                                    <h3 className="" id =""> {typeof(siteTitle) == 'undefined'? "Site title": siteTitle}</h3>
                                    
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
                        <div> <UserProfile /></div>
              
                     
                      
                    </nav>
            </header>
        
            <Box
                sx={{ flexGrow: 1, display: 'flex', width:'100%', flexWrap: 'wrap'}}
            >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className="box pad-xy-sm tab-height-adopt"
            >
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Security" {...a11yProps(1)} />
                
            </Tabs>
            <TabPanel value={value} index={0}  className="width-md-no-margin">
                <div>
                    
                <div>
                    <b>Profile</b>
                    <br />
                    Your personal information
                </div>
                
                <div className="box pad-xy-sm m-t-sm" >
                    <b>Personal information</b>
                              
                    <Divider />
                    <div className="flex-default m-y-sm ">
                        <div className="box-small-width">
                            Name:
                        </div>
                            <TextField disabled={textField} error={usernameErrorState} helperText={usernameError} onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} id="outlined-full-width" fullWidth label="First Name" variant="outlined" type="text" className="text-input-deafult" />
                        
                    </div>
                    <div className="flex-default m-y-sm ">
                        <div className="box-small-width">
                            Last Name:
                        </div>
                            <TextField  disabled={textField} error={lastNameInputState} helperText={lastNameError} onChange={e => { setLastNameInput(e.target.value) }} value={lastNameInput} id="outlined-full-width" fullWidth label="Last Name" variant="outlined" type="text" className="text-input-deafult" />
                         
                    </div>
                    <div className="flex-default m-y-sm ">
                        <div className="box-small-width">
                            Email:
                        </div>
                            <TextField disabled={textField} error={emailErrorState} helperText={emailError} onChange={e => { setEmailInput(e.target.value) }} value={emailInput} id="outlined-full-width" fullWidth label="Email" variant="outlined" type="email" className="text-input-deafult"/>

                    </div>
                    <div className={!textField? "display-none":""}>
                        <div className="pad-y-sm">
                                  <Button onClick={setTextFieldEnable} variant="outlined" size="medium">
                                        Edit settings
                                  </Button>
                        </div>
                    
                    </div>
                    <div className="display-none" id ={!textField? "display-block" : ""}>
                        <div className="pad-y-sm flex-default">
                                  <Button onClick={savePersonalInfo} variant="contained" size="medium" id="btn-large-primary">
                                        Save changes
                                  </Button>
                                  <div className="pad-x-sm">
                                    <Button onClick={cancelTextField} variant="outlined" size="medium">
                                        Cancel
                                  </Button>
                                  </div>
                        </div>
                    
                    </div>
                </div>
                <div className="pad-y-sm">
                    <div>
                        <b>Security</b>
                        <br />
                        Your passwords
                        
                    </div>
                    
                    <div className="box pad-xy-sm m-t-sm" >
                        <b>Personal security</b>
                        <Divider />
                        <div className="flex-default m-y-sm ">
                            <div className="box-small-width">
                                Current password:
                            </div>
                            <TextField disabled={passwordEnable} error={passwordCurrentErrorState} helperText={passwordCurrentError} onChange={e => { setPasswordCurrentInput(e.target.value) }} value={passwordCurrentInput} id="outlined-full-width" fullWidth label="Current Password" variant="outlined" type="password" />
                        </div>
                        <div className="flex-default m-y-sm ">
                            <div className="box-small-width">
                               New password:
                            </div>
                                    <div className="pad-y-sm position-relative full-width">
                                        <TextField disabled={passwordEnable} error={passwordErrorState} helperText={passwordError} onChange={e => { setPasswordInput(e.target.value) }} value={passwordInput} id="outlined-full-width" fullWidth label="New Password" variant="outlined" type={showPasswordState?"text":"password"}/>
                                            <div div className="position-absolute-right">
                                                <IconButton onClick = {showPassword}>
                                                    {showPasswordState?<Visibility />:<VisibilityOff />}
                                                </IconButton>
                                            </div>
                                    </div>
                        </div>
                        <div className="flex-default m-y-sm ">
                            <div className="box-small-width">
                               Repeat password:
                            </div>
                            <TextField disabled={passwordEnable} error={passwordConfirmErrorState} helperText={passwordConfirmError} onChange={e => { setPasswordConfirmInput(e.target.value) }} value={passwordConfirmInput} id="outlined-full-width" fullWidth label="Confirm Password" variant="outlined" type="password" />
                            
                        </div>
                        <div className={!passwordEnable? "display-none":""}>
                        <div className="pad-y-sm">
                            
                                  <Button onClick={setPasswordEnableTrue} variant="outlined" size="medium">
                                        Edit settings
                                  </Button>
                        </div>
                    
                        </div>
                        <div className="display-none" id ={!passwordEnable? "display-block" : ""}>
                            <div className="pad-y-sm flex-default">
                                    <Button onClick={resetPassword} variant="contained" size="medium" id="btn-large-primary">
                                            Save changes
                                    </Button>
                                    <div className="pad-x-sm">
                                        <Button onClick={cancelTextField} variant="outlined" size="medium">
                                            Cancel
                                    </Button>
                                    </div>
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
                </div>
            
            </TabPanel>
            <TabPanel value={value} index={1} className="width-md-no-margin">
                
            </TabPanel>
            
            </Box>
            
        </Container>
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
    </div>
  );
}
