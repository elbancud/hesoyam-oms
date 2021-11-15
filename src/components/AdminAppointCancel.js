import React, { useEffect, useState}from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import {   useHistory} from 'react-router-dom';
import { Button } from "@material-ui/core";
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

  

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [userDetails, setUserDetails] = useState();
    const [open, setOpen] = useState(false);

    const [currentAppointKey, setCurrentAppointKey] = useState("")
    const [currentId, setCurrentId] = useState("")
    const [currentOverallKey, setCurrentOverallKey] = useState("");
   
    const [update, setUpdate] = useState(false)
    const [seatDb, setSeatDb] = useState("")
    const [notifCount, setNotifCount] = useState(0)

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

    function handleCancel(userLoginKey, userAppointKey, overAllEventKey, seatDb) {

        setCurrentId(userLoginKey)
        setCurrentAppointKey(userAppointKey)
        setCurrentOverallKey(overAllEventKey)
        setSeatDb(seatDb)
        
        setOpen(true);

    }
 
    function cancelAppointment() {

        const db = firebase.database().ref("user-account-details/" + currentId + "/appointments/" + currentAppointKey)
        const dbOverall = firebase.database().ref("overallEvents/" + currentOverallKey);
        if (seatDb) {
            const dbseat = firebase.database().ref(seatDb)
            dbseat.update({ reserved: false })
            
        }
        db.remove().then(() => {
                    setAlertStatus(true);
                    setFeedbackVariant("success");
                    setAlertMessage("Success! appointment cancelled.")
        })
        dbOverall.remove()
        setUpdate(!update)
        setOpen(false)
    }

    useEffect(() => {
                  
                       
        const dbUser = firebase.database().ref("overallEvents");

        dbUser.once('value').then((snapshot) => {

                const postSnap = snapshot.val();
                const userDetails = [];
                
                for (let id in postSnap) {
                    userDetails.push({id, ...postSnap[id]});
                }
                
                setUserDetails(userDetails)
                
        })
    }, [update]);
 

    return (
        <div className="design1-properties">
            <header>
                <div className="position-relative ">
                    <Container>
                    <div>
                    <TableContainer className="box">
                    <Table  size="medium" aria-label="a dense table">
                        <TableHead>
                            
                            <TableRow>
                                <TableCell align="center" colSpan={9}>Appointments</TableCell>
                            
                            </TableRow>
                            
                            <TableRow>
                                
                                <TableCell>Service</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Seat</TableCell>
                                <TableCell>Key</TableCell>
                                <TableCell>QR Image</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Reasons</TableCell>
                                <TableCell>Action</TableCell>
                                
                            
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                            userDetails ? userDetails.map((data) => {
                                
                              
                                let currentDate = new Date().getDate()
                                let currentYear = new Date().getFullYear()
                                let currentMonth = new Date().getMonth()
                                let appointmentDate = new Date(data.end)
                                let btnState = false
                                
                                if (parseInt(currentMonth,10) <= parseInt(appointmentDate.getMonth(),10) && parseInt(currentYear,10) <= parseInt(appointmentDate.getFullYear(),10)) {
                                    if (parseInt(currentDate, 10) < parseInt(appointmentDate.getDate(), 10)) {
                                        btnState = true
                                    }
                                }
                                return (
                                        <TableRow key={data.id}>
                                            
                                            <TableCell align="left"> {data.title} </TableCell> 
                                            
                                            <TableCell align="left"> {data.end} </TableCell>
                                            
                                            <TableCell align="left"> {new Date(data.time).getHours() + ":" + (new Date(data.time).getMinutes() ===0 ? "00": new Date(data.time).getMinutes()) + " " + (new Date(data.time).getHours() > 13 ? "PM" : "AM")} </TableCell>
                                            <TableCell align="left">
                                                {data.seatRow?  "Group " + data.groupCol +" : " + data.seatRow : "N/A"}
                                             </TableCell>
                                            <TableCell align="left"> {data.key} </TableCell>
                                            
                                            <TableCell align="left"> 
                                               <img src={data.qrLink} className="qr-150" alt = "qr"/>
                                             </TableCell>
                                             <TableCell align="left"> 
                                              {data.reason ? <p className="error-red ">For Cancellation</p>: <p className="sucess">Proceeding</p>} 
                                            </TableCell>
                                            <TableCell align="left"> 
                                              {data.reason} 
                                            </TableCell>
                                            
                                            <TableCell align="left"> 
                                                <Button disabled={!data.reason}  id={!data.reason ? "btn-disabled-contained" : "btn-error-contained"} color="inherit" onClick={()=> {handleCancel(data.key,  data.appointmentKey, data.id, data.seatDb)}}>cancel</Button>
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
              
            

            
            {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
            feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning">
                    {alertMessage}
                </Alert>
              </Snackbar> :
             <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                   {alertMessage}
                </Alert>
            </Snackbar>
            }
        </div>

    )
}

export default UserAppointment
