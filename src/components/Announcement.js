import React, { useState, useEffect } from 'react'
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import { useAuth } from '../context/AuthContext';
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Announcement() {

    //variables
    const { key } = useAuth();

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [titleErrorState, setTitleErrorState] = useState(false);
    const [titleError, seTitleError] = useState("");
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [descriptionInputError, setDescriptionInputError] = useState("");
    const [descriptionInputErrorState, setDescriptionInputErrorState] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);
    const [update, setUpdate] = useState(false);
    const [announcementArray, setAnnouncementArray] = useState();

    const [editPostTitleTextFieldError, setEditPostTitleTextFieldError] = useState("")
    const [editPostTitleTextFieldInput, setEditPostTitleTextFieldInput] = useState("")
    const [editPostTitleTextFieldState, setEditPostTitleTextFieldState] = useState(false)

    const [editDescriptionTextFieldError, setEditDescriptionTextFieldError] = useState("")
    const [editDescriptionTextFieldState, setEditDescriptionTextFieldState] = useState(false)
    const [editDescriptionTextFieldInput, setEditDescriptionTextFieldInput] = useState("")

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const [activePost, setActivePost] = useState("");
    const [activeDescription, setActiveDescription] = useState("");

    
    
    useEffect(() => {
        const dbRef = firebase.database().ref("announcements");
        dbRef.once("value")
            .then(function (snapshot) {
                const postSnap = snapshot.val();
                const announcementArray = [];
                for (let id in postSnap) {
                    announcementArray.push({id, ...postSnap[id]});
                }
                setAnnouncementArray(announcementArray)
            });
    }, [update])
    // validate 
    //disable if no requirement is inputted
    //push requirement
    const postAnnouncement = (event) => {
        
        if (titleInput.length < 8) {
            setTitleErrorState(true)
            seTitleError("Please enter atleast 8 characters or 3 words above.")
            setAlertStatus(true)
            setFeedbackVariant("warning")
            setAlertMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
        } else {
            setTitleErrorState(false)
            seTitleError("")
        }
        if (descriptionInput.length < 8) {
            setDescriptionInputErrorState(true);
            setDescriptionInputError("Please enter atleast 8 characters or 3 words above.")
            setAlertStatus(true)
            setFeedbackVariant("warning")
            setAlertMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
            
        } else {
            setDescriptionInputErrorState(false);
            setDescriptionInputError("")
      
            if (titleErrorState === false && descriptionInputErrorState === false) {
               
                const dbRefPush = firebase.database().ref("announcements");
                dbRefPush.orderByChild('announcementTitle').equalTo(titleInput).once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        setAlertStatus(true)
                        setFeedbackVariant("error")
                        setAlertMessage("Oopsies, title is already existing try another one")
                    }
                    else {
                        setTitleInput('')
                        setDescriptionInput('')
                        const pushAnnouncement = {
                            announcementTitle: titleInput,
                            announcementDescription: descriptionInput
                        }
                        dbRefPush.push(pushAnnouncement).then(() => {
                            setAlertStatus(true)
                            setFeedbackVariant("success")
                            setAlertMessage("That's it right there, Event or announcement posted")
                        })
                        setUpdate(!update);
                    }
                            
                });
                //push
            }
        }
    }
    const handleCloseModal = () => {
        setOpenEditModal(false)
        setUpdate(!update);

    }
    function handleOpenModalEdit( title, description, key) {
        setOpenEditModal(true);
        setEditPostTitleTextFieldInput(title);
        setEditDescriptionTextFieldInput(description);
        setActiveKey(key);
        setActivePost(title)
        setActiveDescription(description)
            setEditDescriptionTextFieldState(false)
            setEditDescriptionTextFieldError("")
            setEditPostTitleTextFieldState(false)
            setEditPostTitleTextFieldError("")
    }
    function handleOpenDeleteModal(title, key) {
        setOpenDeleteModal(true)
        setActivePost(title)
        setActiveKey(key);

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
        }
        if (editDescriptionTextFieldInput.length < 8) {
            setEditDescriptionTextFieldState(true)
            setEditDescriptionTextFieldError("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
        } else {
            setEditDescriptionTextFieldState(false)
            setEditDescriptionTextFieldError("")
            if (editPostTitleTextFieldInput === activePost && editDescriptionTextFieldInput === activeDescription) {
                setAlertStatus(true)
                setFeedbackVariant("error")
                setAlertMessage("Oops you don't seem to change anything, kindly check it again. Thankyou")
                setEditDescriptionTextFieldState(true)
                setEditDescriptionTextFieldError("No changes found")
                setEditPostTitleTextFieldState(true)
                setEditPostTitleTextFieldError("No changes found")

            }
              if(editDescriptionTextFieldState === false && editDescriptionTextFieldState === false && editPostTitleTextFieldInput.length > 8 && editDescriptionTextFieldInput.length > 8 && editPostTitleTextFieldInput != activePost || editDescriptionTextFieldInput != activeDescription){
                            setEditDescriptionTextFieldState(false)
                            setEditDescriptionTextFieldError("")
                            setEditPostTitleTextFieldState(false)
                            setEditPostTitleTextFieldError("")
                            
                            const dbRef = firebase.database().ref("account-details/" + cookies.Key).child(activeKey);

                              const update = {
                            announcementTitle: editPostTitleTextFieldInput,
                            announcementDescription: editDescriptionTextFieldInput
                            }
                            dbRef.update(update).then(()=>{
                                setAlertStatus(true)
                                setFeedbackVariant("success")
                                setAlertMessage("Success! " + activePost + " post updated")
                                setOpenEditModal(false)
                            })

            }
          
        }  
        setUpdate(!update);
       
       
    }
    function handleDelete(title) {
        const dbRef = firebase.database().ref("account-details/" + cookies.Key).child(activeKey);
        dbRef.remove().then(() => {
            setAlertStatus(true)
            setFeedbackVariant("success")
            setAlertMessage("Success! " + activePost + " post deleted")
            setUpdate(!update);
            setOpenDeleteModal(false)
        })
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
                    <h2>Announcement</h2>
                    <p>Shown here are the events and announcements which you have posted. You could edit, remove, and add another one if you please. </p>
                </div>
       
                <div className="pad-y-sm">
                  
                    <div className="">
                       <div >
                            <TextField error={titleErrorState} helperText={titleError} onChange={e => { setTitleInput(e.target.value) }} value={titleInput} id="outlined-full-width" fullWidth label="Enter Title" variant="outlined" className="text-input-deafult" />
                        </div>
                        <div >
                             <div className="m-y-sm">
                                <TextField multiline rows={4} error={descriptionInputErrorState} helperText={descriptionInputError} onChange={e => { setDescriptionInput(e.target.value) }} value={descriptionInput} id="outlined-full-width" fullWidth label="Description" variant="outlined" type="text" className="text-input-deafult" />

                            </div>
                        </div>

                        <div className="pad-y-sm">
                            <Button
                                onClick = {postAnnouncement}
                                id="btn-large-secondary"
                                variant="contained"
                                className="btn-large primary-color"
                                color="secondary"
                                size="large"
                                disabled = {!descriptionInput}
                            >
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="title pad-y-sm">
                    <div className="flex-no-wrap">
                        {announcementArray ? announcementArray.map((data)=> {
                             if (data.announcementTitle) {
                                 return (
                                 <div key={data.id} className="box m-xy-sm">
                                    <div className ="flex-space-between ">   
                                        <div className="box-default-width">
                                            <div className="  pad-xy-sm  ">
                                                <div >
                                                    <p><b>{data.announcementTitle}</b></p>
                                                </div>
                                                <div className="subtitle">
                                                    <p>{data.announcementDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-default ">
                                            <div className=" cursor-pointer">
                                                <Tooltip title="Edit">
                                                <IconButton onClick={()=>{handleOpenModalEdit(data.announcementTitle, data.announcementDescription, data.id)}}>
                                                             <EditIcon />
                                                </IconButton>
                                                </Tooltip>
                                            </div>
                                            <div className=" cursor-pointer">
                                                <Tooltip title="Delete">
                                                <IconButton onClick={() => { handleOpenDeleteModal(data.announcementTitle,data.id)}}>
                                                             <DeleteIcon />
                                                </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>

                                 </div>
                                )
                            }
                        }) : "No anouncements yet"}
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
                            {/* <div className="position-absolute off-set-top">
                                <div className="account-img">
                                    <img src={emailIllustration}></img>
                                </div>
                            </div> */}
                            <div className = "pad-t-sm">
                                <div className="align-text-center pad-x-md">
                                    <h2>Edit your post</h2>
                                    <p>
                                        Enter your changes in the text 
                                    </p>
                                    <div className="pad-y-sm">
                                        <div>
                                            <TextField error={editPostTitleTextFieldState} helperText={editPostTitleTextFieldError} onChange={e => {setEditPostTitleTextFieldInput(e.target.value)}} value={editPostTitleTextFieldInput}   id="outlined-full-width" fullWidth label="Edit your title  here" variant="outlined" className="text-input-deafult"/>
                                        </div>
                                        <div className="m-y-sm">
                                            <TextField error={editDescriptionTextFieldState} helperText={editDescriptionTextFieldError} onChange={e => {setEditDescriptionTextFieldInput(e.target.value)}} value={editDescriptionTextFieldInput}   id="outlined-full-width" fullWidth label="Edit your description here" variant="outlined" className="text-input-deafult"/>
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
                                <h2>Delete " {activePost} " Post</h2>
                                    <p>
                                        Are you sure you want to delete this post? 
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
        </div>
    )
}

export default Announcement
