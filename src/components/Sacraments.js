import React, { useEffect, useState } from 'react'
import '../style/themes.css'
import '../style/style.css'
import { Button } from "@material-ui/core";
import firebase from "../firebase"
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import TopNavGenWeb from './TopNavGenWeb'
import UserProfile from './UserProfile';
import Container from "@material-ui/core/Container";
import QuickLinks from './QuickLinks';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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


function Stuff() {

    const [siteTitle, setSiteTitle] = useState("");
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
    const [liveUrl, setLiveUrl] = useState("")
    const [profileArray, setProfileArray] = useState()

    // const [activatedPage, setActivatePage] = useState("")
    const [alertStatus, setAlertStatus] = useState(false);
    const [liturgyPage, setLiturgyPage] = useState(false);
    const [staffPage, setStaffPage] = useState(false);
    const [outReachPage, setOutreactPage] = useState(false);
    const [quickLinksPage, setQuickLinksPage] = useState(false);
    const [sacramentsPage, setSacramentsPage] = useState(false);
    const [activeDesign, setActiveDesign] = useState("")
    const [value, setValue] = React.useState(0);

    const [covidAssist, setCovidAssist] = useState("");
    const [communityMeal, setCommunityMeal] = useState("");
    const [donationDrive, setDonationDrive] = useState("");
    const [outreachFacility, setOutreachFacility] = useState("");
    const [immigrants, setImmigrants] = useState("");

    const [covidAssistImg, setCovidAssistImg] = useState("");
    const [communityMealImg, setCommunityMealImg] = useState("");
    const [donationDriveImg, setDonationDriveImg] = useState("");
    const [outreachFacilityImg, setOutreachFacilityImg] = useState("");
    const [immigrantsImg, setImmigrantsImg] = useState("");

    const [covidAssistTab, setCovidAssistTab] = useState(false);
    const [communityMealTab, setCommunityMealTab] = useState(true);
    const [donationDriveTab, setDonationDriveTab] = useState(false);
    const [outreachFacilityTab, setOutreachFacilityTab] = useState(false);
    const [immigrantsTab, setImmigrantsTab] = useState(false);

    useEffect(() => {
        const dbData = firebase.database().ref("generated-data");
        dbData.on('value', snapshot => {
            setSiteTitle(snapshot.val().savedSiteTitle)


        })

        if (cookies.UserLoginKey) {
            setActiveCookes(true)
        }

        const dbPages = firebase.database().ref("pages")
        dbPages.once("value").then((snap) => {
            setLiturgyPage(snap.val().liturgyPage)
            setStaffPage(snap.val().staffPage)
            setOutreactPage(snap.val().outReachPage)
            setQuickLinksPage(snap.val().quickLinkPage)
            setSacramentsPage(snap.val().sacramentsPage)
        })

        const dbRef = firebase.database().ref("data/reconcilation");
        dbRef.once("value").then(function (snapshot) {
            setCommunityMeal(snapshot.val().text)
            setCommunityMealImg(snapshot.val().reconciliationImage)

        });
        const dbCov = firebase.database().ref("data/confirmation");
        dbCov.once("value").then(function (snapshot) {
            setCovidAssist(snapshot.val().text)
            setCovidAssistImg(snapshot.val().confirmationImage)

        });
        const dbDrive = firebase.database().ref("data/sacramentalRecords");
        dbDrive.once("value").then(function (snapshot) {
            setDonationDrive(snapshot.val().text)
            setDonationDriveImg(snapshot.val().sacramentalRecordsImage)

        });
        const dbImig = firebase.database().ref("data/annointingSick");
        dbImig.once("value").then(function (snapshot) {
            setImmigrants(snapshot.val().text)
            setImmigrantsImg(snapshot.val().annointingSickImage)

        });
        const dbOutreach = firebase.database().ref("data/joinChurch");
        dbOutreach.once("value").then(function (snapshot) {
            setOutreachFacility(snapshot.val().text)
            setOutreachFacilityImg(snapshot.val().joinChurchImage)

        });

        const dbTheme = firebase.database().ref("themeChosen")
        dbTheme.on('value', snap => {
            setActiveDesign(snap.val().designName)
        })


    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertStatus(false);
    };
    function getStarted() {
        history.push("/genWebLogin")
    }

    function handleServiceRedirect() {
        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")

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
    function displayTab(tabName) {
        if (tabName === "covTab") {
            setCovidAssistTab(true);
            setCommunityMealTab(false);
            setDonationDriveTab(false);
            setOutreachFacilityTab(false);
            setImmigrantsTab(false);
        } else if (tabName === "comTab") {
            setCovidAssistTab(false);
            setCommunityMealTab(true);
            setDonationDriveTab(false);
            setOutreachFacilityTab(false);
            setImmigrantsTab(false);
        }else if (tabName === "donTab") {
            setCovidAssistTab(false);
            setCommunityMealTab(false);
            setDonationDriveTab(true);
            setOutreachFacilityTab(false);
            setImmigrantsTab(false);
        }else if (tabName === "imTab") {
            setCovidAssistTab(false);
            setCommunityMealTab(false);
            setDonationDriveTab(false);
            setOutreachFacilityTab(false);
            setImmigrantsTab(true);
        } else {
            setCovidAssistTab(false);
            setCommunityMealTab(false);
            setDonationDriveTab(false);
            setOutreachFacilityTab(true);
            setImmigrantsTab(false);
        }

    }
    return (
        <div >
            <header className={activeDesign === "design1" ? "design1-properties " : activeDesign === "design2 " ? "design2-properties " : "design3-properties "}>
                {/* <div className="pad-xy-sm position-fixed-top-z-1 full-width primary-bg-color height-70">
                    </div> */}
                <nav className="pad-y-sm  primary-bg-color">
                    <div className="flex-space-between nav-inside">

                        <div className="logo flex-default">
                            <div className="icon"></div>
                            <div className="app-name cursor-pointer">
                                <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" : "/design3"}>
                                    <h3 className="" id=""> {typeof (siteTitle) === 'undefined' ? "Site title" : siteTitle}</h3>
                                </Link>
                            </div>
                        </div>
                        <div className="nav-desktop-active ">
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
                                {/* <li onClick={livestream}>
                                                    Streams
                                            </li> */}
                                <li className="flex-space-between" >
                                    <QuickLinks />
                                </li>


                            </ul>
                        </div>
                        <div className="nav-desktop-active">
                            {
                                activeCookies ? <div> <UserProfile /></div> : <Button
                                    onClick={getStarted}
                                    variant="outlined"
                                    // className="btn-large primary-color"
                                    color="primary"
                                    size="small"
                                    id="btn-large-primary-outline-white"
                                >
                                    Get Started
                                </Button>
                            }

                        </div>
                        <div className="burger-nav ">
                            <div className="flex-default">
                                <div className="pad-x-sm">
                                    {
                                        activeCookies ? <UserProfile /> : ""

                                    }
                                </div>
                                <TopNavGenWeb></TopNavGenWeb>

                            </div>
                        </div>
                    </div>
                </nav>

            </header>
            <Container className="pad-y-md design3-properties-customize" >
                                            {/* <Tab className="m-r-sm" label="Community Meal" {...a11yProps(1)} />
                            <Tab className="m-r-sm" label="Covid 19 Assistance" {...a11yProps(2)} />
                            <Tab className="m-r-sm" label="Donation Drives" {...a11yProps(3)} />
                            <Tab className="m-r-sm" label="Immigrants and Refuge" {...a11yProps(3)} />
                            <Tab  className="m-r-sm"label="Outreach Facility use" {...a11yProps(3)} /> */}

            <ul className="pad-y-md flex-flow-wrap" id="font-dark">
                <a href="#recon">
                    <li className="bold pad-x-sm cursor-pointer" id={communityMealTab? "activeTab" : ""} onClick={()=> {displayTab("comTab")}}>Reconciliation</li>
                    
                </a>
                
                <a href="#confirm">
                    <li className="bold pad-x-sm cursor-pointer" id={covidAssistTab? "activeTab" : ""} onClick={()=> {displayTab("covTab")}}>Confirmation Program</li> 
                    </a>
                <a  href="#request">
                    <li className="bold pad-x-sm cursor-pointer" id={donationDriveTab? "activeTab" : ""} onClick={()=> {displayTab("donTab")}}>Sacramental Request</li>
                </a>
                <a href="#anointing">
                    <li className="bold pad-x-sm cursor-pointer" id={immigrantsTab? "activeTab" : ""} onClick={()=> {displayTab("imTab")}}>Annointing of the Sick</li> 
                    </a>
                <a href="#join">
                    <li className="bold pad-x-sm cursor-pointer" id={outreachFacilityTab? "activeTab" : ""} onClick={()=> {displayTab("outTab")}}>Join the Church</li> 
                    </a>
                    
                </ul>

                            <main className="pad-y-sm " id="recon ">
                                <div>
                                    <div className="pad-y-sm flex-flow-wrap full-width" >
                                        <div className=" pad-xy-sm flex-no-wrap move-left">

                                            {
                                                communityMealImg ? 
                                                    <img className=" service-img" alt="church" src={communityMealImg} />
                                                :""
                                            }
                                        </div>
                                        <div className=" pad-xy-sm move-right box-sm" >
                                            <div className="pad-xy-sm  " id="font-dark ">
                                                <div className="">
                                                    <h4 className="primary-color-text-custom">Reconciliation</h4>
                                                    
                                                    <div className="">
                                                        <h2>THE Sacrament of Reconciliation</h2>
                                                    </div>
                                                    
                                                </div>
                                                <div className="align-text-left text-custom-width box-md">
                                                    <p >{communityMeal}</p>
                                                </div>
                                            </div>
                                        </div>

                                        

                                    </div>
                                </div>
                            </main>
                            <main className="pad-y-sm" id="confirm">
                                <div>
                                    <div className="pad-y-sm flex-flow-wrap full-width" id="font-dark ">

                                        <div className=" pad-xy-sm">
                                            <div className="pad-xy-sm  ">
                                                <h4 className="primary-color-text-custom">Confirmation Program</h4>
                                                
                                                <div className="">
                                                    <h2> Confirmation Program for Youth</h2>
                                                </div>
                                                <div className="align-text-left text-custom-width ">
                                                    <p >{covidAssist}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" pad-xy-sm flex-no-wrap ">

                                            {
                                                setCovidAssistImg ? 
                                                    <img className=" service-img" alt="church" src={covidAssistImg} />
                                                :""
                                            }
                                        </div>

                                    </div>
                                </div>
                            </main>
                            <main className="pad-y-sm" id="request">
                                <div>
                                    <div className="pad-y-sm flex-flow-wrap full-width" id="font-dark ">
                                            <div className=" pad-xy-sm flex-no-wrap ">

                                            {
                                                donationDriveImg ? 
                                                    <img className=" service-img" alt="church" src={donationDriveImg} />
                                                :""
                                            }
                                        </div>
                                        <div className=" pad-xy-sm">
                                            <div className="pad-xy-sm  ">
                                                <h4 className="primary-color-text-custom">Sacramental Request</h4>
                                                
                                                <div className="">
                                                    <h2>How to request for sacramental Records</h2>
                                                </div>
                                                <div className="align-text-left text-custom-width ">
                                                    <p >{donationDrive}</p>
                                                </div>
                                            </div>
                                        </div>

                                        

                                    </div>
                                </div>
                            </main>
                            <main className="pad-y-sm" id="anointing">
                                <div>
                                    <div className="pad-y-sm flex-flow-wrap full-width" id="font-dark ">

                                        <div className=" pad-xy-sm">
                                            <div className="pad-xy-sm  ">
                                                <h4 className="primary-color-text-custom">Annointing of the Sick</h4>
                                                
                                                <div className="">
                                                    <h2>Annointing of the Sick</h2>
                                                </div>
                                                <div className="align-text-left text-custom-width ">
                                                    <p >{immigrants}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" pad-xy-sm flex-no-wrap ">

                                            {
                                                immigrantsImg ? 
                                                    <img className=" service-img" alt="church" src={immigrantsImg} />
                                                :""
                                            }
                                        </div>

                                    </div>
                                </div>
                            </main>
                            <main className="pad-y-sm" id="join">
                                <div>
                                    <div className="pad-y-sm flex-flow-wrap full-width" id="font-dark ">
                                            <div className=" pad-xy-sm flex-no-wrap ">
                                           {
                                                outreachFacilityImg ? 
                                                    <img className=" service-img" alt="church" src={outreachFacilityImg} />
                                                :""
                                            }
                                        </div>
                                        <div className=" pad-xy-sm">
                                            <div className="pad-xy-sm  ">
                                                <h4 className="primary-color-text-custom">Join the Church</h4>
                                                
                                                <div className="">
                                                    <h2>Wanting to be part of us?</h2>
                                                </div>
                                                <div className="align-text-left text-custom-width ">
                                                    <p >{outreachFacility}</p>
                                                </div>
                                            </div>
                                        </div>

                                        

                                    </div>
                                </div>
                            </main>
                   
                </Container>

        </div>
    )
}

export default Stuff
