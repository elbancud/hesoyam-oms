import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import {   useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import "../style/style.css";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const [cookies] = useCookies(['user']);

    const history = useHistory();
    const classes = useStyles();
    const [activePage, setActivePage] = useState("")
    const [liturgyPage, setLiturgyPage] = useState(false);
    const [staffPage, setStaffPage] = useState(false);
    const [outReachPage, setOutreactPage] = useState(false);
    const [quickLinksPage, setQuickLinksPage] = useState(false);
    const [sacramentsPage, setSacramentsPage] = useState(false);
    const [state, setState] = React.useState({
        top: false,

    });

    useEffect(() => {
            
                    const dbPages = firebase.database().ref("pages")
                    dbPages.once("value").then((snap) => {
                        setLiturgyPage(snap.val().liturgyPage)
                        setStaffPage(snap.val().staffPage)
                        setOutreactPage(snap.val().outReachPage)
                        setQuickLinksPage(snap.val().quickLinkPage)
                        setSacramentsPage(snap.val().sacramentsPage)
                    })

        const db = firebase.database().ref("themeChosen")
        db.on("value", snap => {

            setActivePage(snap.val().designName)
        })
    }, [])
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
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
    }function lit() {
        history.push("/liturgy")
    }
     function livestream() {
        history.push("/livestream")
    }
    function outreach() {
        history.push("/outreach")
    }
    function staff() {
        history.push("/staff")
    }
    function lit() {
        history.push("/liturgy")
    }
    function sacrament() {
        history.push("/sacrament")
    }
    function quick() {
        history.push("/quickLink")
    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <Divider />
            <div className="pad-xy-sm">
                <ul>
                                    <li onClick={prayerWall} className="cursor-pointer">
                                            Prayer Wall
                                    </li>
                                    <li onClick = {donate} className="cursor-pointer">
                                            Donate
                                    </li>
                                    <li onClick={handleServiceRedirect} className="cursor-pointer">
                                            Services
                                    </li>
                                    <li onClick={pod} className="cursor-pointer">
                                            Podcast
                                    </li>
                                    <li onClick={livestream} className="cursor-pointer">
                                            Streams
                                    </li>
                                    {liturgyPage? 
                                                <li onClick={lit}  className="cursor-pointer">
                                                    Liturgy & Music
                                                </li>: ""
                                            }{outReachPage? 
                                                <li onClick={outreach} className="cursor-pointer">
                                                    Outreach
                                                </li>: ""
                                            }{staffPage
                                                ? 
                                                <li onClick={staff} className="cursor-pointer">
                                                    Meet the Stuff
                                                </li>: ""
                                            }{sacramentsPage? 
                                                <li onClick={sacrament} className="cursor-pointer">
                                                    Sacraments
                                                </li>: ""
                                            }{quickLinksPage? 
                                                <li onClick={quick} className="cursor-pointer">
                                                    Quick Links
                                                </li>: ""
                                            }
                                   
                </ul>
            </div>
        </div>
    );

    return (
        <div className="flex-space-between ">
            
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon className="secondary-color-text"/>
                    </Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
