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
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ImageIcon from '@mui/icons-material/Image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UploadBtn from './UploadBtn';


function DonateAdmin() {
    //variables
    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [uploadFile, setUploadFile] = useState("")
    const [loadingState, setLoadingState] = useState(false)

    const [donationArray, setDonationArray] = useState()

    
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const [activePost, setActivePost] = useState("");
    const [update, setUpdate] = useState(false);
    const [activeAudioId, setActiveAudioId] = useState("");
    const [qrArray, setQrArray] = useState('')

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertStatus(false);
    };

  

    function handleOpenDeleteModal(title, key, audioId) {
        setOpenDeleteModal(true)
        setActivePost(title)
        setActiveKey(key);
        setActiveAudioId(audioId);
    }
    function handleCLoseDeleteModal() {
        setOpenDeleteModal(false)
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
        const db = firebase.database().ref('user-donations')
        db.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const donationArray = [];
                for (let id in postSnap) {
                    donationArray.push({id, ...postSnap[id]});
                }
                setDonationArray(donationArray)
        });
            const dbQR= firebase.database().ref('qr-e-wallet')
                dbQR.once("value")
                .then(function (snapshot) {
                const snap = snapshot.val().eWalletLink;
                    setQrArray(snap)
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
                    <h2>Donations Tab</h2>
                    <p>Here you will be uploading your e-wallet's qr image, please take a good screenshot and make sure to cut out and keep just the qr code</p>
                </div>
       
                <div className="pad-y-sm flex-default-center-xy">
                  
                    <div className=" flex-flow-wrap ">
                        <div className="flex-default">
                            <UploadBtn type="image"/>
                        </div>

                        </div>
                </div>
                <div className="pad-xy-md full-width flex-flow-wrap-start-center-xy">
                    {qrArray ? 
                        <img src={qrArray} className="imageFixedWH"/>
                    : ""}
                </div>
                <TableContainer className="box">
                    <Table  size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="center" colSpan={2}>Donation History</TableCell>
                            
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                 donationArray ? donationArray.map((data) => {
                                return (
                                        <TableRow key={data.id}>
                                            <TableCell align="left"> {data.donator} </TableCell>
                                            <TableCell align="right"> {data.donationAmount} php</TableCell>
                                        </TableRow>
                                        )

                                    }) : ""
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
             
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

export default DonateAdmin
