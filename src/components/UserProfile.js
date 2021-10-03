import React, {useEffect, useState} from 'react'
import '../style/themes.css'
import '../style/style.css'
import {useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
// import { auth } from '../firebase';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
export default function AccountMenu() {
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cookies,setCookies, removeCookie] = useCookies(["user"]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
           
              setFirstName(cookies.UserFirstName ? cookies.UserFirstName : "")
              setLastName(cookies.UserLastName ? cookies.UserLastName: "")
              setEmail(cookies.UserEmail ? cookies.UserEmail : "")

            
    }, []);

    function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }
  function stringAvatar() {
    return {
      sx: {
        bgcolor: stringToColor(firstName + lastName),
      },
      children: `${firstName.charAt(0).toUpperCase()+""+lastName.charAt(0).toUpperCase()}`,
    };
  }
  const redirectToUserSetting = () => {
    history.push("/userSettings")
  }
  const handleCloseModal = () => {
    setOpenLogoutModal(false)
  }
  const logoutModalOpen = () => {
    setOpenLogoutModal(true)
    
  }
  const handleLogout = () => {
     firebase.auth().signOut().then(() => {
            removeCookie("UserLoginKey");
            removeCookie("UserFirstName");
            removeCookie("UserLastName");
            removeCookie("UserEmail");
            
            setOpenLogoutModal(false)
            history.push("/design1")
            window.location.reload();
        })
   }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ bgcolor: {stringToColor}, width: 50, height: 50 }} {...stringAvatar()}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
            sx: {
            width: 200,
            padding:"0.4rem",
            overflow: 'visible',
            boxShadow: "0 0.5rem 1.2rem rgba(189, 197, 209, 0.9)",
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 3,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
            <MenuItem onClick>
                <div className="custom-p">
                  <p><b>{firstName + " " + lastName}</b></p>
                  <p >{email}</p>
                  
                </div>
            </MenuItem>
            
            
            <MenuItem>
               Appointments
            </MenuItem>
            {/* <Divider /> */}
            
            <MenuItem onClick = {redirectToUserSetting}>
              Settings
            </MenuItem>
            <MenuItem onClick={logoutModalOpen}>
             
              Logout
            </MenuItem>
          </Menu>
          <Modal
                    classes="modal"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openLogoutModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={openLogoutModal}>
                        <div className="tertiary-color modal-body position-relative">
                        
                            <div className = "pad-y-md m-b-md">
                                <div className="align-text-center pad-x-md">
                                <h2>Logout</h2>
                                    <p>
                                        Are you sure you want to Logout 
                                    </p>
                                    
                                </div>

                            </div>
                            <div className="modal-footer plain-white-accent-bg flex-end pad-x-md ">
                                <div className="flex-default pad-y-sm">
                                    <Button
                                    onClick={handleCloseModal}>
                                            <b className="primary-color-text pad-x-sm">Cancel</b>
                                    </Button>
                                    <Button
                                            onClick={handleLogout}
                                            variant="contained"
                                            className="btn-large primary-color"
                                            color="secondary"
                                            size="large"
                                            id ="btn-default-primary"
                                        >
                                            Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Fade>
            </Modal>
    </React.Fragment>
  );
}
