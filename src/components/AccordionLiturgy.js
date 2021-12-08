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
  const [activePanel, setActivePanel] = useState("");

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    
    
  const [liturgy, setLiturgy] = useState("");
  const [choir, setChoir] = useState("");
  const [funeral, setFuneral] = useState("");
  const [wedding, setWedding] = useState("");
  const [mass, setMass] = useState("");

  const [choirLink, setChoirLink] = useState("");
  const [funeralLink, setFuneralLink] = useState("");
  const [weddingLink, setWeddingLink] = useState("");
  const [massLink, setMassLink] = useState("");

    const Input = styled('input')({
        display: 'none',
    });

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
       setActivePanel(panel)
        
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
      if(activePanel === "panel1") {
          if (liturgy !== "" && liturgy.length > 10) {
                const dblit = firebase.database().ref("data/liturgy")
                dblit.update({text:liturgy}).then(() => {
                                          setAlertStatus(true)
                                          setFeedbackVariant("success")
                                          setAlertMessage("That's it right there, liturgy posted")
                })
             setLiturgy("")
          } else {
                setAlertStatus(true)
                setFeedbackVariant("error")
                setAlertMessage("Oopsies, Please fill out the field with atleast a phrase or 5 words")
          }
        
      } else if (activePanel === "panel2") {
        if (choir !== "" && choir.length > 6&& choirLink !== "" && choirLink.length >6  ) {
              const dblit = firebase.database().ref("data/choir")
              let data = {
                text: choir,
                link: choirLink
              }
              dblit.push(data).then(() => {
                                        setLoadingState(false);
                                        setAlertStatus(true)
                                        setFeedbackVariant("success")
                                        setAlertMessage("That's it right there, song posted")
                                    })
        setChoir("")
        setChoirLink("")
        } else {
              setAlertStatus(true)
              setFeedbackVariant("error")
              setAlertMessage("Oopsies, Please fill out a title and a link")
        }
        
      } else if (activePanel === "panel3") {
        if (funeral !== "" && funeral.length > 6&& funeralLink !== "" && funeralLink.length >6  ) {
              const dblit = firebase.database().ref("data/funeral")
              let data = {
                text: funeral,
                link: funeralLink
              }
              dblit.push(data).then(() => {
                                        setLoadingState(false);
                                        setAlertStatus(true)
                                        setFeedbackVariant("success")
                                        setAlertMessage("That's it right there, song posted")
                                    })
        setFuneralLink("")
        setFuneral("")
              
        } else {
              setAlertStatus(true)
              setFeedbackVariant("error")
              setAlertMessage("Oopsies, Please fill out a title and a link")
        }
      }else if (activePanel === "panel4") {
        if (wedding !== "" && wedding.length > 6&& wedding !== "" && weddingLink.length >6  ) {
              const dblit = firebase.database().ref("data/wedding")
              let data = {
                text: wedding,
                link: weddingLink
              }
              dblit.push(data).then(() => {
                                        setLoadingState(false);
                                        setAlertStatus(true)
                                        setFeedbackVariant("success")
                                        setAlertMessage("That's it right there, song posted")
                                    })
        setWeddingLink("")
        setWedding("")
              
        } else {
              setAlertStatus(true)
              setFeedbackVariant("error")
              setAlertMessage("Oopsies, Please fill out a title and a link")
        }
      }else if (activePanel === "panel5") {
        if (mass !== "" && mass.length > 6&& mass !== "" && massLink.length >6  ) {
              const dblit = firebase.database().ref("data/mass")
              let data = {
                text: mass,
                link: massLink
              }
              dblit.push(data).then(() => {
                                        setLoadingState(false);
                                        setAlertStatus(true)
                                        setFeedbackVariant("success")
                                        setAlertMessage("That's it right there, song posted")
                                    })
        setMassLink("")
        setMass("")
              
        } else {
              setAlertStatus(true)
              setFeedbackVariant("error")
              setAlertMessage("Oopsies, Please fill out a title and a link")
        }
      }
        // setLiturgy("")
        // setChoir("")
        // setFuneral("")
        // setWedding("")
        // setMass("")
        // setChoirLink("")
        // setFuneralLink("")
        // setWeddingLink("")
        // setMassLink("")
  }

   return (
        
     <div className="box-default-width-accordion">
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
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
           
        >
          <Typography variant="subtitle2">Liturgy</Typography>
        </AccordionSummary>
         <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>Set your website's Liturgy here. This will be saved and displayed at the top left corner of your website.</i>
            </Typography>
                  <div className="m-t-sm">
                      <Typography variant="subtitle2">Text</Typography>
               <TextField value={liturgy} onChange={(e) => { setLiturgy(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="Liturgy" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
            </div>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography variant="subtitle2">Cantors and Choir </Typography>
        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>Enter song title and url here. This information will be posted on the generated website. Be minded that the link you will enter here should be the link of the song in media format like YOUTUBE, GOOGLE DRIVE, etc. </i>
            </Typography>
            <div className="m-t-sm">
                      <Typography variant="subtitle2">Song title</Typography>
                      <TextField value={choir} onChange={(e) => { setChoir(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="Song Title" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
                  <div className="m-t-sm">
                            <Typography variant="subtitle2">Link</Typography>
                            <TextField value={choirLink} onChange={(e) => { setChoirLink(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="URL" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
           </div>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant="subtitle2">Funeral Music</Typography>

        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>Enter song title and url here. This information will be posted on the generated website. Be minded that the link you will enter here should be the link of the song in media format like YOUTUBE, GOOGLE DRIVE, etc. </i>
              
            </Typography>
            <div className="m-t-sm">
                      <Typography variant="subtitle2">Song title</Typography>
                      <TextField value={funeral} onChange={(e) => { setFuneral(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="Song Title" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
                  <div className="m-t-sm">
                            <Typography variant="subtitle2">Link</Typography>
                            <TextField value={funeralLink} onChange={(e) => { setFuneralLink(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="URL" size="small" variant="outlined" className="text-input-deafult full-width"/>

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
          <Typography variant="subtitle2">Wedding Music</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              <i>Enter song title and url here. This information will be posted on the generated website. Be minded that the link you will enter here should be the link of the song in media format like YOUTUBE, GOOGLE DRIVE, etc. </i>
              <div className="m-t-sm">
                      <Typography variant="subtitle2">Song title</Typography>
                      <TextField value={wedding} onChange={(e) => { setWedding(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="Song Title" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
                  <div className="m-t-sm">
                            <Typography variant="subtitle2">Link</Typography>
                            <TextField value={weddingLink} onChange={(e) => { setWeddingLink(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="URL" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Mass Music</Typography>
        </AccordionSummary>
         <AccordionDetails>
          <Typography>
              <i>Enter song title and url here. This information will be posted on the generated website. Be minded that the link you will enter here should be the link of the song in media format like YOUTUBE, GOOGLE DRIVE, etc. </i>
              <div className="m-t-sm">
                      <Typography variant="subtitle2">Song title</Typography>
                      <TextField value={mass} onChange={(e) => { setMass(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="Song Title" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
                  <div className="m-t-sm">
                            <Typography variant="subtitle2">Link</Typography>
                            <TextField value={massLink} onChange={(e) => { setMassLink(e.target.value); setTyping(true)}} id="outlined-full-width" fullWidth label="URL" size="small" variant="outlined" className="text-input-deafult full-width"/>

                  </div>
          </Typography>
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