import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
<<<<<<< HEAD
import {useHistory} from 'react-router-dom';
import {useCookies } from 'react-cookie';
=======
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
<<<<<<< HEAD
    const history = useHistory();
    const [cookies] = useCookies(['user']);
=======
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,

    });
<<<<<<< HEAD
     function prayerWall() {
        history.push("/prayerWall")
    }
    function donate() {
        history.push("/donationPage")
    }
    function pod() {
        history.push("/userPodcast")
    }
=======

>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
<<<<<<< HEAD
    function handleServiceRedirect() {
        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")
        }
    }
=======

>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
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
<<<<<<< HEAD
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
=======

                    <li >Prayerwall</li>
                    <li ><a href="#aboutUs">About Us</a></li>
                    <li ><a href="#contactUs">Contact Us</a></li>

                    <li href="#aboutUs">Donate</li>
                    <li>Services</li>
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
                </ul>
            </div>
        </div>
    );

    return (
        <div className="flex-space-between ">
            
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
