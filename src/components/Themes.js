import React, {useState} from 'react'
import design1 from '../images/Design1-BoldType.JPG';
import design2 from '../images/Design2-SerifFlex.JPG';
import design3 from '../images/Design3-DarkModeSerif.JPG';
import { Button } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Design1 from './Design1';
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';
import TabletIcon from '@material-ui/icons/Tablet';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import firebase from '../firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useCookies } from 'react-cookie';

function Themes() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [designPage, setDesignPage] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const [webSizeCustom, setWebSizeCustom] = useState("");

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [cookies, setCookie] = useCookies(['user']);
    
 
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlertStatus(false);
    };
    const handleClickMenu = (event, designPass) => {
        setAnchorEl(event.currentTarget);
        setDesignPage(designPass);
    };
    const handleClose= () => {
        setAnchorEl(null);

    };
  
    const handleOpenModal = () => {
         setOpenModal(true);
    }
     const closeModal = () => {
         setOpenModal(false);
        setAnchorEl(null);

    }
    const webSize = (size) => {
        setWebSizeCustom(size);
    }
    function registerTheme(designName) {
     
        
        const dbRefWithKey = firebase.database().ref("account-details/" + cookies.Key);
        dbRefWithKey.on('value', snapshot => {
            snapshot.forEach(snap => {
             
                if (snap.hasChild("designName")) {
                    setAlertStatus(true);
                    setFeedbackVariant("warning");
                    setAlertMessage("Hold on! didn't you already have chosen a theme?, kindly visit the pages tab")
                    setAnchorEl(null);
                    setCookie('DesignName',designName);
                    
                    return true
                } else {
                    const pushThemeSelection = {
                        designName: designName
                    }
                    dbRefWithKey.push(pushThemeSelection)
                    setAlertStatus(true)
                    setFeedbackVariant("success")
                    setAlertMessage("Good job so far!. Visit the page tab to start customizing them.")
                    setAnchorEl(null);
                    setCookie('DesignName',designName);

                    return true
                    
                }
            })
        });
        
                            
    }
    return (
        <div>
            
            <main className="m-x-sm pad-y-md  " >
                    
                    <div className="title pad-y-sm">
                        <h2>Themes</h2>
                        <p>Select and activate your preferred themes here then customize them in the pages tab.</p>
                    </div>
                     <div className=" flex-no-wrap flex-default-center-xy">
                        <div className="box box-default-width m-xy-md theme-img">
                            <img src={design1} alt = "design 1"></img>
                            <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                <div className="flex-space-between pad-y-sm">
                                    <p>Bold and Loud</p>
                                    <Button
                                            onClick={(event) => { handleClickMenu(event,"design1") }}
                                            className="btn-large primary-color"
                                            color="secondary"
                                            size="large"
                                    >
                                    <MoreHorizIcon />
                                    
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="box box-default-width  m-xy-md theme-img">
                             <img src={design2} alt = "design 2"></img>
                             <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                <div className="flex-space-between pad-y-sm">
                                    <p>Classic Blue</p>
                                    <Button
                                            className="btn-large primary-color"
                                            color="secondary"
                                            size="large"
                                    >
                                    <MoreHorizIcon />
                                    
                                    </Button>
                                </div>
                            </div>  
                        </div>
                        <div className="box box-default-width  m-xy-md theme-img">
                             <img src={design3} alt ="design 3"></img>
                             <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                <div className="flex-space-between pad-y-sm">
                                    <p>Dark Spectrum</p>
                                    <Button
                                            className="btn-large primary-color"
                                            color="secondary"
                                            size="large"
                                    >
                                    <MoreHorizIcon />
                                    
                                    </Button>
                                </div>
                            </div>  
                        </div>
             
                    </div>
                
            </main>
         

            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className=""
            >
                <MenuItem onClick={handleOpenModal} className="pad-x-md">Live demo</MenuItem>
                <MenuItem onClick={() => { registerTheme (designPage)}} className="pad-x-md">Activate</MenuItem>
            </Menu>
            <Modal
                    className="overflow-scroll"
                    classes="modal"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openModal}
                    onClose={closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={openModal}>
                    <div className="plain-white-color-bg themes-modal">
                        <div className="flex-space-between pad-xy-sm plain-white-color-bg">
                            <div className="pad-r-sm">
                                    <Button
                                        onClick={closeModal}

                                        variant="outlined"
                                        className="btn-large primary-color"
                                        color="primary"
                                        size="large"
                                    >
                                        Close
                                    </Button>
                                </div>
                            <div className="flex-default">
                                
                                <div className="pad-x-sm">
                                    <Button
                                        onClick={() => { webSize("mobile-size")}}
                                        className="btn-large primary-color"
                                        color="primary"
                                        size="large"
                                    >
                                        <MobileFriendlyIcon/>
                                    </Button>
                                </div>
                                <div className="">
                                    <Button
                                        onClick={() => { webSize("tablet-size")}}
                                        className="btn-large primary-color"
                                        color="primary"
                                        size="large"
                                    >
                                        <TabletIcon/>
                                    </Button>
                                    
                                </div>
                                <div className="">
                                    <Button
                                        onClick={()=> {webSize("desktop-size")}}
                                        className="btn-large primary-color"
                                        color="primary"
                                        size="large"
                                    >
                                        <DesktopWindowsIcon/>
                                    </Button>
                                </div>
                            </div>
                                <Button
                                        id="btn-large-secondary"    
                                        variant="contained"
                                        className="btn-large primary-color"
                                        color="secondary"
                                        size="large"
                                    >
                                        Try and customize
                                    </Button>
                            </div>
                            <div className="tertiary-color ">
                                <div  className={webSizeCustom}>
                                    {designPage === "design1"? <Design1/>:""}
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
export default Themes
