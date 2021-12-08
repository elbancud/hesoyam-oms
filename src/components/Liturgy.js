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
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LaunchIcon from '@mui/icons-material/Launch';
import mtg from '../images/MTQ.png'

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
    const [currentTab, setCurrentTab] = useState("")
    
    const [liturgy, setLiturgy] = useState("");

    const [choirArray, setChoirArray] = useState();
    const [funeralArray, setFuneralArray] = useState();
    const [weddingArray, setWeddingArray] = useState();
    const [massArray, setMassArray] = useState();

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
        const dbLit = firebase.database().ref("data/liturgy");
        dbLit.once("value").then(function (snapshot) {
                setLiturgy(snapshot.val().text)
            });
            const dbChoir = firebase.database().ref("data/choir");
            dbChoir.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const choirArray = [];
                for (let id in postSnap) {
                    choirArray.push({id, ...postSnap[id]});
                }
                setChoirArray(choirArray)
            });

        const dbFuneral = firebase.database().ref("data/funeral");
        dbFuneral.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const funeralArray = [];
                for (let id in postSnap) {
                    funeralArray.push({id, ...postSnap[id]});
                }
                setFuneralArray(funeralArray)
        });
        const dbwed = firebase.database().ref("data/wedding");
        dbwed.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const weddingArray = [];
                for (let id in postSnap) {
                    weddingArray.push({id, ...postSnap[id]});
                }
                setWeddingArray(weddingArray)
        });
        
       const dbMass = firebase.database().ref("data/mass");
        dbMass.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const massArray = [];
                for (let id in postSnap) {
                    massArray.push({id, ...postSnap[id]});
                }
                setMassArray(massArray)
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
            setCurrentTab("Cantors and Choir Music")

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
            setCurrentTab("Funeral Music")

        }else if (tabName === "imTab") {
            setCovidAssistTab(false);
            setCommunityMealTab(false);
            setDonationDriveTab(false);
            setOutreachFacilityTab(false);
            setImmigrantsTab(true);
            setCurrentTab("Wedding Music")

        } else {
            setCovidAssistTab(false);
            setCommunityMealTab(false);
            setDonationDriveTab(false);
            setOutreachFacilityTab(true);
            setImmigrantsTab(false);
            setCurrentTab("Mass Music")

        }

    }
    return (
        <div className={activeDesign === "design1" ? "design1-properties " : activeDesign === "design2 " ? "design2-properties " : "design3-properties "}>
            <header className="  position-relative">
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
            <Container className="pad-y-md">
                                            {/* <Tab className="m-r-sm" label="Community Meal" {...a11yProps(1)} />
                            <Tab className="m-r-sm" label="Covid 19 Assistance" {...a11yProps(2)} />
                            <Tab className="m-r-sm" label="Donation Drives" {...a11yProps(3)} />
                            <Tab className="m-r-sm" label="Immigrants and Refuge" {...a11yProps(3)} />
                            <Tab  className="m-r-sm"label="Outreach Facility use" {...a11yProps(3)} /> */}

            <ul className="pad-y-md flex-flow-wrap" id="font-dark">
                <li className="bold pad-x-sm cursor-pointer" id={communityMealTab? "activeTab" : ""} onClick={()=> {displayTab("comTab")}}>Liturgy</li>
                <li className="bold pad-x-sm cursor-pointer" id={covidAssistTab? "activeTab" : ""} onClick={()=> {displayTab("covTab")}}>Cantors and Choir Music</li>
                <li className="bold pad-x-sm cursor-pointer" id={donationDriveTab? "activeTab" : ""} onClick={()=> {displayTab("donTab")}}>Funeral Music</li>
                <li className="bold pad-x-sm cursor-pointer" id={immigrantsTab? "activeTab" : ""} onClick={()=> {displayTab("imTab")}}>Wedding Music</li>
                <li className="bold pad-x-sm cursor-pointer" id={outreachFacilityTab? "activeTab" : ""} onClick={()=> {displayTab("outTab")}}>Mass Music</li>
                    
                </ul>
                            <main className="m-y-md display-none position-relative" id={!communityMealTab? "display-block":""}>
                                <div>
                                    <div className="pad-y-md flex-flow-wrap box under-garment-gradient full-width" >

                                        <div className=" pad-xy-sm ">
                                            <div className="pad-xy-sm  " >
                                                <div className="font-light" id="font-light">
                                                    <p>{siteTitle}</p>
                                                </div>
                                                <div className="font-light" id="font-light">
                                                    <h2>{currentTab}</h2>
                                                </div>
                                                
                                            </div>
                                        </div>

                                    </div>
                    </div>
                                        <div className="position-absolute right-most">
                                            <img className="qr-250" src={mtg} alt ="login banner"></img>
                                        </div>
                            </main>
                            
                            <main className="display-none" id={communityMealTab? "display-block":""}>
                                <div>
                                    <div className="pad-y-sm flex-flow-wrap box full-width" id="font-dark">

                                        <div className=" pad-xy-sm">
                                            <div className="pad-xy-sm  ">
                                                <div className="">
                                                    <h2>About the Liturgy</h2>
                                                </div>
                                                <div className="align-text-left text-custom-width ">
                                                    <p >{liturgy}</p>
                                                </div>
                                            </div>
                                        </div>

                     

                                    </div>
                                </div>
                            </main>
                            
                            <main className="display-none " id={covidAssistTab? "display-block":""}>
                                <div id="font-dark">
                                    <h3>Popular</h3>
                                </div>
                               
                                
                                {
                                    choirArray ? choirArray.map((data,index) => {
                                        return(
                                        <div id="font-dark">
                                            <a href={data.link}>
                                                
                                            <div className=" flex-space-between pad-xy-sm full-width" id={index % 2 === 0 ? "odd-bg" : ""}>
                                                <div className="flex-space-between">
                                                    <div className="m-r-md ">
                                                        <div className=" ">
                                                            <LibraryMusicIcon />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className=" ">
                                                        <div className=" ">
                                                            <p className="primary-color-text-custom">{data.text}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div>
                                                            <LaunchIcon />
                                                    
                                                </div>

                                            </div>
                                            </a>

                                        </div>)
                                    }) : ""
                                }
                            </main>
                            <main className="display-none " id={donationDriveTab? "display-block":""}>
                                <div id="font-dark">
                                    <h3>Popular</h3>
                                </div>
                               
                                
                                {
                                    funeralArray ? funeralArray.map((data,index) => {
                                        return(
                                        <div id="font-dark">
                                            <a href={data.link}>
                                                
                                            <div className=" flex-space-between pad-xy-sm full-width" id={index % 2 === 0 ? "odd-bg" : ""}>
                                                <div className="flex-space-between">
                                                    <div className="m-r-md ">
                                                        <div className=" ">
                                                            <LibraryMusicIcon />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className=" ">
                                                        <div className=" ">
                                                            <p className="primary-color-text-custom">{data.text}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div>
                                                            <LaunchIcon />
                                                    
                                                </div>

                                            </div>
                                            </a>

                                        </div>)
                                    }) : ""
                                }
                            </main>
                          <main className="display-none " id={immigrantsTab? "display-block":""}>
                                <div id="font-dark">
                                    <h3>Popular</h3>
                                </div>
                               
                                
                                {
                                    weddingArray ? weddingArray.map((data,index) => {
                                        return(
                                        <div id="font-dark">
                                            <a href={data.link}>
                                                
                                            <div className=" flex-space-between pad-xy-sm full-width" id={index % 2 === 0 ? "odd-bg" : ""}>
                                                <div className="flex-space-between">
                                                    <div className="m-r-md ">
                                                        <div className=" ">
                                                            <LibraryMusicIcon />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className=" ">
                                                        <div className=" ">
                                                            <p className="primary-color-text-custom">{data.text}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div>
                                                            <LaunchIcon />
                                                    
                                                </div>

                                            </div>
                                            </a>

                                        </div>)
                                    }) : ""
                                }
                            </main>
                            <main className="display-none " id={outreachFacilityTab? "display-block":""}>
                                    <div id="font-dark">
                                        <h3>Popular</h3>
                                    </div>
                                
                                    
                                    {
                                        massArray ? massArray.map((data,index) => {
                                            return(
                                            <div id="font-dark">
                                                <a href={data.link}>
                                                    
                                                <div className=" flex-space-between pad-xy-sm full-width" id={index % 2 === 0 ? "odd-bg" : ""}>
                                                    <div className="flex-space-between">
                                                        <div className="m-r-md ">
                                                            <div className=" ">
                                                                <LibraryMusicIcon />
                                                                
                                                            </div>
                                                        </div>
                                                        <div className=" ">
                                                            <div className=" ">
                                                                <p className="primary-color-text-custom">{data.text}</p>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div>
                                                                <LaunchIcon />
                                                        
                                                    </div>

                                                </div>
                                                </a>

                                            </div>)
                                        }) : ""
                                    }
                                </main>
                          
                            
                            
                   
                </Container>

        </div>
    )
}

export default Stuff
