import React, { useState, useEffect } from 'react'
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import { useAuth } from '../context/AuthContext';
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Podcast() {

    //variables
    const { key, currentUser } = useAuth();

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

  

    // validate 
    //disable if no requirement is inputted
    //push requirement
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
                    <h2>Podcast</h2>
                    <p>Shown here are the podcasts which you have posted. You could edit, remove, and add another one if you please. </p>
                </div>
       
                <div className="pad-y-sm">
                  
                    <div className=" flex-default ">
                        {/* textbox or an edit  */}
                        <div >
                        </div>

                        <div className="pad-xy-sm">
                            <Button
                                id="btn-large-secondary"
                                variant="contained"
                                className="btn-large primary-color"
                                color="secondary"
                                size="large"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
                 {feedbackVariant == "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
            feedbackVariant == "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
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

export default Podcast
