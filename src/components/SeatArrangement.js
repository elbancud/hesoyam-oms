<<<<<<< HEAD
import React, { useState } from 'react'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "../style/style.css";
// import firebase from 'firebase';
=======
import React, { useState, useEffect } from 'react'
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import firebase from 'firebase';
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
function SeatArrangement() {
   
    //variables

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [seat, setSeat] = useState([{reserve: true}, 'b', {reserve: true},'d'])
    
    //get 
     
    const saveServiceRequirement = (event) => {

    }
    
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlertStatus(false);
    };
    return (
        <div>
            <Container className="pad-y-md">
                <div className="title pad-y-sm">
                    <h2>Seat Management</h2>
                    <p>Shown here are rows and columns of your church. At the moment it is static and pre-defined, but the availability is dynamic and referenced from the user's appointments. </p>
                </div>
                <div>
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
                    <div className=" flex-default ">
                         
                        {seat ? seat.map((data,index)=> {
                                if(data.reserve){
                                    return (
                                    <div className=" ">
                                        <div >
                                                <Tooltip title="Click for action">
                                                   
                                                   
                                                        <Button variant="contained" id="reserved" disableElevation>
                                                            {index}
                                                        </Button>
                                            </Tooltip>
                                        </div> 

                                    </div>
                                    ) 
                                } else {
                                    return (
                                    <div className=" ">
                                        <div className="seat-div">
                                            <Tooltip title="Click for action">
                                                   
                                                    <Button variant="contained" id="available" disableElevation>
                                                            {index}
                                                        </Button>
                                            </Tooltip>
                                        </div> 

                                    </div>
                                    )
                                }                            
                                
                        }) : "No anouncements yet"}
                    </div>
                </div>
            </Container>
<<<<<<< HEAD
                 {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
=======
                 {feedbackVariant == "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
<<<<<<< HEAD
            feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
=======
            feedbackVariant == "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
>>>>>>> 77b7eb5d96475a28314da050b3a7999404d43dd8
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

export default SeatArrangement
