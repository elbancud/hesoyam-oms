import React, { useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import firebase from '../firebase';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useAuth } from "../context/AuthContext";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import validator from 'validator';
import RingLoader from "react-spinners/RingLoader";
import { v4 as uuidv4 } from 'uuid';


function AccordionSideTab() {
  const { setCurrentfileState, getCurrentfile } = useAuth();
  const [typing, setTyping] = useState(false);
  const [loadingState, setLoadingState] = useState(false)
  const [aboutSubText, setAboutSubText] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    

    const Input = styled('input')({
        display: 'none',
    });

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
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

  function saveChanges(e) {
        const id = uuidv4();
        
      if (name && name.length >= 6 && number && number.length >= 6 && validator.isEmail(email) && email && getCurrentfile().type === "image/jpeg" || getCurrentfile().size < 256000) {
          setLoadingState(true);

              const storage = firebase.storage().ref('staffImages').child(id)
              storage.put(getCurrentfile()).then(() => {
                              storage.getDownloadURL().then(url => {
                                  const dbRef = firebase.database().ref("data/staff");

                                  const data = {
                                      name: name,
                                      email: email,
                                      number: number,
                                      staffImage: url
                                  }
                                  dbRef.push(data).then(() => {
                                      setLoadingState(false);
                                      setAlertStatus(true)
                                      setFeedbackVariant("success")
                                      setAlertMessage("That's it right there, image posted")
                                      window.location.reload()

                                  })
                              })
              })
          
            setName("");
            setNumber("")
            setTyping(false);
      } else {
            setAlertStatus(true)
            setFeedbackVariant("error")
            setAlertMessage("Oopsies, Please fill out every field and Select an image (JPEG/PNG: max 25mb) ")
        }

  }
  function readUpload(event) {

        setCurrentfileState(event.target.files[0])
        event.target.value = null
        // setUpdate(!update)
    }
   return (
        
       <div className="box-default-width-accordion">
             {
                loadingState? <div className="middle-fix" >
                <div className="flex-default-center-xy">
                    <RingLoader color={"#533c9f"} loading={loadingState} size={80} speedMultiplier="1.4" /><br />
                </div>
                <div className="pad-y-sm"><p><b>Uploading...</b></p></div>
                </div>: ""
            }
       <div className="modal-footer plain-white-color-bg  pad-x-sm ">
           <div className="flex-space-between pad-y-sm full-width box-default-width-accordion">
           <div>
             
            </div>
           <Button
                  onClick={saveChanges}
                  disabled={!typing}
                  variant="outlined"
                  color="secondary"
                  size="small">
                  <Typography variant="subtitle2">Save</Typography>
                  
            </Button>
          </div>
        </div>
    
      
       <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Staff Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>This section requires you to input name, email, and contact number of the staff. You also have to upload profile photo of the stuff which will be posted on the generated website </i>
            </Typography>
                       <div className="m-t-sm">
                          <Typography variant="subtitle2">Staff Image</Typography>
                          <div className="flex-space-between">
                            <p variant="subtitle3">File:  {getCurrentfile().name ? getCurrentfile().name : "" }</p>
                              
                            <Tooltip title="Select a file">
                                
                                <label htmlFor="icon-button-file">
                                      <Input accept="image/*" id="icon-button-file" type="file" onChange={readUpload} />
                                      <Button color="primary" aria-label="upload picture" component="span" >
                                          <FileUploadIcon />
                                          Select File
                                      </Button>
                                </label>
                              </Tooltip>
                          </div>
                        </div>
             <div className="m-t-sm">
                  <Typography variant="subtitle2">Staff Name</Typography>
               <TextField value={name} onChange={(e) => { setName(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Full Name" size="small" variant="outlined" className="text-input-deafult full-width"/>

             </div>
             <div className="pad-y-sm ">
                    <Typography variant="subtitle2">Contact Details</Typography>
                      
                    <TextField value={number} onChange={(e) => { setNumber(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Contact Number" size="small" variant="outlined" className="text-input-deafult full-width"/>
                    <div className="pad-l-t">
                    </div>
                    
                     <TextField value={email} onChange={(e) => { setEmail(e.target.value); setTyping(true) }}  id="outlined-full-width" fullWidth label="Email" size="small" variant="outlined" className="text-input-deafult full-width" />

                  

             </div>
           </div>
        </AccordionDetails>
       </Accordion>
        
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
  );
}

export default AccordionSideTab;