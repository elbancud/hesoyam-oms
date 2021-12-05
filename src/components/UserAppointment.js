import React, { useEffect, useState } from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import { Link, useHistory } from 'react-router-dom';
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
import TextField from "@material-ui/core/TextField";
import RingLoader from "react-spinners/RingLoader";

function UserAppointment({ service, image }) {
    const [loadingState, setLoadingState] = useState(false)

    const [titleErrorState, setTitleErrorState] = useState(false);
    const [titleError, seTitleError] = useState("");
    const [titleInput, setTitleInput] = useState("");

    const [siteTitle, setSiteTitle] = useState("");
    const history = useHistory();
    const [cookies] = useCookies(['user']);

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [userDetails, setUserDetails] = useState();
    const [open, setOpen] = useState(false);

    const [openForm, setOpenForm] = useState(false);

    const [currentService, setCurrentService] =  useState("")
    const [currentId, setCurrentId] = useState("")
    const [serviceDetails, setServiceDetails] = useState("");
    const [currentTime, setCurrentTime] = useState("")
    const [currentDate, setCurrentDate] = useState("")
    const [daysBeforecancel, setDaysBeforeCancel] = useState(0)
    const [update, setUpdate] = useState(false)
    const [seatDb, setSeatDb] = useState("")
    const [data, setData] = useState("")
    const [activeDesign, setActiveDesign] = useState("")
    const [eventKey, setEventKey] = useState("")

    const handleClose = () => {
        setOpen(false);
        setOpenForm(false)
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function handleSubmit() {
        if (titleInput.length < 8) {
            setTitleErrorState(true)
            seTitleError("Please enter atleast 8 characters or 3 words above.")
            setAlertStatus(true)
            setFeedbackVariant("warning")
            setAlertMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
        } else {
            setTitleErrorState(false)
            seTitleError("")

            const db = firebase.database().ref("overallEvents")

            db.orderByChild("user").equalTo(cookies.UserLastName + cookies.UserFirstName + " " + currentService).once("value").then((snapshot) => {
                if (snapshot.exists()) {
                    let key = Object.keys(snapshot.val())[0]
                    let dataSubmit = {
                        reason: titleInput,
                        appointmentKey: currentId
                    }
                    setLoadingState(true)
                    const dbReason = firebase.database().ref("overallEvents/" +key)
                    dbReason.update(dataSubmit).then(() => {
                        setAlertStatus(true);
                        setFeedbackVariant("success");
                        setAlertMessage("Success! reason sent. Cancellation may be done after a short while.")
                        setLoadingState(false)
                    })
                    setOpenForm(false)
                    // const dbAppointmentCancelCount = firebase.database().ref("cancelCount")
                    // dbAppointmentCancelCount.update(dataSubmit)
                } 
            })

        }
    }
    const handleCloseAlert = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }
        setAlertStatus(false);
    };


    //open dialog box
    //set variables depending on table data

    function handleCancel(title, id, service, date, time, seatDb, eventKey) {

        let titleHanlder = service + " " + cookies.UserLastName + " " + cookies.UserFirstName
        let fTime = new Date(time).getHours() + ":" + new Date(time).getMinutes()

        setCurrentService(title)
        setCurrentId(id)
        setCurrentTime(fTime)
        setServiceDetails(titleHanlder)
        setCurrentDate(date)
        setSeatDb(seatDb)
        setEventKey(eventKey)

        const dbService = firebase.database().ref("services/" + service);

        dbService.once("value").then(function (snapshot) {

            setDaysBeforeCancel(snapshot.val().daysBeforeCancel)

        });

        setOpen(true);

    }
    function remove() {
        const db = firebase.database().ref("user-account-details/" + cookies.UserLoginKey + "/appointments/" + currentId)
        db.remove().then(() => {
            setAlertStatus(true);
            setFeedbackVariant("success");
            setAlertMessage("Success! appointment cancelled.")
        })
        
        const dbOverall = firebase.database().ref("overallEvents")
        dbOverall.orderByChild("user").equalTo(cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService).once("value").then((snapshot) => {
            if (snapshot.exists()) {
                let key = Object.keys(snapshot.val())[0]
                const removeDb = firebase.database().ref("overallEvents/" + key)
                removeDb.remove()
            }
        })
        let currentCap = 0
        const dbSessionCapacity = firebase.database().ref("events/" + eventKey)

        dbSessionCapacity.once("value").then((snap) => {
            currentCap = snap.val().sessionCapacity    
        })

        dbSessionCapacity.update({ sessionCapacity: parseInt(currentCap + 1, 10) })
        
        
        const dbseat = firebase.database().ref(seatDb)
        dbseat.update({ reserved: false })
        
        setUpdate(!update)
        setOpen(false)
    }
    function cancelAppointment() {

        let fCurrentDate = new Date(currentDate)
        let fMonth = fCurrentDate.getMonth() + 1
        let fDate = parseInt(daysBeforecancel, 10) / 30
        let fCons = Math.floor(fDate)
        let finalDate = 0
        let today = new Date().getDate()
        let monthToday = new Date().getMonth()
        let remainder = parseInt(daysBeforecancel, 10) % 30;

        if (fDate <= 1) {

            finalDate = parseInt(fCurrentDate.getDate()) - parseInt(daysBeforecancel, 10)
            if (finalDate < 0) {
                //appointment minus days before cancellation
                //minusing todays month

                finalDate = today - Math.abs(finalDate)
                fMonth -= 1;
                if (today < finalDate && fMonth === monthToday) {
                    setAlertStatus(true);
                    setFeedbackVariant("error");
                    setAlertMessage("Cancellation period of " + daysBeforecancel + " days is already over. Please contact the admin via email or contact number for further actions")
                    setOpen(false);
                    setOpenForm(true);
                } else {
                    remove();

                }
            } else {

                if (finalDate < today) {
                    setAlertStatus(true);
                    setFeedbackVariant("error");
                    setAlertMessage("Cancellation period of " + daysBeforecancel + " days is already over. Please contact the admin via email or contact number for further actions")
                    setOpen(false);
                    setOpenForm(true);
                } else {
                    remove();

                }
            }

        } else {

            if (remainder === 0) {

                fMonth -= fDate
                finalDate = fCurrentDate.getDay()

                if (monthToday < fMonth || today <= finalDate) {
                    setAlertStatus(true);
                    setFeedbackVariant("error");
                    setAlertMessage("Cancellation period of " + daysBeforecancel + " days is already over. Please contact the admin via email or contact number for further actions")
                    setOpen(false);
                    setOpenForm(true);
                } else {
                    remove();

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

        const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
        const dbUser = firebase.database().ref("user-account-details/" + cookies.UserLoginKey + "/appointments");

        dbUser.once('value').then((snapshot) => {

            const postSnap = snapshot.val();
            const userDetails = [];

            for (let id in postSnap) {
                userDetails.push({ id, ...postSnap[id] });
            }

            setUserDetails(userDetails)
        })

    }, [update]);

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
        <div >
            <header>
                <div className="position-relative ">
                    <Container>
                        <div className="pad-xy-sm position-fixed-top-z-0 full-width height-90 gradient-geometric " id="">
                        </div>

                        <nav className="pad-y-md flex-space-between " >
                            <div className="logo flex-default">
                                <div className="icon"></div>
                                <div className="app-name cursor-pointer">
                                    <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" :"/design3"}>

                                        <h3 className="" id=""> {typeof (siteTitle) === 'undefined' ? "Site title" : siteTitle}</h3>

                                    </Link>
                                </div>
                            </div>
                            <div className="nav-desktop-active">
                                <ul className="flex-default">
                                    <li onClick={prayerWall}>
                                        Prayer Wall
                                    </li>
                                    <li onClick={donate}>
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
                                <UserProfile />

                            </div>
                            <div className="burger-nav ">
                                <div className="flex-default">
                                    <div className="pad-x-sm">
                                        <UserProfile />
                                    </div>
                                    <TopNavGenWeb></TopNavGenWeb>

                                </div>
                            </div>
                        </nav>

                        <div>
                            <TableContainer className="box">
                                <Table size="medium" aria-label="a dense table">
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


                                                let currentDate = new Date().getDate()
                                                let currentYear = new Date().getFullYear()
                                                let currentMonth = new Date().getMonth()
                                                let appointmentDate = new Date(data.end)
                                                let btnState = false

                                                if (parseInt(currentMonth, 10) <= parseInt(appointmentDate.getMonth(), 10) && parseInt(currentYear, 10) <= parseInt(appointmentDate.getFullYear(), 10)) {
                                                    if (parseInt(currentDate, 10) < parseInt(appointmentDate.getDate(), 10)) {
                                                        btnState = true
                                                    }
                                                }

                                                return (
                                                    <TableRow key={data.id}>

                                                        <TableCell align="left"> {data.title} </TableCell>

                                                        <TableCell align="left"> {data.end} </TableCell>

                                                        <TableCell align="left"> {new Date(data.time).getHours() + ":" + (new Date(data.time).getMinutes() === 0 ? "00" : new Date(data.time).getMinutes()) + " " + (new Date(data.time).getHours() > 13 ? "PM" : "AM")} </TableCell>

                                                        <TableCell align="left">
                                                            {data.seatRow ? "Group " + data.groupCol + " : " + data.seatRow : "N/A"}
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            <img src={data.qrLink} className="qr-150" />
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            <Button disabled={parseInt(new Date(data.end).getFullYear(), 10) <= parseInt(new Date().getFullYear(), 10) && parseInt(new Date(data.end).getMonth(), 10) < parseInt(new Date().getMonth(), 10)} size="small" variant="contained" id={parseInt(new Date(data.end).getFullYear(), 10) <= parseInt(new Date().getFullYear(), 10) && parseInt(new Date(data.end).getMonth(), 10) < parseInt(new Date().getMonth(), 10) ? "btn-disabled-contained" : "btn-error-contained"} color="default" onClick={() => { handleCancel(data.title, data.id, data.title, data.end, data.time, data.seatDb, data.eventKey) }}>cancel</Button>
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

            <Dialog open={openForm} onClose={handleClose}>
                <DialogTitle>Contact admin</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you will have a chance to cancel this appointment. Type in your reason for the cancellation and the admin will have the final judgement for the cancellation
                    </DialogContentText>
                    <div className="pad-y-sm">
                        <TextField error={titleErrorState} helperText={titleError} onChange={e => { setTitleInput(e.target.value) }} value={titleInput} id="outlined-full-width" fullWidth label="Enter Title" variant="outlined" className="text-input-deafult" />

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>


            {feedbackVariant === "success" ? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
                feedbackVariant === "warning" ? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
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
