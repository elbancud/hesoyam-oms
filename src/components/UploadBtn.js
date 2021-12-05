import React, { useState,useEffect } from 'react'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import RingLoader from "react-spinners/RingLoader";
import Tooltip from '@mui/material/Tooltip';
import TextField from "@material-ui/core/TextField";
import { useCookies } from 'react-cookie';
import { useAuth } from "../context/AuthContext";
import FileUploadIcon from '@mui/icons-material/FileUpload';
function UploadBtn({type}) {
    //variables
    const { setCurrentfileState, getCurrentfile } = useAuth();

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [uploadFile, setUploadFile] = useState("")
    const [loadingState, setLoadingState] = useState(false)
    const [uploadFileImage, setuploadFileImage] = useState("")

    const [titleErrorState, setTitleErrorState] = useState(false);
    const [titleError, seTitleError] = useState("");
    const [titleInput, setTitleInput] = useState("");
    const [update, setUpdate] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);
    const [currentFileType, setCurrentFileType] = useState("")


    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    function readUpload(event) {

        setUploadFile(event.target.files[0])

        setCurrentfileState(event.target.files[0])

        const currentFile = getCurrentfile() ? getCurrentfile().name : ""
        setuploadFileImage("hello")
        event.target.value = null
        setUpdate(!update)
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertStatus(false);
    };
    const Input = styled('input')({
        display: 'none',
    });

    async function uploadMp3() {
        const id = uuidv4();
       
        if (!titleInput && titleInput.length < 8) {
            setTitleErrorState(true)
            seTitleError("Please enter a title: Atleast 3 words or 8 characters")
        } else {
            setTitleErrorState(false)
            seTitleError("")
        }
        if (uploadFile.type !== "audio/mpeg") {
            setAlertStatus(true)
            setFeedbackVariant("error")
            setAlertMessage("Oopsies, audio only. Ideally mp3 or mpeg ")
            setUploadFile('')
        }
        else {
            if (titleInput && titleInput.length > 8 && uploadFile) {
                const dbRefPush = firebase.database().ref("podcast-audios-upload");
                await dbRefPush.orderByChild('audioTitle').equalTo(titleInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setAlertStatus(true)
                        setFeedbackVariant("error")
                        setAlertMessage("Oopsies, title is already existing try another one")
                        setTitleErrorState(true)
                        seTitleError("")
                        setUploadFile('')
                    }
                    else {
                        dbRefPush.orderByChild('mp3Title').equalTo(uploadFile.name).once('value').then(snapshot => {
                            if (snapshot.exists()) {
                                setAlertStatus(true)
                                setFeedbackVariant("error")
                                setAlertMessage("Oopsies, audio is already existing try another one")
                                setUploadFile('')
                            }
                            else {
                                setLoadingState(true);
                                const storage = firebase.storage().ref('podcast-audios').child(id)
                                storage.put(uploadFile).then(() => {
                                    storage.getDownloadURL().then((url) => {
                                        const audioData = {
                                            audioTitle: titleInput,
                                            audioLink: url,
                                            mp3Title: uploadFile.name,
                                            audioId: id
                                        }
                                        const db = firebase.database().ref('podcast-audios-upload');
                                        db.push(audioData).then(() => {
                                            setUpdate(!update)
                                            setLoadingState(false);
                                            setAlertStatus(true)
                                            setFeedbackVariant("success")
                                            setAlertMessage("Audio uploaded.")
                                            setTitleInput('')
                                            setUploadFile('')
                                            window.location.reload()

                                        })
                                    })
                                })
                                             
                            }
                                            
                        });
                    }
                                    
                });
                     
            }
         
                
           
        }

    }
     function uploadImage() {
        if (getCurrentfile().type !== "image/jpeg" && getCurrentfile().type !== "image/png" || getCurrentfile().size > 256000) {
            setAlertStatus(true)
            setFeedbackVariant("error")
            setAlertMessage("Oopsies, Please select a valid image which is maximum of 25mb")
        } else {
            setLoadingState(true);

            const storage = firebase.storage().ref('qr-links').child('qr')
            storage.put(getCurrentfile()).then(() => {
                            storage.getDownloadURL().then(url => {
                                const db = firebase.database().ref('qr-e-wallet')
                                const imageData = {
                                    eWalletLink: url
                                }
                                db.update(imageData).then(() => {
                                    setLoadingState(false);
                                    setAlertStatus(true)
                                    setFeedbackVariant("success")
                                    setAlertMessage("That's it right there, image posted")
                                    window.location.reload()

                                })
                            })
            })
       
        }
    }
           

    return (

        <Container className="pad-y-md">
            {
                loadingState? <div className="middle-fix" >
                <div className="flex-default-center-xy">
                    <RingLoader color={"#533c9f"} loading={loadingState} size={80} speedMultiplier="1.4" /><br />
                </div>
                <div className="pad-y-sm"><p><b>Uploading...</b></p></div>
                </div>: ""
            }
                                    <div className="  ">
                                    <div className="flex-default full-width flex-flow-wrap-x">
                                        {type=== "audio" ?
                                            <TextField sx={{maxWidth: 600}} error={titleErrorState} helperText={titleError} onChange={e => { setTitleInput(e.target.value) }} value={titleInput} id="outlined-full-width"  label="Enter Title" variant="outlined" className="text-input-deafult" />
                                            : ""
                                        }
                                        <div className="pad-x-sm ">
                                                <Tooltip title="Select a file">
                                                    <label htmlFor="icon-button-file">
                                                    <Input id="icon-button-file" type="file" onChange={readUpload} />
                                                    <Button color="primary" aria-label="upload picture" component="span" >
                                                        <FileUploadIcon />
                                                        Select File
                                                    </Button>
                                                    </label>
                                                </Tooltip>

                                        </div>
                                        <div className="pad-xy-sm">
                                            {type=== "audio" ?
                                                <div>
                                                    <Button
                                                        disabled={!uploadFile}
                                                        onClick ={uploadMp3}
                                                        id="btn-large-secondary"
                                                        variant="contained"
                                                        className="btn-large primary-color"
                                                        color="secondary"
                                                        size="large"
                                                    >
                                                        upload
                                                    </Button>
                                                    
                                                    </div>
                                                : <Button
                                                    onClick ={uploadImage}
                                                    id="btn-large-secondary"
                                                    variant="contained"
                                                    className="btn-large primary-color"
                                                    color="secondary"
                                                    size="large"
                                                >
                                                    upload
                                                </Button>
                                                
                                            }
                                            
                                        </div>
                                        {type === "audio" ?
                                                <div>
                                                        <p>File: </p>
                                                        <p><b>{uploadFile.name}</b></p>
                                                    </div>
                                                :  <div>
                                                        <p>File: </p>
                                                        <p><b>{getCurrentfile().name}</b></p>
                                                    </div>
                                            }
                                        
                                        </div>
                                       
                                    </div>
                                    
                          
                   
    
            










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
            </Container>

    )
}

export default UploadBtn
