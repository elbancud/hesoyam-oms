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
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import "react-datepicker/dist/react-datepicker.css";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DatePicker from '@mui/lab/DatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import axios from 'axios'
// import DatePicker from "react-datepicker";

function AppointmentPage({ service, image }) {
    const [siteTitle, setSiteTitle] = useState("");
    
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
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
    const [timeChosen, setTimeChosen] = React.useState(new Date('2014-08-18T21:11:54'));

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
            setSessionInterval(snapshot.val().sessionInterval)
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
    const locales = {
    "en-US": require("date-fns/locale/en-US"),
    };
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });
    async function handleAppoint() {
        // const date = new Date().getDate() + parseInt(appointPeriod, 10)
        // if (dateChosen.getDate() > date) {
        //     alert("success")
        // } else {
        //     alert("fail")
        // }
     
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "frame_name": "no-frame",
        //         "qr_code_text": "https://www.qr-code-generator.com/",
        //         "image_format": "SVG",
        //         "background_color": "#ffffff",
        //         "foreground_color": "#fa6e79",
        //         "marker_right_inner_color": "#2d7cda",
        //         "marker_right_outer_color": "#00bfff",
        //         "marker_left_template": "version13",
        //         "marker_right_template": "version13",
        //         "marker_bottom_template": "version13"
        //     })
        // }
        
        fetch('https://api.qr-code-generator.com/v1/create?access-token=bwC3u0_82C_0iyAU5AR6MJFzNVAm2LiTRUahRITyi9O_0H2cbTOfCcZJp1H7vNR5', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "frame_name": "no-frame",
                        "qr_code_text": "https://www.qr-code-generator.com/",
                        "image_format": "SVG",
                        "background_color": "#ffffff",
                        "foreground_color": "#fa6e79",
                        "marker_right_inner_color": "#2d7cda",
                        "marker_right_outer_color": "#00bfff",
                        "marker_left_template": "version13",
                        "marker_right_template": "version13",
                        "marker_bottom_template": "version13"
                    })
            })
            .then(res => {
                return res.json()
            }).then(data => console.log(data)).catch(error => console.log(error))
                // .then(data => console.log(data));
          
    }
        
    
    const events = [
        {
            title: "Big Meeting",
            allDay: true,
            start: new Date(2021, 9, 0),
            end: new Date(2021, 9, 0),
        },
        {
            title: "Vacation",
            start: new Date(2021, 9, 7),
            end: new Date(2021, 9, 10),
        },
        {
            title: "Conference",
            start: new Date(2021, 9, 20),
            end: new Date(2021, 9, 23),
        },
    ];
   
    function toDay(num) {
        switch (num) {
            case 0:
                return "Sunday"
                break;
            case 1:
                return "Monday"
                break;
            case 2:
                return "Tuesday"
                break;
            case 3:
                return "Wednesday"
                break;
            case 4:
                return "Thursday"
                break;
            case 5:
                return "Friday"
                break;
            case 6:
                return "Saturday"
                break;
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
                                           
                                            renderInput={(params) => <TextField variant="outlined" {...params} />}
                                            />

                                </div>
                                <div className="m-r-sm">
                                    <TimePicker
                                                label="Time"
                                                value={timeChosen}
                                                shouldDisableTime={(timeValue, clockType) => {
                                                if (clockType === 'hours' && timeValue < parseInt(operationTimeStart,10)) {
                                                return true;
                                                }

                                                return false;
                                            }}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField variant="outlined" {...params} />}
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
                <Container className="m-t-md ">
                    <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, width:"100%"}} />

                </Container>

            </main>
            <main className="pad-y-md">
                
            </main>
            
        </div>

    )
}

export default AppointmentPage
