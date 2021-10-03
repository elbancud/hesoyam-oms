import React, {useState} from 'react'
import "../style/style.css";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import usernameIllustration from "../images/username-illustration.png";
import emailIllustration from "../images/email-illustration.png";

import passwordIllustration from "../images/password-illustration.png";
import { auth } from '../firebase';
import firebase from '../firebase';
import validator from 'validator';
import { useHistory} from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';

function AdminAccountManagement({ username, email }) {
    const history = useHistory();
    const { currentUser, key } = useAuth();
     const [cookies, removeCookie] = useCookies(["user"]);

    const [openUsernameModal, setOpenUsernameModal] = useState(false);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [showPasswordState, setShowPasswordState] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [usernameErrorState, setUsernameErrorState] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [passwordCurrentInput, setPasswordCurrentInput] = useState('');
    const [passwordCurrentError, setPasswordCurrentError] = useState('');
    const [passwordCurrentErrorState, setPasswordCurrentErrorState] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState(false);

    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [passwordConfirmErrorState, setPasswordConfirmErrorState] = useState(false);

    const [user] = useState(null);
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailErrorState, setEmailErrorState] = useState(false);
    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    
    
    const handleOpenUsernameModal = () => {
        setOpenUsernameModal(true);
    };
    const handleCloseUsernameModal = () => {
        setOpenUsernameModal(false);
    };
    const handleOpenEmailModal = () => {
        setOpenEmailModal(true);
    };
    const handleCloseEmailModal = () => {
        setOpenEmailModal(false);
    };
    const handleOpenResetPassModal = () => {
        setOpenPasswordModal(true);
    };
    const handleCloseResetPassModal = () => {
        setOpenPasswordModal(false);
    };
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
    function handleChangeUsername(e) {
        e.preventDefault();
        const dbRef = firebase.database().ref("account-details");
        if (!usernameInput ) {
            setUsernameError("Please enter your Username");
            setUsernameErrorState(true);
            }else if (usernameInput.length < 8) {
            setUsernameError("Username must be minimum of 8 characters");
            setUsernameErrorState(true);
            }else {
            setUsernameError("");
            setUsernameErrorState(false);
        }
        if (!passwordInput) {
            setPasswordError("Please enter your Password");
            setPasswordErrorState(true);
        } else {
            setPasswordError("");
            setPasswordErrorState(false);
             auth.signInWithEmailAndPassword(currentUser, passwordInput)
                 .then(user => {
                  dbRef.orderByChild('username').equalTo(usernameInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setUsernameErrorState(true);
                        setUsernameError("Username already taken");
                    } else {
                        const dbRef = firebase.database().ref("account-details/" + key);
                            dbRef.update({ username: usernameInput });
                            setOpenUsernameModal(false);
                            setUsernameInput("");
                            setPasswordInput("");
                            setPasswordErrorState(false);
                        
                            setAlertStatus(true)
                            setFeedbackVariant("success")
                            setAlertMessage("Hey there chief! username updated.")
                    }   
                });    
            }).catch(error => {
                setPasswordError("Invalid password");
                setPasswordErrorState(true);
                            
            })
        }
        
      
    }
    function handleEmailReset(e) {
        if (!emailInput) {
            setEmailError("Please enter your Email");
            setEmailErrorState(true);

        } else if (!validator.isEmail(emailInput)) {
            setEmailError("Please enter a valid email");
            setEmailErrorState(true);
        } else if (emailInput === user) {
            setEmailError("Please choose a different email from your current one");
            setEmailErrorState(true);
        }
        if (!passwordInput) {
            setPasswordError("Please enter your password");
            setPasswordErrorState(true);
        } else {
            setPasswordError("");
            setPasswordErrorState(false);
            auth.signInWithEmailAndPassword(cookies.User, passwordInput)
            .then(user => {
                const dbRef = firebase.database().ref("account-details");
                dbRef.orderByChild('email').equalTo(emailInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setEmailError("Email already exists");
                        setEmailErrorState(true);

                    } else {
                        firebase.auth().currentUser.updateEmail(emailInput).then(() => {
                            setEmailErrorState(false);

                            const dbRefSpecific = firebase.database().ref("account-details/" + key);
                            dbRefSpecific.update({ email: emailInput });

                            setOpenEmailModal(false);
                            setUsernameInput("");
                            setPasswordInput("");
                            setPasswordErrorState(false);
                            setAlertStatus(true)

                            setFeedbackVariant("success")
                            setAlertMessage("Great job chief! Email updated.")
                        }).catch((error) => {
                        // An error occurred
                        // ...
                        });
                    }
                })
                            setPasswordError("");
                            setPasswordErrorState(false);
            }).catch(error => {
                setPasswordError("Incorrect password");
                setPasswordErrorState(true);
            })
      }
    }
    function handleResetPassword(e) {
          auth.signInWithEmailAndPassword(cookies.User, passwordCurrentInput)
              .then(user => {
                setPasswordCurrentError("");
                 setPasswordCurrentErrorState(false);
                 
            }).catch(error => {
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
        } if (!passwordConfirmInput) {
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
                setOpenPasswordModal(false);
                setAlertStatus(true)
                setFeedbackVariant("success")
                setAlertMessage("Keep it to yourself chief! password updated.")
            })
        }
    }
    function handleSignOut(e) {
        firebase.auth().signOut().then(() => {
            removeCookie("DesignName");
            removeCookie("User");
            removeCookie("Key");
            history.push("/login");

        })
    }
    return (
        <div>
            <main className="m-x-sm pad-y-md main-custom-flex " >
                <Container className="pad-y-lg">
                    <div className="title">
                        <h2>My Account</h2>
                    </div>
                    <div className="box box-default-width pad-xy-sm  ">
                            <div className="pad-x-sm">
                            </div>
                            <div className="subtitle flex-space-between ">
                                <div>
                                    <p>USERNAME</p>
                                    <p><b>{username}</b></p>
                                </div>
                                <div>
                                 <Button
                                        onClick={handleOpenUsernameModal}
                                        variant="contained"
                                        className="btn-large primary-color"
                                        color="secondary"
                                        size="large"
                                        id ="btn-default-primary"
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                            <div className="subtitle flex-space-between m-y-sm">
                                <div>
                                    <p>EMAIL</p>
                                    <p><b>{cookies.User}</b></p>
                                
                                </div>
                                <div>
                                    <Button
                                        onClick={handleOpenEmailModal}

                                        variant="contained"
                                        className="btn-large primary-color"
                                        color="secondary"
                                        size="large"
                                        id ="btn-default-primary"
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="box box-default-width pad-xy-sm m-t-sm">
                            
                          
                            <div className="subtitle  m-y-sm">
                                <div>
                                    <p><b>Manage password</b></p>
                                    <p>Clicking the button prompts your form for changing password.</p>
                                
                                </div>
                                <div className="pad-y-sm">
                                    <Button
                                        onClick={handleOpenResetPassModal}

                                        variant="outlined"
                                        className="btn-large primary-color"
                                        color="primary"
                                        size="large"
                                    >
                                        Change password
                                    </Button>
                                </div>
                            </div>
                        </div>
                    <div className=" box-default-width pad-xy-sm m-t-md top-border" >
                                    <Button
                                        onClick={handleSignOut}
                                        id="btn-large-secondary"    
                                        variant="contained"
                                        className="btn-large primary-color"
                                        color="secondary"
                                        size="large"
                                    >
                                        Logout
                                    </Button>
                     </div>
                </Container>
                </main>
                <Modal
                    classes="modal"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openUsernameModal}
                    onClose={handleCloseUsernameModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={openUsernameModal}>
                    <div className="tertiary-color modal-body position-relative">
                        <div className="position-absolute off-set-top">
                            <div className="account-img">
                                <img src={usernameIllustration} alt="username"></img>
                            </div>
                        </div>
                        <div className = "pad-t-md">
                            <div className="  align-text-center pad-x-md">
                                <h2>Change your username</h2>
                                <p>
                                    Enter a new username and your existing password
                                </p>
                                <div className="pad-y-sm">
                                    <div >
                                        <TextField  error={usernameErrorState} helperText={usernameError} onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} id="outlined-full-width" fullWidth label="New Username" variant="outlined" type="text" className="text-input-deafult" />

                                    </div>
                                    <div className="pad-y-sm position-relative ">
                                        <TextField error={passwordErrorState} helperText={passwordError} onChange={e => { setPasswordInput(e.target.value) }} value={passwordInput} id="outlined-full-width" fullWidth label="Current Password" variant="outlined" type={showPasswordState?"text":"password"}/>
                                            <div  className="position-absolute-right">
                                                <IconButton onClick = {showPassword}>
                                                    {showPasswordState?<Visibility />:<VisibilityOff />}
                                                </IconButton>
                                            </div>
                                    </div>

                                </div>
                                
                            </div>

                        </div>
                        <div className="modal-footer plain-white-accent-bg  flex-end pad-x-md ">
                            <div className="flex-default pad-y-sm">
                                <Button
                                onClick={handleCloseUsernameModal}>
                                        <b className="primary-color-text pad-x-sm">Cancel</b>
                                </Button>
                                <Button
                                    onClick={handleChangeUsername}
                                        variant="contained"
                                        className="btn-large primary-color"
                                        color="secondary"
                                        size="large"
                                        id ="btn-default-primary"
                                    >
                                        Done
                                </Button>
                            </div>
                        </div>
                    </div>
                    </Fade>
                </Modal>
                 <Modal
                    classes="modal"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openEmailModal}
                    onClose={handleCloseEmailModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={openEmailModal}>
                    <div className="tertiary-color modal-body position-relative">
                        <div className="position-absolute off-set-top">
                            <div className="account-img">
                                <img src={emailIllustration} alt="email"></img>
                            </div>
                        </div>
                        <div className = "pad-t-md">
                            <div className="align-text-center pad-x-md">
                                <h2>Change your email</h2>
                                <p>
                                    Enter a new and registered email and your existing password
                                </p>
                                <div className="pad-y-sm">
                                    <div>
                                        <TextField error={emailErrorState} helperText={emailError} onChange={e => {setEmailInput(e.target.value)}} value={emailInput}   id="outlined-full-width" fullWidth label="Enter New Email" variant="outlined" className="text-input-deafult"/>
                                    </div>
                                    <div className="pad-y-sm position-relative ">
                                        <TextField error={passwordErrorState} helperText={passwordError} onChange={e => { setPasswordInput(e.target.value) }} value={passwordInput} id="outlined-full-width" fullWidth label="Current Password" variant="outlined" type={showPasswordState?"text":"password"}/>
                                            <div div className="position-absolute-right">
                                                <IconButton onClick = {showPassword}>
                                                    {showPasswordState?<Visibility />:<VisibilityOff />}
                                                </IconButton>
                                            </div>
                                    </div>

                                </div>
                                
                            </div>

                        </div>
                        <div className="modal-footer plain-white-accent-bg flex-end pad-x-md ">
                            <div className="flex-default pad-y-sm">
                                <Button
                                onClick={handleCloseEmailModal}>
                                        <b className="primary-color-text pad-x-sm">Cancel</b>
                                </Button>
                                <Button
                                        onClick={handleEmailReset}
                                        variant="contained"
                                        className="btn-large primary-color"
                                        color="secondary"
                                        size="large"
                                        id ="btn-default-primary"
                                    >
                                        Done
                                </Button>
                            </div>
                        </div>
                    </div>
                    </Fade>
            </Modal>
            <Modal
                    classes="modal"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openPasswordModal}
                    onClose={handleCloseResetPassModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={openPasswordModal}>
                    <div className="tertiary-color modal-body position-relative">
                        <div className="position-absolute off-set-top-mid">
                            <div className="account-img">
                                <img src={passwordIllustration} alt="password"></img>
                            </div>
                        </div>
                        <div className = "pad-t-md">
                            <div className="align-text-center pad-x-md">
                                <h2>Reset your password</h2>
                                <p>
                                    Enter your current and new password
                                </p>
                                <div className="pad-y-sm">
                                    <div className=" ">
                                            <TextField error={passwordCurrentErrorState} helperText={passwordCurrentError} onChange={e => { setPasswordCurrentInput(e.target.value) }} value={passwordCurrentInput} id="outlined-full-width" fullWidth label="Current Password" variant="outlined" type="password" />
                                    </div>

                                    <div className="pad-y-sm position-relative ">
                                        <TextField error={passwordErrorState} helperText={passwordError} onChange={e => { setPasswordInput(e.target.value) }} value={passwordInput} id="outlined-full-width" fullWidth label="New Password" variant="outlined" type={showPasswordState?"text":"password"}/>
                                            <div div className="position-absolute-right">
                                                <IconButton onClick = {showPassword}>
                                                    {showPasswordState?<Visibility />:<VisibilityOff />}
                                                </IconButton>
                                            </div>
                                    </div>
                                    <div className=" ">
                                       
                                            <TextField error={passwordConfirmErrorState} helperText={passwordConfirmError} onChange={e => { setPasswordConfirmInput(e.target.value) }} value={passwordConfirmInput} id="outlined-full-width" fullWidth label="Confirm Password" variant="outlined" type="password" />
                                    </div>

                                </div>
                                
                            </div>

                        </div>
                        <div className="modal-footer plain-white-accent-bg flex-end pad-x-md ">
                            <div className="flex-default pad-y-sm">
                                <Button
                                onClick={handleCloseResetPassModal}>
                                        <b className="primary-color-text pad-x-sm">Cancel</b>
                                </Button>
                                <Button
                                        onClick={handleResetPassword}
                                        variant="contained"
                                        className="btn-large primary-color"
                                        color="secondary"
                                        size="large"
                                        id ="btn-default-primary"
                                    >
                                        Done
                                </Button>
                            </div>
                        </div>
                    </div>
                    </Fade>
            </Modal>
               {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
            feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning">
                    {alertMessage}
                </Alert>
              </Snackbar> :
             <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                   {alertMessage}
                </Alert>
            </Snackbar>
            }
        </div>
    )
}

export default AdminAccountManagement
