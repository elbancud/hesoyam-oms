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
import CheckIcon from '@mui/icons-material/Check';
import "react-big-calendar/lib/css/react-big-calendar.css";
import getDay from "date-fns/getDay";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TimePickerComponent} from '@syncfusion/ej2-react-calendars';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DynamicCalendar from "./DynamicCalendar"
// import DatePicker from "react-datepicker";
import SeatPlan from "./SeatPlan";

function AppointmentPage({ service, image }) {
    const [siteTitle, setSiteTitle] = useState("");
    const [events, setEvents] = useState();
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false);
    const [serviceArray, setServiceArray] = useState()
    const [dateChosen, setDateChosen] = React.useState(new Date());
    const [maxCapacity, setMaxCapacity] = useState("");
    const [appointPeriod, setAppointPeriod] = useState("");
    const [cancelPeriod, setCancelPeriod] = useState("");

    const [operationDayStart, setOperationDayStart] = useState("");
    const [operationDayEnd, setOperationDayEnd] = useState("");
    const [operationTimeEnd, setOperationTimeEnd] = useState("");
    const [operationTimeStart, setOperationTimeStart] = useState("");
    const [sessionInterval, setSessionInterval] = useState("");
    const [sessionIntervalState, setSessionIntervalState] = useState("");

    const [timeChosen, setTimeChosen] = React.useState();

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [qrLink, setQrLink] = useState("");
    const [seatState, setSeatState] = useState();

    const disableDate = (date) => {
        const currentDate = new Date()
        const day = getDay(date);
       
        if (operationDayStart === operationDayEnd) {
            return false
        } else if(day >= parseInt(operationDayStart,10) && day <= parseInt(operationDayEnd, 10)){
            return false;
        } 
        else {
            return true;
            
        }
    };
    const handleChange = (newValue) => {
        setTimeChosen(newValue);
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
        });
        if(cookies.UserLoginKey) {
            setActiveCookes(true)
        }
        
    }, []);
 
     function handleAppoint() {
        // this function is to handle appointments
        
       
         const date = new Date().getDate() + parseInt(appointPeriod, 10)
        //  const db 
         if (!timeChosen) {
                setAlertStatus(true)
                setFeedbackVariant("error")
                setAlertMessage("Please choose time" )
         } else {
                if (dateChosen.getDate() > date ) {
                    const db = firebase.database().ref('events');
                    
                    db.orderByChild("time").equalTo(timeChosen.toString()).once('value').then(snapshot => {
                        if (snapshot.exists()) {
                            setAlertStatus(true)
                            setFeedbackVariant("error")
                            setAlertMessage("Date is already appointed")
                        } else {
                            const dbUser = firebase.database().ref('user-account-details/' + cookies.UserLoginKey +"/appointments");
                            dbUser.orderByChild("title").equalTo("baptism" + " " + cookies.UserLastName + " "+cookies.UserFirstName).once('value').then(snap => {
                                if (snap.exists()) {
                                    setAlertStatus(true)
                                    setFeedbackVariant("error")
                                    setAlertMessage("You already have an active appointment in this service")
                                } else {
                                    const dateSpecific = dateChosen.getFullYear() + ", " +  parseInt(dateChosen.getMonth() + 1,10)  +", "+dateChosen.getDate()
                                    const appointmentDetails = {
                                        title: "baptism" + " " + cookies.UserLastName + " "+cookies.UserFirstName,
                                        start: dateSpecific,
                                        end: dateSpecific,
                                        time:timeChosen.toString()
                                    }

                                    const generateQR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + cookies.UserLastName + cookies.UserFirstName + " " + cookies.activeService
                                    const dbQR = firebase.database().ref('user-account-details/' + cookies.UserLoginKey + '/qrLink');
                                    const dbEvents = firebase.database().ref('events');

                                    dbQR.push(generateQR);
                                    dbEvents.push(appointmentDetails);
                                    dbUser.push(appointmentDetails).then(() => {
                                                            setAlertStatus(true)
                                                            setFeedbackVariant("success")
                                                            setAlertMessage("Service date appointed")
                                                            window.location.reload()
                                            }
                                    )
                                }
                            })
                    
                            
                        }
                    })
        
                    
                } else {
                        setAlertStatus(true)
                        setFeedbackVariant("error")
                        setAlertMessage("You should be appointing from " + new Date().getMonth()+" " + date +" onwards" )
                }
         }
     }
  
    function convertTime(hours) {
        const date = new Date('01/01/2021 ' + hours).getHours()
        const specificHours = new Date('01/01/2021 ' + hours).getHours() - 12
        const specificMinutes = new Date('01/01/2021 ' + hours).getMinutes() 
        if (date < 13) {
            return new Date('01/01/2021 '+ hours +" AM")
        } else {
            return new Date('01/01/2021 '+ specificHours + ":"+specificMinutes+ " PM")
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
                        {
                            activeCookies? <div> <UserProfile/></div>:  <Button
                            onClick = {getStarted}
                            variant="outlined"
                            className="btn-large primary-color"
                            color="primary"
                            size="large"
                            id="btn-large-primary-outline-white"
                            >
                            Get Started
                            </Button>
                        }
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
                                    
                                    
                                <img className=" service-img" src="https://images.unsplash.com/photo-1618333604761-4148e9b0f1dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80" />
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
                                if (data.requirement) {
                                    return (
                                        // side-border-left
                                        <div className=" flex-default " key={data.id}>
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
                                    <div >
                                        <b><p>Available slots left: {maxCapacity}</p></b>
                                    </div>
                                    <div>
                                        <b><p>Operation days: {toDay(parseInt(operationDayStart,10))} to {toDay(parseInt(operationDayEnd,10))}</p></b>
                                    </div>
                                    <div>
                                        <p>Operation hours: {operationTimeStart} to {operationTimeEnd}</p>
                                    </div>
                                    <div>
                                        <p> Appoinment Period: {appointPeriod} Days before </p>
                                    </div>
                                    <div>
                                        <p> Cancellation period: {cancelPeriod} Days before </p>
                                    </div>
                                    <div>
                                        
                                        <p> Session intervals: {sessionInterval} </p>
                                        
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
                                     
                                    <TimePickerComponent
                                                placeholder="Choose Time"
                                                value={timeChosen}
                                                // format="HH:mm"
                                                min={convertTime(operationTimeStart)}
                                                max={convertTime(operationTimeEnd)}
                                                step={15}
                                            onChange={(e) => { setTimeChosen(e.target.value) }}
                                                // renderInput={(params) => <TextField variant="outlined" {...params} />}
                                    />
                                    
                                </div>
                         </LocalizationProvider>
                        </div>
                        <div>
                            <Button
                                            onClick={handleAppoint}
                                            // disabled={!daysBeforeCancel}
                                            id="btn-large-secondary"
                                            variant="contained"
                                            className="btn-large primary-color "
                                            color="primary"
                                            size="small"
                                        >
                                            Save
                        </Button>
                        </div>
                        
                    </div>
                    </div>
                    
                </div>
                <Container className="m-t-md align-text-center">
                     <div className="title pad-y-sm">
                            <h2>Calendar</h2>
                            <p>Shown in here are the appointed services within the day.</p>
                        </div>
                    <DynamicCalendar/>
                </Container>
                {seatState ? <Container className="m-t-md ">
                     <div className="title pad-y-sm align-text-center">
                            <h2>Calendar</h2>
                            <p>Shown in here are the appointed services within the day.</p>
                        </div>
                    <SeatPlan/>
                </Container>: ""
                }
                
            </main>
                <Container className="m-t-md ">
                <main className="pad-y-md flex-flow-wrap">
                            <div>
                                {qrLink? <img src={qrLink} alt="qr"/> : ""}
                            </div>
                    </main>
                </Container>
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

export default AppointmentPage
