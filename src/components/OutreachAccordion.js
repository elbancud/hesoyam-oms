import React, { useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import firebase from '../firebase';
import RingLoader from "react-spinners/RingLoader";
import { v4 as uuidv4 } from 'uuid';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Snackbar } from '@material-ui/core';
import { useAuth } from "../context/AuthContext";
import { styled } from '@mui/material/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@mui/material/Tooltip';


function AccordionSideTab() {
  const { setCurrentfileState, getCurrentfile } = useAuth();
  const [imageSelected, setImageSelected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [siteTitle, setSiteTitle] = useState("");
  
  const [loadingState, setLoadingState] = useState(false)

  const [covidAssist, setCovidAssist] = useState("");
  const [communityMeal, setCommunityMeal] = useState("");
  const [donationDrive, setDonationDrive] = useState("");
  const [outreachFacility, setOutreachFacility] = useState("");

  const [immigrants, setImmigrants] = useState("");
  const Input = styled('input')({
        display: 'none',
  });
  const [alertStatus, setAlertStatus] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [activePanel, setActivePanel] = useState("");
  
  function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertStatus(false);
    };
    function readUpload(event) {
        setImageSelected(true)
        setCurrentfileState(event.target.files[0])
        event.target.value = null
        // setUpdate(!update)
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      setActivePanel(panel)
  };
  function saveChanges(e) {
    e.preventDefault();
      if(activePanel=== "panel1"){
        if (communityMeal !== "" && communityMeal.length >= 10 ) {
            const dbRef = firebase.database().ref("data/communityMeal");
            dbRef.update({ text: communityMeal }).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("Success data stored in covid Outreach:Community meal")
                                            })
        } if(communityMeal !== "" || typeof(getCurrentfile().name) !== "undefined") {
            if (typeof(getCurrentfile().name) !== "undefined") {
              if (getCurrentfile().size >= 25000000) {
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage("Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")

              } else if(communityMeal !== "" || typeof(getCurrentfile().name) !== "undefined"){
                  if (activePanel === "panel1") {
                        setLoadingState(true)
                        const storage = firebase.storage().ref('outreachMeal').child("communityMealImage")
                        storage.put(getCurrentfile()).then(() => {
                                        storage.getDownloadURL().then(url => {
                                            const dbComm = firebase.database().ref("data/communityMeal");
                                            const data = {
                                                staffImage: url
                                            }
                                            dbComm.update(data).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("That's it right there, image posted")
                                            })
                                        })
                        })
                        setCurrentfileState("")
                  } 
              }
              } else {
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage("Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")
            }
          }
      }else if(activePanel === "panel2") {
        if (covidAssist !== "" && covidAssist.length >= 10 ) {
            const dbRef = firebase.database().ref("data/covidAssist");
            dbRef.update({ text: covidAssist }).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("Success data stored in Outreach: Covid assistance")
                                            })
        }  if(covidAssist !== "" || typeof(getCurrentfile().name) !== "undefined") {
            if (typeof(getCurrentfile().name) !== "undefined") {
              if (getCurrentfile().size >= 25000000) {
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage(" Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")

              } else {
                  if (activePanel === "panel2") {
                        setLoadingState(true)
                        const storage = firebase.storage().ref('outreachMeal').child("covidAssistImage")
                        storage.put(getCurrentfile()).then(() => {
                                        storage.getDownloadURL().then(url => {
                                            const dbComm = firebase.database().ref("data/covidAssist");
                                            const data = {
                                                staffImage: url
                                            }
                                            dbComm.update(data).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("That's it right there, image posted")
                                            })
                                        })
                        })
                        setCurrentfileState("")
                    
                  } 
              }
              } else if(covidAssist === "" || covidAssist.length <= 10 ){
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage("Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")
            }
          }
      }
      else if(activePanel === "panel3") {
        if (donationDrive !== "" && donationDrive.length >= 10 ) {
            const dbRef = firebase.database().ref("data/donationDrive");
            dbRef.update({ text: donationDrive }).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("Success data stored in Outreach: Donation drive")
                                            })
        }
        if (donationDrive !== "" || typeof (getCurrentfile().name) !== "undefined") {
            if (typeof(getCurrentfile().name) !== "undefined") {
              if (getCurrentfile().size >= 25000000) {
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage(" Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")

              } else {
                  if (activePanel === "panel3") {
                        setLoadingState(true)
                        const storage = firebase.storage().ref('outreachMeal').child("donationDriveImage")
                        storage.put(getCurrentfile()).then(() => {
                                        storage.getDownloadURL().then(url => {
                                            const dbComm = firebase.database().ref("data/donationDrive");
                                            const data = {
                                                staffImage: url
                                            }
                                            dbComm.update(data).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("That's it right there, image posted")
                                            })
                                        })
                        })
                        setCurrentfileState("")
                    
                  } 
              }
              } else if(donationDrive === "" || donationDrive.length <= 10 ){
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage("Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")
            }
          }
      } else if (activePanel === "panel4") {
        if (immigrants !== "" && immigrants.length >= 10 ) {
            const dbRef = firebase.database().ref("data/immigrants");
            dbRef.update({ text: immigrants }).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("Success data stored in Outreach: Immigrants & Refuge")
                                            })
        }
        if (immigrants !== "" || typeof (getCurrentfile().name) !== "undefined") {
            if (typeof(getCurrentfile().name) !== "undefined") {
              if (getCurrentfile().size >= 25000000) {
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage(" Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")

              } else {
                  if (activePanel === "panel4") {
                        setLoadingState(true)
                        const storage = firebase.storage().ref('outreachMeal').child("immigrantsImage")
                        storage.put(getCurrentfile()).then(() => {
                                        storage.getDownloadURL().then(url => {
                                            const dbComm = firebase.database().ref("data/immigrants");
                                            const data = {
                                                staffImage: url
                                            }
                                            dbComm.update(data).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("That's it right there, image posted")
                                            })
                                        })
                        })
                        setCurrentfileState("")
                    
                  } 
              }
              } else if(immigrants === "" || immigrants.length <= 10 ){
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage("Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")
            }
          }
      } else {
        if (outreachFacility !== "" && outreachFacility.length >= 10 ) {
            const dbRef = firebase.database().ref("data/outreachFacility");
            dbRef.update({ text: outreachFacility }).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("Success data stored in Outreach: Immigrants & Refuge")
                                            })
        }
        if (outreachFacility !== "" || typeof (getCurrentfile().name) !== "undefined") {
            if (typeof(getCurrentfile().name) !== "undefined") {
              if (getCurrentfile().size >= 25000000) {
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage(" Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")

              } else {
                  if (activePanel === "panel5") {
                        setLoadingState(true)
                        const storage = firebase.storage().ref('outreachMeal').child("outreachFacilityImage")
                        storage.put(getCurrentfile()).then(() => {
                                        storage.getDownloadURL().then(url => {
                                            const dbComm = firebase.database().ref("data/outreachFacility");
                                            const data = {
                                                staffImage: url
                                            }
                                            dbComm.update(data).then(() => {
                                                setLoadingState(false);
                                                setAlertStatus(true)
                                                setFeedbackVariant("success")
                                                setAlertMessage("That's it right there, image posted")
                                            })
                                        })
                        })
                        setCurrentfileState("")
                    
                  } 
              }
              } else if(outreachFacility === "" || outreachFacility.length <= 10 ){
                  setAlertStatus(true)
                  setFeedbackVariant("error")
                  setAlertMessage("Oopsies, Please fill out field with atleast 1 sentence and Select an image (JPEG/PNG: max 25mb) ")
            }
          }
      }
      
    setTyping(false);

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
                  disabled={typeof(getCurrentfile().name) !== "undefined" ? false : typing ? false :true}
                  onClick={saveChanges}
                  variant="outlined"
                  color="secondary"
                  size="small">
                  <Typography variant="subtitle2">Save</Typography>
                  
            </Button>
          </div>
        </div>

       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="box-shadow-light " >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Community meal</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>This section requires you to input paragraphs max of 2 and you have the option to input an image. These will be posted on the generated website </i>
              
            </Typography>
             <div className="m-t-sm">
               <Typography variant="subtitle2">Main text</Typography>
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
               <TextField value={communityMeal} onChange={(e) => { setCommunityMeal(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Text" size="small" variant="outlined" className="text-input-deafult full-width"/>

             </div>
             
           </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Covid 19 Assistance</Typography>
        </AccordionSummary>
         <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>This section requires you to input paragraphs max of 2 and you have the option to input an image. These will be posted on the generated website </i>
              
            </Typography>
             <div className="m-t-sm">
               <Typography variant="subtitle2">Main text</Typography>
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
               <TextField value={covidAssist} onChange={(e) => { setCovidAssist(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Text" size="small" variant="outlined" className="text-input-deafult full-width"/>

             </div>
             
           </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Donation Drives</Typography>
        </AccordionSummary>
         <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>This section requires you to input paragraphs max of 2 and you have the option to input an image. These will be posted on the generated website </i>
              
            </Typography>
             <div className="m-t-sm">
               <Typography variant="subtitle2">Main text</Typography>
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
               <TextField value={donationDrive} onChange={(e) => { setDonationDrive(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Text" size="small" variant="outlined" className="text-input-deafult full-width"/>
             </div>
           </div>
        </AccordionDetails>
       </Accordion>
       <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Immigrants and Refuge</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>This section requires you to input paragraphs max of 2 and you have the option to input an image. These will be posted on the generated website </i>
              
            </Typography>
             <div className="m-t-sm">
               <Typography variant="subtitle2">Main text</Typography>
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
               <TextField value={immigrants} onChange={(e) => { setImmigrants(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Text" size="small" variant="outlined" className="text-input-deafult full-width"/>

             </div>
             
           </div>
        </AccordionDetails>
       </Accordion>
       <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Outreach Facility use</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>This section requires you to input paragraphs max of 2 and you have the option to input an image. These will be posted on the generated website </i>
              
            </Typography>
             <div className="m-t-sm">
               <Typography variant="subtitle2">Main text</Typography>
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
               <TextField value={outreachFacility} onChange={(e) => { setOutreachFacility(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Text" size="small" variant="outlined" className="text-input-deafult full-width"/>

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