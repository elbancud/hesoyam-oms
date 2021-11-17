import React, { useEffect, useState,useRef}from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import UserProfile from './UserProfile';
import { Button } from "@material-ui/core";
import TopNavGenWeb from './TopNavGenWeb'
import CheckIcon from '@mui/icons-material/Check';
import "react-big-calendar/lib/css/react-big-calendar.css";
import getDay from "date-fns/getDay";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DynamicCalendar from "./DynamicCalendar"
import Chip from '@mui/material/Chip';
// import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// import { TimePicker } from '@mui/lab';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import Tooltip from '@mui/material/Tooltip';
import NextPlanIcon from '@mui/icons-material/NextPlan';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';


function AppointmentPage({ service, image }) {
    const seatRow = ['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    const [open, setOpen] = useState(false);

    const [seatArray, setSeatArray] = useState();
    const seatRef = useRef(null)
    const qrRef = useRef(null)

    const [siteTitle, setSiteTitle] = useState("");
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false);
    const [serviceArray, setServiceArray] = useState()
    const [dateChosen, setDateChosen] = React.useState();
    const [maxCapacity, setMaxCapacity] = useState("");
    const [appointPeriod, setAppointPeriod] = useState("");
    const [cancelPeriod, setCancelPeriod] = useState("");

    const [operationDayStart, setOperationDayStart] = useState("");
    const [operationDayEnd, setOperationDayEnd] = useState("");
    const [operationTimeEnd, setOperationTimeEnd] = useState("");
    const [operationTimeStart, setOperationTimeStart] = useState("");
    const [sessionInterval, setSessionInterval] = useState("");
    const [sessionIntervalState, setSessionIntervalState] = useState("");

    const [timeChosen, setTimeChosen] = useState();

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [qrLink, setQrLink] = useState("");
    const [seatState, setSeatState] = useState();
    const [update, setUpdate] = useState(false)

    const [dbSeat, setDbSeat] = useState("");
    const [group, setGroup] = useState("");
    const [rowSeat, setRowSeat] = useState("");
    const [colSeat, setColSeat] = useState("")
    const [beforeAppoint, setBeforeAppoint] = useState("")
    const [appointmentObj, setAppointmentObj] = useState()
    const handleClose = () => {
        setOpen(false);
    };

    const disableDate = (date) => {

        const day = getDay(date);
        
        if (operationDayStart === operationDayEnd) {

            return false

        } else if (day >= parseInt(operationDayStart, 10) && day <= parseInt(operationDayEnd, 10)) {
            
            return false;
        }
            
        else {

            return true;
        }
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
    function handleTimeChange(time) {
        let timeDif = sessionIntervalState === "hours" ? parseInt(sessionInterval, 10) * 60 : parseInt(sessionInterval, 10)
        if (new Date(time).getMinutes() % parseInt(timeDif,10) === 0) {
            if (dateChosen) {
    
                const dbEvents = firebase.database().ref("events")
                const fTime = time.getHours() + ":" + time.getMinutes()   
                
                dbEvents.orderByChild("sessionTime").equalTo(fTime).once("value").then((snap) => {
                    if (!snap.exists()) {
                        const dbSeat = firebase.database().ref("seat-arrangement")
                        const dbRef = firebase.database().ref("services/" + cookies.activeService);
                        dbRef.once('value', snapshot => {
                            if (snapshot.val().seatArrangement === true) {
                                    const dateSpecific = dateChosen.getFullYear() + ", " + parseInt(dateChosen.getMonth() + 1, 10) + ", " + dateChosen.getDate()
                                    const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + "/appointments");
                                    const dbMaxcap = firebase.database().ref("events")
                                    const fTime = time.getHours() + ":" + time.getMinutes()   
                                    let dbPushUser = "services/" + cookies.activeService + "/seatManagement/" + dbSeat;
                                    let fServiceTime = cookies.activeService + ""+time.getHours() + ":" + time.getMinutes()
                                    dbSeat.once('value', snapshot => {
                                     
                                    const appointmentDetails = {
                                        sessionTime: fTime,
                                        sessionDate: dateSpecific,
                                        sessionService: cookies.activeService,
                                        sessionCapacity: parseInt(maxCapacity, 10),
                                        seatManagement: snapshot.val(),
                                        serviceTime:fServiceTime ,

                                    }
                                        dbEvents.push(appointmentDetails)
    
                                    })
    
                                    
                            }
                        })
                    
                    } 
                })
                dbEvents.orderByChild("sessionTime").equalTo(fTime).once("value").then((snap) => {
                   let seatSpecificKey = ""
                    if (snap.exists()) {
                      seatSpecificKey = Object.keys(snap.val())[0]
                    } 
                    const dbGrp = firebase.database().ref("events/" + seatSpecificKey + "/seatManagement")
                    dbGrp.once('value').then((snapshot) => {
                        const snap = snapshot.val();
                        const seatArray = [];
                        for (let id in snap) {
                            seatArray.push({ id, ...snap[id] })
                        }
                        setSeatArray(seatArray);
    
                    })
                    
                })  
            }
        }
        setTimeChosen(time)
    }
    function reserveSeat(group, rowTitle, colSeat, parentIndex, parent, row, col) {

        const parentId = seatArray[parentIndex].id;
        const rowId = Object.keys(seatArray[parentIndex])[row]
        const db = parentId + "/" + rowId + "/" + col
        setGroup(group);
        setDbSeat(db);
        setOpen(true);
        setRowSeat(rowTitle+colSeat);
        setColSeat(colSeat);
        
    }   

    function finishAppointment() {
        handleAppoint()


    }
    useEffect(() => {
                    const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {

                                    setSiteTitle(snapshot.val().savedSiteTitle)
                            });
                       
            const dbService = firebase.database().ref("services/" + cookies.activeService);
            dbService.once("value").then(function (snapshot) {
                
                setMaxCapacity(snapshot.val().maxCapacity)
                setAppointPeriod(snapshot.val().daysBeforeAppointment)
                setOperationDayStart(snapshot.val().operationDaysStart)
                setOperationDayEnd(snapshot.val().operationDaysEnd)
                setOperationTimeStart(snapshot.val().timeOperationStart)
                setOperationTimeEnd(snapshot.val().timeOperationEnd)
                setCancelPeriod(snapshot.val().daysBeforeCancel)
                setSessionIntervalState(snapshot.val().sessionState)
                setSessionInterval(snapshot.val().sessionIntervalNum)
                setSeatState(snapshot.val().seatArrangement)
                
                const postSnap = snapshot.val();
                const serviceArray = [];

                for (let id in postSnap) {

                    serviceArray.push({id, ...postSnap[id]});
                }

                setServiceArray(serviceArray)
                // let beforeAppointDay = new Date()
                // alert(beforeAppointDay)
        });
   
        // new Date("Sat Oct 23 2021 " + operationTimeEnd +":00 GMT+0800 (Philippine Standard Time)")
        // const fOdd =  "Sat Oct 23 2021 " + operationTimeStart + " GMT+0800 (Philippine Standard Time)"
        // setTimeChosen(new Date(fOdd))
        
        const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + "/appointments");
        dbUser.orderByChild("title").equalTo(cookies.activeService).once('value').then(snap => {
            if (snap.exists()) {
                // const appointmentObj = []
                const snapshot = snap.val();
              
                setAppointmentObj(snapshot);
                // Object.values(appointmentObj).map(data => {
                //     console.log(data)
                // })
            }
        })

    }, [update]);

    function post() {
        
                            const dbMaxcap = firebase.database().ref("events")
                            const fTime = timeChosen.getHours() + ":" + timeChosen.getMinutes()   
                            dbMaxcap.orderByChild("sessionTime").equalTo(fTime).once("value").then((snap) => {
                                
                                let data = cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService + " " + dateChosen + " " + timeChosen 
                                let seatStateDate =  seatState? " Group : " + group + " " + rowSeat : "" 
                                const dateSpecific = dateChosen.getFullYear() + ", " + parseInt(dateChosen.getMonth() + 1, 10) + ", " + dateChosen.getDate()
                                const generateQR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + data + " " + seatStateDate
                                const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + "/appointments");
                                
                                let seatSpecificKey = ""
                                if (snap.exists()) {
                                    seatSpecificKey = Object.keys(snap.val())[0]
                                } 
                                let dbPushUser = "events/"+seatSpecificKey+"/seatManagement/" + dbSeat
                                const dbSeatPush = firebase.database().ref("events/"+seatSpecificKey+"/seatManagement/" + dbSeat)
                                const id = uuidv4();
                                
                                const appointmentDetails = {
                                    sessionTime: fTime,
                                    sessionDate: dateSpecific,
                                    sessionService: cookies.activeService,
                                    sessionCapacity: parseInt(maxCapacity, 10) - 1,
                                    serviceTime: cookies.activeService + ""+timeChosen.getHours() + ":" + timeChosen.getMinutes()   ,
                                    sessionDetails: {
                                                title: cookies.activeService,
                                                start: dateSpecific,
                                                end: dateSpecific,
                                                time: timeChosen.toString(),
                                                qrLink: generateQR,
                                                groupCol: seatState ? group : 0,
                                                seatRow: seatState ? rowSeat: 0,
                                                seatColumn: seatState ? colSeat : 0,
                                                seatDb: seatState ? dbPushUser : "",
                                                user: cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService,
                                                key: cookies.UserLoginKey,
                                                appointmendId: id
                                               
                                    }
                                }
                
                                //push in general event
                                const appointmentDetailsUser = {
                                    title: cookies.activeService,
                                    start: dateSpecific,
                                    end: dateSpecific,
                                    time: timeChosen.toString(),
                                    qrLink: generateQR,
                                    groupCol: seatState ? group : 0,
                                    seatRow: seatState ? rowSeat: 0,
                                    seatColumn: seatState ? colSeat : 0,
                                    seatDb: seatState ? dbPushUser : "",
                                    user: cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService,
                                    key: cookies.UserLoginKey,
                                    appointmendId: id

                                }
                                            
                                dbUser.push(appointmentDetailsUser);
                                //push in user account
                                const dbEventOutside = firebase.database().ref("overallEvents");
                                dbEventOutside.push(appointmentDetailsUser)
                                
                                // dbSeatPush.update({reserved:true})
                                
                                dbMaxcap.push(appointmentDetails).then(() => {
                                    setAlertStatus(true)
                                    setFeedbackVariant("success")
                                    setAlertMessage("Service date appointed")
                                    setQrLink()
                                    window.location.reload()
                                    window.scrollTo(0, seatRef.current.offsetTop)
                                })
                        })
                                    
    }
    function appointmentStatus() {

        const dbMaxcap = firebase.database().ref("events")
        const fTime = timeChosen.getHours() + ":" + timeChosen.getMinutes()
        const dateSpecific = dateChosen.getFullYear() + ", " + parseInt(dateChosen.getMonth() + 1, 10) + ", " + dateChosen.getDate()
        
        dbMaxcap.orderByChild("serviceTime").equalTo(cookies.activeService+""+fTime).once("value").then((snap) => {
            
            if (snap.exists()) {
                
                const snapshot = snap.val()
                const data = []
                let currentId = ""
                let dbCurrentCapacity = 0
                let dbCurrentDate = ""
                //store id
                for (let id in snapshot) {
       
                    data.push({ id, ...snapshot[id] })
                }
                
                data.map(data => {
                    dbCurrentDate = data.sessionDate;
                    currentId = data.id;
                    dbCurrentCapacity = parseInt(data.sessionCapacity)
                })
                if (dbCurrentDate === dateSpecific) {
                      //test if capacity  have rooms
                    if (parseInt(maxCapacity, 10) === 0) {
                            
                        setAlertStatus(true)
                        setFeedbackVariant("error")
                        setAlertMessage("Date is already booked with maximum capacity. Please try another date or time")
        
                    } else {
                        if (dbCurrentCapacity <= parseInt(maxCapacity, 10) ) {
                                     const dbMaxcap = firebase.database().ref("events")
                                    dbMaxcap.orderByChild("serviceTime").equalTo(cookies.activeService+""+fTime).once("value").then((snap) => {


                                    let data = cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService + " " + dateChosen + " " + timeChosen 

                                    let seatStateDate =  seatState? " Group Column: " + group + " " + rowSeat : "" 
                                    const generateQR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + data + " " + seatStateDate

                                    const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + "/appointments");
                                    const dbSpecified = firebase.database().ref('events/' + currentId)
                                          
                                    let seatSpecificKey = ""
                                    if (snap.exists()) {
                                        seatSpecificKey = Object.keys(snap.val())[0]
                                    } 
                                   let dbPushUser = "events/"+seatSpecificKey+"/seatManagement/" + dbSeat
                                    const dbSeatPush = firebase.database().ref("events/"+seatSpecificKey+"/seatManagement/" + dbSeat)
                                    //push in general event
                                const id = uuidv4();
                                
                                    const appointmentDetailsUser = {
                                        title: cookies.activeService,
                                        start: dateSpecific,
                                        end: dateSpecific,
                                        time: timeChosen.toString(),
                                        qrLink: generateQR,
                                        groupCol: seatState ? group : 0,
                                        seatRow: seatState ? rowSeat: 0,
                                        seatColumn: seatState ? colSeat : 0,
                                        seatDb: seatState ? dbPushUser : "",
                                        user: cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService,
                                        key: cookies.UserLoginKey,
                                        appointmendId: id

                                        
                                    }
                                                
                                    dbUser.push(appointmentDetailsUser);
                    
                                    //push in user account
                                    dbSpecified.push(appointmentDetailsUser)
                                    
                                    // dbSeatPush.update({reserved:true})
                                    
                                    const dbEventOutside = firebase.database().ref("overallEvents");
                                    dbEventOutside.push(appointmentDetailsUser)
                                    
                                    dbSpecified.update({sessionCapacity:parseInt(dbCurrentCapacity, 10) - 1}).then(() => {
                                        setAlertStatus(true)
                                        setFeedbackVariant("success")
                                        setAlertMessage("Service date appointed")
                                        window.location.reload()
                                        window.scrollTo(0, seatRef.current.offsetTop)

                                    })
                            })
                        } else {

                            setAlertStatus(true)
                            setFeedbackVariant("error")
                            setAlertMessage("Date is already booked with maximum capacity. Please try another date or time" )
                        }
                    }
                    
                } else {
                    //not same check time and capacity 
                    dbMaxcap.orderByChild("serviceTime").equalTo(cookies.activeService+""+fTime).once("value").then((snap) => {

                        if (snap.exists()) {
                            if (parseInt(maxCapacity, 10) === 0) {
                                
                                setAlertStatus(true)
                                setFeedbackVariant("error")
                                setAlertMessage("Date is already booked with maximum capacity. Please try another date or time" )
                
                            } else {
                                if (dbCurrentCapacity <= parseInt(maxCapacity, 10) ) {
                                            let data = cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService + " " + dateChosen + " " + timeChosen 
  
                                            let seatStateDate =  seatState? " Group : " + group + " " + rowSeat : "" 
                                            const generateQR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + data + " " + seatStateDate

                                            const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + "/appointments");
                                            const dbSpecified = firebase.database().ref('events/' + currentId)      
                                            let dbPushUser = "services/" + cookies.activeService + "/seatManagement/" + dbSeat;
                                            const id = uuidv4();
                                            
                                            //push in general event
                                            const appointmentDetailsUser = {
                                                title: cookies.activeService,
                                                start: dateSpecific,
                                                end: dateSpecific,
                                                time: timeChosen.toString(),
                                                qrLink: generateQR,
                                                groupCol: seatState ? group : 0,
                                                seatRow: seatState ? rowSeat: 0,
                                                seatColumn: seatState ? colSeat : 0,
                                                seatDb: seatState ? dbPushUser : "",
                                                user: cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService,
                                                key: cookies.UserLoginKey,
                                                appoinmentId: id
                                                
                                            }
                                                        
                                            dbUser.push(appointmentDetailsUser);
                                            
                                            const dbSeatPush = firebase.database().ref("services/" + cookies.activeService + "/seatManagement/" + dbSeat)
                                            const dbEventOutside = firebase.database().ref("overallEvents");
                                            dbEventOutside.push(appointmentDetailsUser)
                                            
                                            // dbSeatPush.update({reserved:true})
                                            
                                            //push in user account
                                            dbSpecified.push(appointmentDetailsUser)
                                                
                                            dbSpecified.update({sessionCapacity:parseInt(dbCurrentCapacity, 10) - 1}).then(() => {
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("Service date appointed")
                                                window.location.reload()
                                                window.scrollTo(0, seatRef.current.offsetTop)

                                            })
                                    
                                } else {
                                    setAlertStatus(true)
                                    setFeedbackVariant("error")
                                    setAlertMessage("Date is already booked with maximum capacity. Please try another date or time" )
                                }
                            }
                            } else {
                                post()
                            }

                    })
                }

              
       
            } else {
                post()
                
            }
        })
                    //evaluate if user already have active appointment
                                
               
                              
     }

        
    function updateMaxCap() {
        if (parseInt(maxCapacity, 10) === 1) {

        } else {

                const dbMaxcap = firebase.database().ref("events")
                // const fTime = timeChosen.getHours() + ":" + timeChosen.getMinutes()
                
                const dateSpecific = dateChosen.getFullYear() + ", " + parseInt(dateChosen.getMonth() + 1, 10) + ", " + dateChosen.getDate()
                
                dbMaxcap.orderByChild("sessionDate").equalTo(dateSpecific).once("value").then((snap) => { 
                          if(snap.exists()) {
                                const snapshot = snap.val()
                                const data = []
                                let dbCurrentCapacity = 0
                                //store id
                                for (let id in snapshot) {
                    
                                    data.push({ id, ...snapshot[id] })
                                }
                                
                                data.map(data => {
                                    dbCurrentCapacity = parseInt(data.sessionCapacity)
                                })
                                setMaxCapacity(dbCurrentCapacity);
                          } else {
                            }
                        })
                        
        }
     
    }
    function handleAppoint() {
        
        //know if there's  active appointment in the service
        //know if date and time is selected
        const fDate = new Date().getDate() + parseInt(appointPeriod, 10)
        let fMonth = 0;
        let dateCons = 0
             
        if (parseInt(fDate, 10) > 30) {

            dateCons = (new Date().getDate() + parseInt(appointPeriod, 10)) - 30
            fMonth = new Date().getMonth() + 1;
                
        } else {
                
            fMonth = new Date().getMonth() + 1
            dateCons = fDate 

        }
        if (!timeChosen || !dateChosen) {
            
            setAlertStatus(true)
            setFeedbackVariant("error")
            setAlertMessage("Please choose time")
            
        }
        else {
            //if selected know if time being selected still have capacity 
            //know if appointing base on days count before appointment
            if (dateChosen.getMonth() + 1 <= fMonth) {

                if (dateChosen.getDate() <= dateCons && dateChosen.getFullYear() === new Date().getFullYear()) {

                    setAlertStatus(true)
                    setFeedbackVariant("error")
                    setAlertMessage("You should be appointing from " + (fMonth ) + " " + dateCons + " onwards")

                } else {

                    if (dateChosen.getMonth() + 1 <= fMonth && dateChosen.getFullYear() === new Date().getFullYear()) {

                        setAlertStatus(true)
                        setFeedbackVariant("error")
                        alert(dateChosen.getMonth() + 1 + " " + fMonth)
                        setAlertMessage("You should be appointing from " + (fMonth) + " " + dateCons + " onwards" + "583")

                    } else {
                        const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + "/appointments");
                                            
                        dbUser.orderByChild("title").equalTo(cookies.activeService).once('value').then(snap => {
                            if (snap.exists()) {
                                if (snap.exists()) {
                                
                                    setAlertStatus(true)
                                    setFeedbackVariant("error")
                                    setAlertMessage("You already have an active appointment in this service")     
                                    } else {
                                        appointmentStatus()
                                    }
                                            
                            } else {
                                appointmentStatus()

                            }
                        })
                        
                    }
                }
            } else {

                if (dateChosen.getDate() <= dateCons && dateChosen.getFullYear() === new Date().getFullYear() && dateChosen.getMonth() + 1 <= fMonth) {

                    setAlertStatus(true)
                    setFeedbackVariant("error")
                    setAlertMessage("You should be appointing from " + (fMonth + 1) + " " + dateCons + " onwards")

                } else {
                    
                    if (dateChosen.getMonth() + 1 <= fMonth && dateChosen.getFullYear() === new Date().getFullYear()) {

                        setAlertStatus(true)
                        setFeedbackVariant("error")
                        setAlertMessage("You should be appointing from " + (fMonth + 1) + " " + dateCons + " onwards" )

                    } else {
                        const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + "/appointments");
                                            
                        dbUser.orderByChild("title").equalTo(cookies.activeService).once('value').then(snap => {
                            if (snap.exists()) {
                                
                                    setAlertStatus(true)
                                    setFeedbackVariant("error")
                                    setAlertMessage("You already have an active appointment in this service")     
                            } else {
                                appointmentStatus()
                            
                            }
                        })
                    }

                }
               
            }
            
        }
    }
    function toDay(num) {

        switch (num) {
            case 0:
                return "Sunday"
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
        }
    }

    function getStarted() {
        history.push("/genWebLogin")
    }

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

                    <div className="pad-xy-sm position-fixed-top-z-0 full-width height-90 gradient-geometric " id=""></div>
                        
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
                        
                        <div className="burger-nav">
                            <TopNavGenWeb></TopNavGenWeb>
                        </div>
                        
                    </nav>
                    
                    <div className="pad-y-sm flex-flow-wrap box  width-90 ">
                        
                            <div className=" pad-xy-sm">
                                <div className="pad-xy-sm  ">
                                    <h4 className="primary-color-text-custom ">Service</h4>
                                    <div className="">
                                        <h2>{cookies.activeService}: Appointment</h2>
                                        
                                    </div>
                                    <div className="align-text-left text-custom-width ">
                                        <p >At this point, we assume you are arranging an appoint for {cookies.activeService}?. Below you will find the requirements you have to acquire for completion. </p>
                                    </div>
                                </div>
                            </div>

                            <div className=" pad-xy-sm flex-no-wrap ">
                                    
                                    
                                <img className=" service-img" alt = "church" src="https://images.unsplash.com/photo-1618333604761-4148e9b0f1dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80" />
                            </div>

                    </div>

                    </Container>

                </div>

            </header>

            <main id="primary-bg-color " className="pad-y-md primary-bg-color-off-white">

                <Container>

                    <div className="pad-y-sm flex-flow-wrap width-90 ">

                            <div className=" pad-xy-sm">
                                <div className="pad-xy-sm  ">
                                    <h4 className="primary-color-text-custom ">{cookies.activeService}</h4>
                                    <div className="">
                                        <h2>Requirement Completion</h2>
                                        
                                    </div>
                                    <div className="align-text-left text-custom-width ">
                                        <p>Listed here are the requirements which the service is advicing you to acquire.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className=" pad-xy-sm flex-no-wrap  box-default-width m-y-sm">
                            {serviceArray ? serviceArray.map(data => {
                                const id = uuidv4();
                                if (data.requirement) {
                                    return (
                                        // side-border-left
                                        <div className=" flex-default " key={id}>
                                            <CheckIcon className="m-b-sm success-color"/>
                                            <h3  className="pad-x-sm primary-color-text-custom ">{data.requirement}</h3>
                                        </div>
                                    )
                                    
                                }
                                return null;
                                }): ""}
                            </div>
                            
                    </div>

                </Container>

            </main>

            <main className="m-t-md">

                <div className="align-text-center">

                    <div className="pad-xy-sm  ">

                        <h4 className="primary-color-text-custom ">Calendar</h4>

                                    <div className="">
                                        <h2>Available Dates</h2>
                                    </div>
                                    
                                    <div className=" ">
                                        <p>In this section, you will now choose your preferred date. In accordance to the constraint: operation days, hours, appointment period and cancellation period.</p>
                                    </div>
                                    
                                    <div className ="m-t-sm ">
                                        <NotificationsActiveIcon className="m-r-sm" sx={{color: '#fbc02d'}}/>
                                    </div>
                                    
                                    <div>
                                        <b><p>Available slots left: {maxCapacity}</p></b>
                                    </div>
                                    
                                    <div>
                                        <b><p>Operation days: {toDay(parseInt(operationDayStart,10))} to {toDay(parseInt(operationDayEnd,10))}</p></b>
                                    </div>
                                    
                                    <div>
                                        <p>Operation hours: {parseInt(operationTimeStart,10) < 13? operationTimeStart + " AM" : operationTimeStart + " PM"  } to { parseInt(operationTimeEnd,10) < 13? operationTimeEnd + " AM" : operationTimeEnd + " PM" }</p>
                                    </div>
                                    
                                    <div>
                                        <p> Appoinment Period: {appointPeriod} Day/s before </p>
                                    </div>
                                    
                                    <div>
                                        <p> Cancellation period: {cancelPeriod} Day/s before </p>
                                    </div>
                                    
                                    <div>
                                      <p> Session intervals: {sessionInterval}  {sessionIntervalState }</p>
                                    </div>
                    </div>

                    <div className={parseInt(maxCapacity,10) === 0? "display-none" : ""}>

                    <div className="pad-xy-sm flex-flow-wrap-start-center-xy " >
                        
                        <div className="m-y-sm flex-default-center-xy">
                            
                         <LocalizationProvider dateAdapter={AdapterDateFns}> 
                                    <div className="m-r-sm">
                                   
                                        <DesktopDatePicker
                                            shouldDisableDate={disableDate}
                                            label="choose date"
                                            value={dateChosen}
                                            minDate={new Date()}
                                            onChange={(newValue) => {
                                                setDateChosen(newValue);
                                            }}
                                           format='yyyy-MM-dd'
                                            renderInput={(params) => <TextField variant="outlined" {...params} />}
                                            />

                                    </div>
                         
                                    <div className="m-r-sm">
                                                
                                        <MobileTimePicker
                                                error={false}
                                                maxTime={new Date("Sat Oct 23 2021 " + operationTimeEnd +":00 GMT+0800 (Philippine Standard Time)")}
                                                minTime={new Date("Sat Oct 23 2021 " + operationTimeStart + "00"+ "GMT+0800 (Philippine Standard Time")}
                                                label="choose time"
                                                value={timeChosen}
                                                onChange={(newValue) => {
                                                    handleTimeChange(newValue) 
                                                }}
                                                renderInput={(params) => <TextField {...params} variant="outlined"/>}
                                                minutesStep={sessionIntervalState === "hours" ? parseInt(sessionInterval, 10) * 60 : parseInt(sessionInterval, 10)}
                                            />
                                          
                                            

                                    </div>
                         </LocalizationProvider>
                        </div>
                        <div>
                            {!seatState ?
                                    
                                    <Button
                                                    onClick={handleAppoint}
                                                    id="btn-large-secondary"
                                                    variant="contained"
                                                    className="btn-large primary-color "
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Save
                                    </Button>
                               : "" 
                            }
                        </div>
                        
                        </div>
                        <div>
                            {dateChosen && timeChosen && seatState ? 
                                <Tooltip title="Next step">
                                    <Button onClick={()=> {window.scrollTo(0, seatRef.current.offsetTop)}} className=" iconBtn">
                                        <NextPlanIcon size={14} className="m-r-sm primary-color-text" />
                                        <div className="primary-color-text">
                                            Next step

                                        </div>
                                    </Button>

                                    
                            </Tooltip>: "Please choose date and time"
                            }
                        </div>
                    </div>
                    
                </div>
                <Container className="m-t-md align-text-center">
                     <div className="title ">
                            <h2>Calendar</h2>
                            <p>Shown in here are the appointed services within the day.</p>
                        </div>
                    <DynamicCalendar/>
                </Container>
                {seatState ? <Container className="m-t-md ">
                    <div className="title pad-y-sm align-text-center" ref={seatRef}>
                            <h2>Seating arrangement</h2>
                        <p>Shown in here are the appointed services within the day.</p>
                        
                    </div>
                    <div className="grid-place-center">
                        <h5>Legends</h5>
                        <div className="flex-default">
                            <div className="m-r-sm">
                                <Chip label="Reserved" sx={{bgcolor:"eeeeee", color:"#34344d"}}/>
                            </div>
                            <div className="m-r-sm">
                                <Chip label="Available" sx={{bgcolor:"#26a69a", color:"#fff"}}/>
                            </div>
                        </div>
                    </div>
                    <div className="pad-y-sm">
                    <div className="flex-flow-wrap-x">
                        <div className="">
                            <Tooltip title="altar">
                                    <Button variant="outlined" disabled={true} id="altar" disableElevation>
                                            Altar
                                    </Button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="flex-flow-wrap-x ">
                         {seatArray ? seatArray.map((data, parentIndex) => {
                            
                             let rowNum = 0;
                             const id = uuidv4();

                             return(
                                 <div className="m-xy-lg" key={id}>
                                     <div className="flex-flow-wrap-x">
                                         <div className="">
                                            <h5 className="primary-color-text-custom ">Group {parentIndex + 1}</h5>
                                        </div>
                                    </div>
                                   
                                    {

                                        Object.values(data).map((key, indexLvl1) => {
                                            
                                                const id1 = uuidv4();
                                                
                                                if (typeof (key) === "object") {
                                                    
                                                    return (
                                                        <div className="flex-default" key={id1}>
                                                             
                                                            
                                                            <h6>{seatRow[indexLvl1 - 1]}</h6>
                                                            {Object.values(key).map((child, index) => {

                                                                    const id2 = uuidv4();

                                                                    if (child.reserved === true) {
                                                                         return (
                                                                             <div className="seat-div" key={id2}>
                                                                                    
                                                                                    <span>
                                                                                        <Tooltip title="Click for action">
                                                                                                    <Button variant="contained"  id="reserved" disableElevation>
                                                                                                        {index + 1}
                                                                                                    </Button>
                                                                                            
                                                                                        </Tooltip>
                                                                                    </span>
                                                                                </div> 
                                                                        )
                                                                    } else {
                                                                            const id3 = uuidv4();
                                                                        
                                                                            return (
                                                                                <div className="seat-div" key = {id3}>
                                                                                    <Tooltip title="Click for action">
                                                                                        
                                                                                        <Button onClick={() => {reserveSeat(parentIndex + 1, seatRow[indexLvl1 - 1] , index + 1, parentIndex, data.id, indexLvl1, index) }} variant="contained" id="available" disableElevation>
                                                                                                    {index + 1}
                                                                                                </Button>
                                                                                    </Tooltip>
                                                                                </div> 
                                                                            )
                                                                    }
                                                                    
                                                                
                                                                })
                                                            }

                                                        </div>
                                                    )
                                                } 
                                                
                                        })
                                    }
                                    
                                </div>
                                
                            )

                            }) : "No registered rows, groups , and columns yet "}
                    </div>
                </div>
                </Container>: ""
                }
                 
            
                <Container className="m-t-md" ref={qrRef}>
                    <main className="pad-y-md flex-flow-wrap-x ">
                            <div >
                                {appointmentObj? 
                                    Object.values(appointmentObj).map((data)=> {
                                    const id1 = uuidv4();

                                        return (
                                        <div className="flex-default" key ={id1}>
                                            <div className="pad-x-sm">
                                                <img src={data.qrLink} className="imageFixedWH"></img>
                                            </div>
                                            <div>
                                                <div className="flex-default">
                                                    <h5 className="m-r-sm box-small-width">Appoinment Date: </h5>
                                                    <h4 >{data.end} </h4>

                                                </div>

                                                <div className="flex-default">
                                                    <h5 className="m-r-sm box-small-width">Appoinment Time: </h5>
                                                    <h4 >{new Date(data.time).getHours() + ":" + new Date(data.time).getMinutes()} </h4>

                                                </div>

                                                 <div className="flex-default">
                                                    <h5 className="m-r-sm box-small-width">Service: </h5>
                                                    <h4 >{data.title} </h4>

                                                </div>

                                                <div className="flex-default">
                                                    <h5 className="m-r-sm box-small-width">Seat location: </h5>
                                                    <h4 > {seatState ? "Group " + data.groupCol +" : " + data.seatRow : "N/A"} </h4>

                                                </div>
                                            </div>

                                        </div>
                                )})
                                    
                                :"No appointments yet"}
                            </div>
                    </main>
                </Container>
            </main>


               <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
            >
                
                        <DialogTitle id="alert-dialog-title">
                            {"Finish appointment?"}
                        </DialogTitle>
                        
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                 To finish the appointment please click done if you are already comfortable with this seat location
                            </DialogContentText>
                        </DialogContent>
                        
                        <DialogActions>
                            
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={finishAppointment} autoFocus>
                                Done
                            </Button>
                        </DialogActions>
            </Dialog>
             
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

    )
}

export default AppointmentPage
