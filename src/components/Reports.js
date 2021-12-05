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
import TopNavGenWeb from './TopNavGenWeb'

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
  const [activeCookies, setActiveCookes] = useState(false)

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
    const [activeDesign, setActiveDesign] = useState("")
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
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
        const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {

                                    setSiteTitle(snapshot.val().savedSiteTitle)
                            });
        setUsernameInput(cookies.UserFirstName)
        setEmailInput(cookies.UserEmail)
        setLastNameInput(cookies.UserLastName)

        const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
    }, []);
   
  return (
    <div className="position-relative">
        <div className="design1-properties">
              <div className="position-absolute " id="primary-bg-color">
            </div>
        </div>
        <Container>
            
        
            <Box
                sx={{ flexGrow: 1, display: 'flex', width:'100%', flexWrap: 'wrap'}}
            >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className="box pad-xy-sm "
            >
                <Tab label="Pages: Staffs" {...a11yProps(1)} />
                <Tab label="Pages: Prayerwall" {...a11yProps(3)} />
                <Tab label="Pages: Recorded Streams" {...a11yProps(3)} />
                
                
                
                
            </Tabs>
            <TabPanel value={value} index={0}  className="width-md-no-margin">
                    
                <div>
                    <b>Profile</b>
                    <br />
                    Your personal information
                </div>
                
             
            
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
