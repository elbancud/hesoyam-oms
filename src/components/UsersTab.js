import React, { useEffect, useState}from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import {   useHistory} from 'react-router-dom';
import { Button } from "@material-ui/core";
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

function UsersTab() {

  

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [userDetails, setUserDetails] = useState();
    const [open, setOpen] = useState(false);

    const [currentAppointKey, setCurrentAppointKey] = useState("")
    const [currentId, setCurrentId] = useState("")
    const [currentOverallKey, setCurrentOverallKey] = useState("");
   
    const [update, setUpdate] = useState(false)
    const [seatDb, setSeatDb] = useState("")
    const [eventKey, setEventKey] = useState("")


    const handleClose = () => {
        setOpen(false);
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


    //open dialog box
    //set variables depending on table data


    useEffect(() => {
                  
       
        
        const dbUser = firebase.database().ref("user-account-details");

        dbUser.once('value').then((snapshot) => {

                const postSnap = snapshot.val();
                const userDetails = [];
                
                for (let id in postSnap) {
                    userDetails.push({id, ...postSnap[id]});
                }
                
                setUserDetails(userDetails)
                
        })
    }, [update]);
 

    return (
        <div className="design1-properties">
            <header>
                <div className="position-relative ">
                    <Container>
                    <div>
                    <TableContainer className="box">
                    <Table  size="medium" aria-label="a dense table">
                        <TableHead>
                            
                            <TableRow>
                                <TableCell align="center" colSpan={3}>User details</TableCell>
                            
                            </TableRow>
                            
                            <TableRow>
                                
                                <TableCell>Name</TableCell>
                                <TableCell>Lastname</TableCell>
                                <TableCell>Email</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                            userDetails ? userDetails.map((data) => {
                                
                                return (
                                        <TableRow key={data.id}>
                                            <TableCell align="left"> {data.username} </TableCell> 
                                            <TableCell align="left"> {data.lastname} </TableCell>
                                            <TableCell align="left"> {data.email} </TableCell>                                        
                                            
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
            
        </div>

    )
}

export default UsersTab
