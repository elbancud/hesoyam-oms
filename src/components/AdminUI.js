import React, {useState, useEffect} from 'react'
import "../style/style.css";
import DashboardIcon from '@material-ui/icons/Dashboard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MicIcon from '@material-ui/icons/Mic';
import BugReportIcon from '@material-ui/icons/BugReport';
import firebase from '../firebase';
import FaceIcon from '@material-ui/icons/Face';
import AdminAccountManagement from './AdminAccountManagement';
import Dashboard from './Dashboard';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Themes from './Themes';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import PageviewIcon from '@material-ui/icons/Pageview';
import PagesTab from './PagesTab';
import Calendar from './CalendarTab';
import LivestreamTab from './LivestreamTab';
import ReportBug from './ReportBug';
import Service from './Service';
import "animate.css"
import Announcement from './Announcement';
import { useAuth } from '../context/AuthContext';
import Podcast from './Podcast';
import SeatArragement from './SeatArrangement';
import DonateAdmin from './DonateAdmin';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AdminAppointCancel from './AdminAppointCancel';
import Zoom from '@mui/material/Zoom';

export default function AdminUI() {
    const [accountTab, setAccountTab] = useState(false);
    const [dashboardTab, setDashboardTab] = useState(true);
    const [theme, setTheme] = useState(false);
    const [webpagesTab, setWebpagesTab] = useState(false);
    
    const [servicesTab, setServicesTab] = useState(false);
    const [calendarTab, setCalendarTab] = useState(false);
    const [seatsTab, setSeatsTab] = useState(false);
    const [announcementTab, setAnnouncementTab] = useState(false);
    const [livestreamTab, setLiveStreamTab] = useState(false);
    const [podcastsTab, setPodcastsTab] = useState(false);
    const [reportsTab, setReportsTab] = useState(false);
    const [donateTab, setDonateTab] = useState(false);
    const [notification, setNotification] = useState(false);

    const [user, setUser] = useState(null);
    const [userName, setUsername] = useState("");
    const { currentUser } = useAuth();
    const [notifCount, setNotifCount] = useState(0)

    useEffect(() => {
        const dbUser = firebase.database().ref("overallEvents");
        let count = 0;
        dbUser.once('value').then((snapshot) => {
            snapshot.forEach(snap => {
                if(snap.hasChild("reason")) {
                    count++;
                    setNotifCount(parseInt(count));
                }
            }

            )
        })
    }, [])

    const [state, setState] = React.useState({
        left: false,
      
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className=" primary-color"
        >
        <div className=" primary-color full-height-percent">
                    
                    <aside className=" primary-color" >
                        <div className="">
                            <ul className="">
                                <li className="flex-default pad-x-sm" id={accountTab ? "active" : ""} onClick={() => { activateTab("accountTab", setAccountTab) }}>
                                    <div className="icon-padding">
                                        <FaceIcon className="cursor-pointer icon-set-light" />
                                    </div>
                                    
                                </li>
                            </ul>
                        </div>
                        
                        <div className="grid-place-center ">
                            <ul className="animate__animated animate__bounceIn">
                                    <li className="flex-default pad-x-sm" id={dashboardTab ? "active" : ""} onClick={() => { activateTab("dashboardTab", setDashboardTab) }}>
                                        <div className="icon-padding">
                                                <DashboardIcon className="cursor-pointer icon-set-light"/>

                                        </div>
                                        <div className="pad-x-sm light-fonts ">
                                            <p className="m-b-sm  "><b>Dashboard</b></p>
                                        </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={notification ? "active" : ""} onClick={() => { activateTab("notification", setNotification) }}>
                                        <div className="icon-padding">
                                                <Badge badgeContent={parseInt(notifCount)} color="primary">
                                                    <NotificationsIcon color="action" />
                                                </Badge>

                                        </div>
                                        <div className="pad-x-sm light-fonts ">
                                            <p className="m-b-sm  "><b>Notifications</b></p>
                                        </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={webpagesTab ? "active" : ""} onClick={() => { activateTab("webpagesTab", setWebpagesTab) }}>
                                    <div className="icon-padding">
                                        <FormatPaintIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Themes</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={theme ? "active" : ""} onClick={() => { activateTab("theme", setWebpagesTab) }}>
                                    <div className="icon-padding">
                                        <PageviewIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Pages</b></p>
                                    </div>
                                </li>
                                
                                <li className="flex-default pad-x-sm" id={servicesTab ? "active" : ""} onClick={() => { activateTab("servicesTab", setServicesTab) }}>
                                    <div className="icon-padding">
                                        <FavoriteIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Services</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm pad-x-sm" id={calendarTab ? "active" : ""} onClick={() => { activateTab("calendarTab", setCalendarTab) }}>
                                    <div className="icon-padding">
                                        <EventAvailableIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Calendar</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={seatsTab ? "active" : ""} onClick={() => { activateTab("seatsTab", setSeatsTab) }}>
                                    <div className="icon-padding">
                                        <AirlineSeatReclineNormalIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Seats</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={announcementTab ? "active" : ""} onClick={() => { activateTab("announcementTab", setAnnouncementTab) }}>
                                    <div className="icon-padding">
                                        <AnnouncementIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Announcements</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={livestreamTab ? "active" : ""} onClick={() => { activateTab("liveStreamTab", setLiveStreamTab) }}>
                                    <div className="icon-padding">
                                        <LiveTvIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Livestream</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={podcastsTab ? "active" : ""} onClick={() => { activateTab("podcastsTab", setPodcastsTab) }}>
                                    <div className="icon-padding">
                                        <MicIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Podcast</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={reportsTab ? "active" : ""} onClick={() => { activateTab("reportsTab", setReportsTab) }}>
                                    <div className="icon-padding">
                                        <BugReportIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Report</b></p>
                                    </div>
                                </li>
                                <li className="flex-default pad-x-sm" id={donateTab ? "active" : ""} onClick={() => { activateTab("donateTab", setDonateTab) }}>
                                    <div className="icon-padding">
                                        <AccountBalanceWalletIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts ">
                                        <p className="m-b-sm"><b>Donations</b></p>
                                    </div>
                                </li>
                            </ul>
                        
                        </div>
                        <div >
                            <ul className="">
                                <li className="pad-x-sm" >
                                    <div className="icon-padding">
                                        <ArrowForwardIosIcon className="cursor-pointer icon-set-light" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    </div>
      
        </Box>
    );
    function activateTab(tabName,setTabname) {
        if (tabName === "accountTab") {
            setAccountTab(true);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);

            const dbRef = firebase.database().ref("account-details");
            dbRef.on('value', snapshot => {
                snapshot.forEach(snap => {
                    if (currentUser === snap.val().email) {
                                setUser(snap.val().email);
                                setUsername(snap.val().username);
                                }
                    });
                })
        } 
        else if (tabName === "dashboardTab") {
            setAccountTab(false);
            setDashboardTab(true);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);

        } else if (tabName === "theme") {
            setAccountTab(false);
            setDashboardTab(false);
            setTheme(true);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setDonateTab(false);
            setNotification(false);


        }else if (tabName === "webpagesTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(true);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);


        }else if (tabName === "servicesTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(true);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);


        }else if (tabName === "calendarTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(true);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);


        }else if (tabName === "seatsTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(true);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);


        }else if (tabName === "announcementTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(true);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);


        }else if (tabName === "liveStreamTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(true);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);


        }else if (tabName === "podcastsTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(true);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(false);


        } else if(tabName === "reportsTab"){
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(true);
            setTheme(false);
            setDonateTab(false);

        } else if (tabName === "donateTab") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(true);
            setNotification(false);

        }
        else if (tabName === "notification") {
            setAccountTab(false);
            setDashboardTab(false);
            setWebpagesTab(false);
            setServicesTab(false);
            setCalendarTab(false);
            setSeatsTab(false);
            setAnnouncementTab(false);
            setLiveStreamTab(false);
            setPodcastsTab(false);
            setReportsTab(false);
            setTheme(false);
            setDonateTab(false);
            setNotification(true);
        }
    }
    return (
      
        <div className="flex-default-align-default ">
            <div className="position-relative">
                <header>
                <nav>
                
                <div className="burger-nav-admin">
                
                <div className=" primary-color full-height-percent">
                    
                    <aside className=" primary-color" >
                        <div className="">
                            <ul className="">
                                <li className="flex-default pad-x-sm" id={accountTab ? "active" : ""} onClick={() => { activateTab("accountTab", setAccountTab) }}>
                                    <div className="icon-padding">
                                        <FaceIcon className="cursor-pointer icon-set-light" />
                                    </div>
                                    
                                </li>
                            </ul>
                        </div>
                        
                        <div className="grid-place-center ">
                            <ul className="animate__animated animate__bounceIn">
                                <Tooltip title="Dashboard" placement="right-start" TransitionComponent={Zoom}>
                                
                                <li className="flex-default pad-x-sm" id={dashboardTab ? "active" : ""} onClick={() => { activateTab("dashboardTab", setDashboardTab) }}>
                                    <div className="icon-padding">
                                        <DashboardIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                    <div className="pad-x-sm light-fonts aside-labels">
                                        <p className="m-b-sm  "><b>Dashboard</b></p>
                                    </div>
                                </li>
                                </Tooltip>
                                <Tooltip title="Notifications" placement="right-start" TransitionComponent={Zoom}>
                                
                                <li className="flex-default pad-x-sm" id={notification ? "active" : ""} onClick={() => { activateTab("notification", setNotification) }}>
                                        <div className="icon-padding">
                                                <Badge badgeContent={parseInt(notifCount)} color="primary">
                                                    <NotificationsIcon color="action" />
                                                </Badge>

                                        </div>
                                       
                                </li>
                                </Tooltip>

                                <Tooltip title="Themes" placement="right-start" TransitionComponent={Zoom}>
                                
                                <li className="flex-default pad-x-sm" id={webpagesTab ? "active" : ""} onClick={() => { activateTab("webpagesTab", setWebpagesTab) }}>
                                    <div className="icon-padding">
                                        <FormatPaintIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts aside-labels">
                                        <p className="m-b-sm"><b>Themes</b></p>
                                    </div>
                                </li>
                                </Tooltip>
                                <Tooltip title="Pages" placement="right-start" TransitionComponent={Zoom}>
                                    <li className="flex-default pad-x-sm" id={theme ? "active" : ""} onClick={() => { activateTab("theme", setWebpagesTab) }}>
                                        <div className="icon-padding">
                                            <PageviewIcon className="cursor-pointer icon-set-light"/>
                                        </div>
                                        <div className="pad-x-sm light-fonts aside-labels">
                                            <p className="m-b-sm"><b>Pages</b></p>
                                        </div>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Services" placement="right-start" TransitionComponent={Zoom}>
                                
                                <li className="flex-default pad-x-sm" id={servicesTab ? "active" : ""} onClick={() => { activateTab("servicesTab", setServicesTab) }}>
                                    <div className="icon-padding">
                                        <FavoriteIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts aside-labels">
                                        <p className="m-b-sm"><b>Services</b></p>
                                    </div>
                                </li>
                                </Tooltip>
                                <Tooltip title="Calendar" placement="right-start" TransitionComponent={Zoom}>

                                <li className="flex-default pad-x-sm pad-x-sm" id={calendarTab ? "active" : ""} onClick={() => { activateTab("calendarTab", setCalendarTab) }}>
                                    <div className="icon-padding">
                                        <EventAvailableIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts aside-labels">
                                        <p className="m-b-sm"><b>Calendar</b></p>
                                    </div>
                                </li>
                                </Tooltip>
                                <Tooltip title="Seats" placement="right-start" TransitionComponent={Zoom}>

                                <li className="flex-default pad-x-sm" id={seatsTab ? "active" : ""} onClick={() => { activateTab("seatsTab", setSeatsTab) }}>
                                    <div className="icon-padding">
                                        <AirlineSeatReclineNormalIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts aside-labels">
                                        <p className="m-b-sm"><b>Seats</b></p>
                                    </div>
                                </li>
                                </Tooltip>

                                <Tooltip title="Announcements" placement="right-start" TransitionComponent={Zoom}>
                                <li className="flex-default pad-x-sm" id={announcementTab ? "active" : ""} onClick={() => { activateTab("announcementTab", setAnnouncementTab) }}>
                                    <div className="icon-padding">
                                        <AnnouncementIcon className="cursor-pointer icon-set-light"/>
                                    </div>
                                     <div className="pad-x-sm light-fonts aside-labels">
                                        <p className="m-b-sm"><b>Announcements</b></p>
                                    </div>
                                </li>
                                </Tooltip>

                                <Tooltip title="Livestream" placement="right-start" TransitionComponent={Zoom}>
                                    <li className="flex-default pad-x-sm" id={livestreamTab ? "active" : ""} onClick={() => { activateTab("liveStreamTab", setLiveStreamTab) }}>
                                        <div className="icon-padding">
                                            <LiveTvIcon className="cursor-pointer icon-set-light"/>
                                        </div>
                                        <div className="pad-x-sm light-fonts aside-labels">
                                            <p className="m-b-sm"><b>Livestream</b></p>
                                        </div>
                                    </li>
                                </Tooltip>

                                <Tooltip title="Podcast" placement="right-start" TransitionComponent={Zoom}>
                                    <li className="flex-default pad-x-sm" id={podcastsTab ? "active" : ""} onClick={() => { activateTab("podcastsTab", setPodcastsTab) }}>
                                        <div className="icon-padding">
                                            <MicIcon className="cursor-pointer icon-set-light"/>
                                        </div>
                                        <div className="pad-x-sm light-fonts aside-labels">
                                            <p className="m-b-sm"><b>Podcast</b></p>
                                        </div>
                                    </li>
                                </Tooltip>

                                <Tooltip title="Report" placement="right-start" TransitionComponent={Zoom}>
                                    <li className="flex-default pad-x-sm" id={reportsTab ? "active" : ""} onClick={() => { activateTab("reportsTab", setReportsTab) }}>
                                        <div className="icon-padding">
                                            <BugReportIcon className="cursor-pointer icon-set-light"/>
                                        </div>
                                        <div className="pad-x-sm light-fonts aside-labels">
                                            <p className="m-b-sm"><b>Report</b></p>
                                        </div>
                                    </li>
                                </Tooltip>

                                <Tooltip title="Donations" placement="right-start" TransitionComponent={Zoom}>
                                    <li className="flex-default pad-x-sm" id={donateTab ? "active" : ""} onClick={() => { activateTab("donateTab", setDonateTab) }}>
                                        <div className="icon-padding">
                                            <AccountBalanceWalletIcon className="cursor-pointer icon-set-light"/>
                                        </div>
                                        <div className="pad-x-sm light-fonts aside-labels">
                                            <p className="m-b-sm"><b>Donations</b></p>
                                        </div>
                                    </li>
                                </Tooltip>

                            </ul>
                        
                        </div>
                        <div >
                            <ul className="">
                                <li className="pad-x-sm" >
                                    <div className="icon-padding">
                                        <ArrowForwardIosIcon className="cursor-pointer icon-set-light" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    </div>
                    
                    
                </div>
                  
            </nav>
        </header>
            
            </div>
                <div className="full-width margin-left-responsive">
                    <header>
                            <nav>
                                <div className="pad-xy-sm">
                            
                                <div className="burger-nav">
                                    <div>
                                    {['left'].map((anchor) => (
                                        <React.Fragment key={anchor}>
                                        <Button onClick={toggleDrawer(anchor, true)}>
                                            <MenuIcon />
                                        </Button>
                                        <SwipeableDrawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                            onClose={toggleDrawer(anchor, false)}
                                            onOpen={toggleDrawer(anchor, true)}
                                        >
                                            {list(anchor)}
                                        </SwipeableDrawer>
                                        </React.Fragment>
                                    ))}
                                    </div>
                                    
                                </div>
                            
                            </div>   
                        </nav>
                    </header>
                    <main className="display-none" id={dashboardTab ? "display-block" : ""}>
                        <Dashboard/>
                    </main>
                    <main className="display-none" id={notification ? "display-block" : ""}>
                        <AdminAppointCancel/>
                    </main>
                    <main className="display-none" id={accountTab? "display-block":""}>
                        <AdminAccountManagement username={userName} email={user} />
                    </main>
                    <main className="display-none" id={webpagesTab? "display-block":""}>
                        <Themes/>
                    </main>
                    <main className="display-none" id={theme? "display-block":""}>
                        <PagesTab/>
                    </main>
                    <main className="display-none" id={calendarTab? "display-block":""}>
                        <Calendar/>
                    </main>
                    <main className="display-none" id={livestreamTab? "display-block":""}>
                        <LivestreamTab/>
                    </main>
                     <main className="display-none" id={servicesTab? "display-block":""}>
                        <Service/>
                    </main>
                    <main className="display-none" id={reportsTab? "display-block":""}>
                        <ReportBug/>
                    </main>
                    <main className="display-none" id={announcementTab? "display-block":""}>
                        <Announcement/>
                    </main>
                    <main className="display-none" id={podcastsTab? "display-block":""}>
                        <Podcast/>
                    </main>
                    <main className="display-none" id={seatsTab? "display-block":""}>
                        <SeatArragement/>
                </main>
                <main className="display-none" id={donateTab? "display-block":""}>
                        <DonateAdmin/>
                    </main>
            </div>
        </div>
    )
}

