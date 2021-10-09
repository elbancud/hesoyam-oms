import React, { useEffect, useState}from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import UserProfile from './UserProfile';
import TopNavGenWeb from './TopNavGenWeb'
import 'react-h5-audio-player/lib/styles.css';
import Card from '@mui/material/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea } from '@material-ui/core';


function ServiceUser() {
        const [siteTitle, setSiteTitle] = useState("");
    
    const history = useHistory();
    const [cookies,setCookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
    const [serviceArray, setServiceArray] = useState()
    
    useEffect(() => {
                    const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {

                                    setSiteTitle(snapshot.val().savedSiteTitle)
                            });
                       
        const dbService = firebase.database().ref("services");
        dbService.once("value").then(function (snapshot) {
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
    function redirectTotAppointment(service) {
        history.push("/appointmentPage")
        setCookies("activeService", service)
    }
    return (
        <div className="design1-properties">
            <header>

            <div className="position-relative ">
                    <Container> 

                    <div className="pad-xy-sm position-fixed-top-z-0 full-width height-90 gradient-geometric" id="">
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
                        
                        <div className="align-text-center pad-y-md">
                            <h1 className="" id ="dynamic-h1">Our Services</h1>
                            <p><i>This is where you will arrange your appointments in our church services.</i></p>
                        </div>
                        {/* TODO:image object fit  */}
                        <div>
                                <div className="flex-flow-wrap-start-center-xy">
                                {serviceArray ? serviceArray.map((data) => {
                                        if (data.id.toLowerCase() === "baptism") {
                                            return (
                                                <Card sx={{ maxWidth: 345 }} className="box m-xy-sm" key={data.id} onClick={() => { redirectTotAppointment(data.id)}}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image="https://images.unsplash.com/photo-1619553433619-e4e225134558?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                                            alt="green iguana"
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                {data.id}
                                                            </Typography>
                                                            <Typography variant="body2" >
                                                                Christening.
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                             
                                                </Card>
                                        
                                            )
                                        } else if (data.id.toLowerCase() === "sunday mass") {
                                            return (
                                                <Card sx={{ maxWidth: 345 }} className="box m-xy-sm" key={data.id} onClick={() => { redirectTotAppointment(data.id)}}>
                                                
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image="https://images.unsplash.com/photo-1565566237557-4db41ccd167f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {data.id}
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        Sunday preaching.
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                             
                                                </Card>
                                        
                                            )
                                        }else if (data.id.toLowerCase() === "marriage") {
                                            return (
                                                <Card sx={{ maxWidth: 345 }} className="box m-xy-sm" key={data.id} onClick={() => { redirectTotAppointment(data.id)}}>
                                                
                                                <CardActionArea>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="https://images.unsplash.com/photo-1565566237557-4db41ccd167f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {data.id}
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        Sunday preaching.
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                             
                                                </Card>
                                        
                                            )
                                        }else if (data.id.toLowerCase() === "compil") {
                                            return (
                                                <Card sx={{ maxWidth: 345 }} className="box m-xy-sm" key={data.id} onClick={() => { redirectTotAppointment(data.id)}}>
                                                
                                                <CardActionArea>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="https://images.unsplash.com/photo-1565566237557-4db41ccd167f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {data.id}
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        Sunday preaching.
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                             
                                                </Card>
                                        
                                            )
                                        }else if (data.id.toLowerCase() === "house blessing") {
                                            return (
                                                <Card sx={{ maxWidth: 345 }} className="box m-xy-sm" key={data.id} onClick={() => { redirectTotAppointment(data.id)}}>
                                                <CardActionArea>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="https://images.unsplash.com/photo-1565566237557-4db41ccd167f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {data.id}
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        Sunday preaching.
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                             
                                                </Card>
                                        
                                            )
                                        }else if (data.id.toLowerCase() === "car blessing") {
                                            return (
                                                <Card sx={{ maxWidth: 345 }} className="box m-xy-sm" key={data.id} onClick={() => { redirectTotAppointment(data.id)}}>
                                                <CardActionArea>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="https://images.unsplash.com/photo-1565566237557-4db41ccd167f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {data.id}
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        Sunday preaching.
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                </Card>
                                        
                                            )
                                        }else if (data.id.toLowerCase() === "burial") {
                                            return (
                                                <Card sx={{ maxWidth: 345 }} className="box m-xy-sm" key={data.id} onClick={() => { redirectTotAppointment(data.id)}}>
                                                <CardActionArea>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="https://images.unsplash.com/photo-1565566237557-4db41ccd167f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {data.id}
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        Sunday preaching.
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                             
                                                </Card>
                                        
                                            )
                                        }
                                        
                                    
                                }): ""}
                            </div>
                        </div>
                    </Container>

                    
                
            </div>
            </header>

        </div>
    )
}

export default ServiceUser
