import React, {useState, useEffect} from 'react'
import Container from "@material-ui/core/Container";
import embed from "../images/live-embed.JPG"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from 'firebase';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import validator from 'validator';


function LivestreamTab() {
    const [url, setUrl] = useState('')
    const [urlError, setUrlError] = useState('')
    const [urlErrorState, setUrlErrorState] = useState(false)

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    function handleUrl() {
        if (!validator.isURL(url)) {
            setAlertStatus(true)
            setFeedbackVariant("error")
            setAlertMessage("Ooops! please input a valid url")
            
        } else {
            
        const db = firebase.database().ref("liveUrl")
        const today = new Date()
        
        let livestreamDetails = {
            liveUrl: url,
            timestamp: today,
        }
            
        db.update(livestreamDetails).then(() => {
            setAlertStatus(true)
            setFeedbackVariant("success")
            setAlertMessage("Success! You can now view the Live on generated website")
        })
        }
        
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
            <main className="m-x-sm  main-custom-flex " >
                <Container className="pad-y-lg">
                    <div className="title">
                        <h2>Livestream</h2>
                        <p className="m-b-md">Follow this steps to embed the live video in your generated website. </p>
                        
                        <ul className="m-t-md pad-x-md">

                            <li className="m-y-lg">
                                <b><h4>1. Navigate to your Video Post</h4></b>
                                <p className="m-t-sm">If you post a public video you can get the embed code directly from the video post itself.</p>
                            </li>

                            <li className="m-y-lg">
                                <b><h4>2. Get Video Post URL by opening the embed option on your live video.</h4></b>
                                <p className="m-t-sm">If you post a public video you can get the embed code directly from the video post itself.</p>
                                
                                <div className="primary-dark-bg full-width flex-default-center-x ">
                                    <img className="m-t-sm" src={embed} />
                                </div>

                            </li>

                            <li className="m-y-lg">
                                <b><h4>3. Select embed and Advance settings.</h4></b>
                                <p className="m-t-sm">Upon selecting the embed option you will be prompted with a dialog containing information. Here you want to click "Advanced Settings" </p>
                                
                            </li>
                            
                            <li className="m-y-lg">
                                <b><h4>4. Copy and Paste the video url here.</h4></b>
                                <p className="m-t-sm">Clicking the advance settings will redirect you to a page. Here you have a designated page for the url. Kindly copy the texts in the URL of Post box and paste it here.</p>
                                
                                <div className="m-y-md ">
                                            <TextField type="url" error={urlErrorState} fullWidth helperText={urlError} onChange={e => {setUrl(e.target.value)}} value={url}   id="outlined-full-width"  label="Enter URL" variant="outlined" className="text-input-deafult "/>
                                            <div className="m-y-md">
                                                <Button
                                                    disabled={!url}
                                                    onClick={handleUrl}
                                                    variant="contained"
                                                    className="btn-large primary-color "
                                                    color="secondary"
                                                    size="large"
                                                    id ="btn-default-primary"
                                                    >
                                                        Go live
                                                </Button>
                                                
                                            </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                   </Container>
                </main>
                 {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success">
                            {alertMessage}
                        </Alert>
                    </Snackbar> :
                    feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={3000} onClose={handleCloseAlert}>
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

export default LivestreamTab
