import React, { useEffect, useState}from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import UserProfile from './UserProfile';
import { Button } from "@material-ui/core";
import TopNavGenWeb from './TopNavGenWeb'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function UserAppointment({ service, image }) {

    const [siteTitle, setSiteTitle] = useState("");
    const history = useHistory();
    const [cookies] = useCookies(['user']);

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [userDetails, setUserDetails] = useState();
    const [open, setOpen] = useState(false);

    const [currentId, setCurrentId] = useState("")
    const [serviceDetails, setServiceDetails] = useState("");
    const [currentTime, setCurrentTime] = useState("")
    const [currentDate, setCurrentDate] = useState("")
    const [daysBeforecancel, setDaysBeforeCancel] = useState(0)

    const handleClose = () => {
        setOpen(false);
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


    //open dialog box
    //set variables depending on table data

    function handleCancel(id, service, date, time) {

        let titleHanlder = service + " " + cookies.UserLastName + " " + cookies.UserFirstName
        let fTime = new Date(time).getHours() + ":" + new Date(time).getMinutes()

        setCurrentId(id)
        setCurrentTime(fTime)
        setServiceDetails(titleHanlder)
        setCurrentDate(date)

        const dbService = firebase.database().ref("services/" + service);
        
        dbService.once("value").then(function (snapshot) {

                setDaysBeforeCancel(snapshot.val().daysBeforeCancel)
             
        });
        
        setOpen(true);

    }

    function cancelAppointment() {

        let fCurrentDate = new Date(currentDate)
        let fMonth = fCurrentDate.getMonth() + 1
        let fDate = parseInt(daysBeforecancel,10)  / 30
        let fCons = Math.floor(fDate)
        let finalDate = 0
        let today = new Date().getDate()
        let monthToday = new Date().getMonth()
        let remainder = parseInt(daysBeforecancel,10)  % 30;

        if (fDate <= 1) {

            finalDate = parseInt(fCurrentDate.getDate()) - parseInt(daysBeforecancel,10)
            if (finalDate < 0) {

                //appointment minus days before cancellation
                //minusing todays month

                finalDate = today - Math.abs(finalDate)
                fMonth -= 1;
                if (today < finalDate  && fMonth === monthToday) {
                    alert("Cancellation period of " + daysBeforecancel + " days is already over. Please contact the admin via email or contact number for further actions");

                } else {
                    alert("Good to go")

                }

            } else {

                if (finalDate < today) {
                    alert("You're illegible to cancel this appointment")
                    
                } else {
                    alert("Good to go")
                }
            }
        
        } else {

            if (remainder === 0) {
                
                fMonth -= fDate
                finalDate = fCurrentDate.getDay()
                
                if (monthToday < fMonth ||  today <= finalDate ) {
                    alert("Cancellation period of " + daysBeforecancel + " days is already over. Please contact the admin via email or contact number for further actions");

                } else {
                    alert("Good to go")

                }

            } else {
                

            }
            
        }
    }

    useEffect(() => {
                    const dbRef = firebase.database().ref("generated-data");
                    dbRef.on('value', snapshot => {

                            setSiteTitle(snapshot.val().savedSiteTitle)
                    });
                       
        const dbUser = firebase.database().ref("user-account-details/" +cookies.UserLoginKey+ "/appointments");
        
        dbUser.once('value').then((snapshot) => {
       
                const postSnap = snapshot.val();
                const userDetails = [];
                
                for (let id in postSnap) {
                    userDetails.push({id, ...postSnap[id]});
                }
                
                setUserDetails(userDetails)
        })
       
    }, []);
 
    function prayerWall() {
        history.push("/prayerWall")
    }

    function donate() {
        history.push("/donationPage")
    }

    function pod() {
        history.push("/userPodcast")
    }

    function handleServiceRedirect() {

        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")
        }

    }


    return (
        <div className="design1-properties">
            <header>
                <div className="position-relative ">
                    <Container>
                    <div className="pad-xy-sm position-fixed-top-z-0 full-width height-90 gradient-geometric " id="">
                    </div>
                        
                    <nav className="pad-y-md flex-space-between " >
                        <div className="logo flex-default">
                            <div className="icon"></div>
                             <div className="app-name cursor-pointer">
                                <Link to="/design1">
                                    <h3 className="" id =""> {typeof(siteTitle) === 'undefined'? "Site title": siteTitle}</h3>
                                    
                                </Link>
                            </div>
                        </div>
                        <div className="nav-desktop-active">
                            <ul className="flex-default">
                                    <li onClick={prayerWall}>
                                            Prayer Wall
                                    </li>
                                    <li onClick = {donate}>
                                            Donate
                                    </li>
                                    <li onClick={handleServiceRedirect}>
                                            Services
                                    </li>
                                    <li onClick={pod}>
                                            Podcast
                                    </li>

                            </ul>
                        </div>
                        <div className="nav-desktop-active">
                         <UserProfile/>
                   
                        </div>
                        <div className="burger-nav ">
                            <div className="flex-default">
                                <div className="pad-x-sm">
                                    <UserProfile/>
                                </div>
                                <TopNavGenWeb></TopNavGenWeb>
                                
                            </div>
                        </div>
                    </nav>
           
                    <div>
                        <TableContainer className="box">
                    <Table  size="medium" aria-label="a dense table">
                        <TableHead>
                            
                            <TableRow>
                                <TableCell align="center" colSpan={6}>Appointment</TableCell>
                            
                            </TableRow>
                            
                            <TableRow>
                                
                                <TableCell>Service</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Seat</TableCell>
                                <TableCell>QR Image</TableCell>
                                <TableCell>Action</TableCell>
                            
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                            userDetails ? userDetails.map((data) => {
                                return (
                                        <TableRow key={data.id}>
                                            
                                            <TableCell align="left"> {data.title} </TableCell> 
                                            
                                            <TableCell align="left"> {data.end} </TableCell>
                                            
                                            <TableCell align="left"> {new Date(data.time).getHours() + ":" + (new Date(data.time).getMinutes() ===0 ? "00": new Date(data.time).getMinutes()) + " " + (new Date(data.time).getHours() > 13 ? "PM" : "AM")} </TableCell>
                                             
                                            <TableCell align="left">
                                                {data.seatRow?  "Group " + data.groupCol +" : " + data.seatRow : "N/A"}
                                             </TableCell>
                                            
                                            <TableCell align="left"> 
                                               <img src={data.qrLink} className="qr-150"/>
                                             </TableCell>
                                            
                                            <TableCell align="left"> 
                                                    <Button size="small" variant="contained" id="btn-error-contained" color="error" onClick={()=> {handleCancel(data.id, data.title, data.end, data.time)}}>cancel</Button>
                                             </TableCell>
                                            
                                            
                                            
                                        </TableRow>
                                        )

                                    }) : ""
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                    </div>
                    </Container>
                </div>
            </header>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Cancel appointment?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Be mindfull that the appointment will be completety removed from the system and no longer can be retrievable. 
                    If you want to continue please press I agree.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={cancelAppointment} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
              
            

            
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

    )
}

export default UserAppointment
