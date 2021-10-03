import React, { useState,useEffect } from 'react'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import IconButton from '@mui/material/IconButton';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import RingLoader from "react-spinners/RingLoader";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Podcast() {

    //variables
  

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [titleErrorState, setTitleErrorState] = useState(false);
    const [titleError, seTitleError] = useState("");
    const [titleInput, setTitleInput] = useState("");

    const [uploadFile, setUploadFile] = useState("")
    const [loadingState, setLoadingState] = useState(false)

    const [podcastArray, setPodcastArray] = useState()

    const [editPostTitleTextFieldError, setEditPostTitleTextFieldError] = useState("")
    const [editPostTitleTextFieldInput, setEditPostTitleTextFieldInput] = useState("")
    const [editPostTitleTextFieldState, setEditPostTitleTextFieldState] = useState(false)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const [activePost, setActivePost] = useState("");
    const [update, setUpdate] = useState(false);
    const [activeAudioId, setActiveAudioId] = useState("");

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    function readUpload(event) {
        setUploadFile(event.target.files[0])
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
    const handleCloseModal = () => {
        setOpenEditModal(false)
        setUpdate(!update);

    }
    function handleOpenModalEdit(title, key) {
        setOpenEditModal(true);
        setEditPostTitleTextFieldInput(title);
        setActiveKey(key);
        setActivePost(title)
        setEditPostTitleTextFieldState(false)
        setEditPostTitleTextFieldError("")
    }
    function handleOpenDeleteModal(title, key, audioId) {
        setOpenDeleteModal(true)
        setActivePost(title)
        setActiveKey(key);
        setActiveAudioId(audioId);
    }
    function handleCLoseDeleteModal() {
        setOpenDeleteModal(false)
    }
    function handleEdit() {
        
        if (editPostTitleTextFieldInput.length < 8) {
            setEditPostTitleTextFieldState(true)
            setEditPostTitleTextFieldError("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
        } else {
            setEditPostTitleTextFieldState(false)
            setEditPostTitleTextFieldError("")
     
            if (editPostTitleTextFieldInput.toLowerCase() === activePost.toLowerCase()) {
                setAlertStatus(true)
                setFeedbackVariant("error")
                setAlertMessage("Oops you don't seem to change anything, kindly check it again. Thankyou")
                setEditPostTitleTextFieldState(true)
                setEditPostTitleTextFieldError("No changes found")
            }
            if (editPostTitleTextFieldInput.length > 8 && editPostTitleTextFieldInput.toLowerCase() !== activePost.toLowerCase()) {
                const dbRefPush = firebase.database().ref("podcast-audios-upload");
                dbRefPush.orderByChild('audioTitle').equalTo(editPostTitleTextFieldInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setAlertStatus(true)
                        setFeedbackVariant("error")
                        setAlertMessage("Oopsies, title is already existing try another one")
                        setUpdate(!update);
                        
                    }
                    else {
                        setEditPostTitleTextFieldState(false)
                        setEditPostTitleTextFieldError("")
                        const dbRef = firebase.database().ref("podcast-audios-upload").child(activeKey);
                        const update = {
                            audioTitle: editPostTitleTextFieldInput,
                        }
                        dbRef.update(update).then(() => {
                            setUpdate(!update);
                            setAlertStatus(true)
                            setFeedbackVariant("success")
                            setAlertMessage("Success! " + activePost + " post updated")
                            setOpenEditModal(false)

                        })
                    }
                })
                
            
            }
        }
        setUpdate(!update);
    }
       
    function handleDelete(title) {
        const storageRef = firebase.storage().ref('podcast-audios').child(activeAudioId);
        const db = firebase.database().ref('podcast-audios-upload').child(activeKey);

        storageRef.delete().then(() => {
            db.remove();
            setAlertStatus(true)
            setFeedbackVariant("success")
            setAlertMessage("Success! " + activePost + " post deleted")
            setUpdate(!update);
            setOpenDeleteModal(false)
        });

       
    }
    useEffect(() => {
        const dbRef = firebase.database().ref("podcast-audios-upload");
        dbRef.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const podcastArray = [];
                for (let id in postSnap) {
                    podcastArray.push({id, ...postSnap[id]});
                }
                setPodcastArray(podcastArray)
            });
    }, [update])
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
                    
                <div className="title pad-y-sm">
                    <h2>Podcast</h2>
                    <p>Shown here are the podcasts which you have posted. You could edit, remove, and add another one if you please. </p>
                </div>
       
                <div className="pad-y-sm">
                  
                    <div className=" flex-flow-wrap ">
                        <div className="flex-default">
                            <div className="pad-y-sm position-relative">
                            <TextField sx={{maxWidth: 600}} error={titleErrorState} helperText={titleError} onChange={e => { setTitleInput(e.target.value) }} value={titleInput} id="outlined-full-width" fullWidth label="Enter Title" variant="outlined" className="text-input-deafult" />
                                <div  className="position-absolute-right">
                                    <label htmlFor="icon-button-file">
                                        <Input id="icon-button-file" type="file" onChange={readUpload} />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <LibraryMusicIcon />
                                        </IconButton>
                                    </label>
                                </div>
                            </div>
                            <div className="pad-xy-sm">
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
                        </div>

                        {uploadFile ?
                            <div>
                                <p>File: </p>
                                <p><b>{uploadFile? uploadFile.name: ""}</b></p>
                            </div>: ""
                        }
                        </div>
                </div>
                
                
                 <div>
                    <h4>Files uploaded in your storage</h4>
                </div>
                <div className="flex-flow-wrap ">
                <div className="flex-flow-wrap ">
                        {podcastArray ? podcastArray.map((data)=> {
                                 return (
                                 <div key={data.id} className="box m-xy-sm box-default-width">
                                    <div className ="flex-space-between ">   
                                        <div className="">
                                            <div className="  pad-xy-sm  ">
                                                <div className="flex-space-between">
                                                    <p><b>{data.audioTitle}</b></p>
                                                    <div className="flex-default ">
                                                    <div className=" cursor-pointer">
                                                        <Tooltip title="Edit">
                                                        <IconButton onClick={()=>{handleOpenModalEdit(data.audioTitle, data.id)}}>
                                                                    <EditIcon />
                                                        </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    <div className=" cursor-pointer">
                                                        <Tooltip title="Delete">
                                                        <IconButton onClick={() => { handleOpenDeleteModal(data.audioTitle ,data.id, data.audioId)}}>
                                                                    <DeleteIcon />
                                                        </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                </div>
                                                <div>
                                                    <audio controls>
                                                             <source src={data.audioLink} type="audio/ogg" />
                                                    </audio>
                                                </div>    
                                            </div>
                                            
                                        </div>
                                        
                                    </div>

                                 </div>
                                 )
                        }) : "No podcasts uploaded yet"}
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
            <Modal
                    classes="modal"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openEditModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={openEditModal}>
                        <div className="tertiary-color modal-body position-relative">
                           
                            <div className = "pad-t-sm">
                                <div className="align-text-center pad-x-md">
                                    <h2>Edit your title</h2>
                                    <p>
                                        Enter your changes in the text 
                                    </p>
                                    <div className="pad-y-sm">
                                        <div>
                                            <TextField error={editPostTitleTextFieldState} helperText={editPostTitleTextFieldError} onChange={e => {setEditPostTitleTextFieldInput(e.target.value)}} value={editPostTitleTextFieldInput}   id="outlined-full-width" fullWidth label="Edit your title  here" variant="outlined" className="text-input-deafult"/>
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>
                            <div className="modal-footer plain-white-accent-bg flex-end pad-x-md ">
                                <div className="flex-default pad-y-sm">
                                    <Button
                                    onClick={handleCloseModal}>
                                            <b className="primary-color-text pad-x-sm">Cancel</b>
                                    </Button>
                                    <Button
                                            onClick={handleEdit}
                                            variant="contained"
                                            className="btn-large primary-color"
                                            color="secondary"
                                            size="large"
                                            id ="btn-default-primary"
                                        >
                                            save changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Fade>
            </Modal>
            <Modal
                    classes="modal"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDeleteModal}
                    onClose={handleCLoseDeleteModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={openDeleteModal}>
                        <div className="tertiary-color modal-body position-relative">
                        
                            <div className = "pad-y-md m-b-md">
                                <div className="align-text-center pad-x-md">
                                <h2>Delete " {activePost} " podcast</h2>
                                    <p>
                                        Are you sure you want to delete this podcast? 
                                    </p>
                                    
                                </div>

                            </div>
                            <div className="modal-footer plain-white-accent-bg flex-end pad-x-md ">
                                <div className="flex-default pad-y-sm">
                                    <Button
                                    onClick={handleCLoseDeleteModal}>
                                            <b className="primary-color-text pad-x-sm">Cancel</b>
                                    </Button>
                                    <Button
                                            onClick={handleDelete}
                                            variant="contained"
                                            className="btn-large primary-color"
                                            color="secondary"
                                            size="large"
                                            id ="btn-default-primary"
                                        >
                                            delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Fade>
            </Modal>
            </Container>

    )
}

export default Podcast
