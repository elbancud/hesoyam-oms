import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie'
import firebase from "../firebase"
import { Button } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ReactPlayer from "react-player"


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function UserSettings() {
  const [activeCookies, setActiveCookes] = useState(false)

    const [value, setValue] = React.useState(0);
    const [cookies, setCookies] = useCookies(['user'])

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [activeDesign, setActiveDesign] = useState("")
    
    const [profileArray, setProfileArray] = useState()
    const [prayerArray, setPrayerArray] = useState();
    const [livestreamtArray, setLivestreamArray] = useState()
    
  const [update, setUpdate] = useState(false);
    const handleChange = (event, newValue) => {
      setValue(newValue);

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
    
    const [choirArray, setChoirArray] = useState();
    const [funeralArray, setFuneralArray] = useState();
    const [weddingArray, setWeddingArray] = useState();
    const [massArray, setMassArray] = useState();
    const remove = (ref, key, id) => {
      
      const dbRef = firebase.database().ref(ref).child(key);
        dbRef.remove().then(() => {
            setAlertStatus(true)
            setFeedbackVariant("success")
            setAlertMessage("Success! data deleted")
            setUpdate(!update);
        })
      if (id !== "0") {
        const storage = firebase.storage().ref('staffImages').child(id);
        storage.delete().then(() => {
            setAlertStatus(true)
            setFeedbackVariant("success")
            setAlertMessage("Success! data deleted")
            setUpdate(!update);
        })
      }
    }
    useEffect(() => {
       

        const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
        })
        
        const dbRef = firebase.database().ref("data/staff");
              dbRef.once("value")
                  .then(function (snapshot) {
                      const postSnap = snapshot.val();
                      const profileArray = [];
                      for (let id in postSnap) {
                          profileArray.push({id, ...postSnap[id]});
                      }
                      setProfileArray(profileArray)
        });
        const dbRefPrayers = firebase.database().ref("prayerWallPosts");
            dbRefPrayers.once("value")
                .then(function (snapshot) {
                    const snaps = snapshot.val();
                    const prayerArray = [];
                    for (let id in snaps) {
                        prayerArray.push({id, ...snaps[id]});
                    }
                    setPrayerArray(prayerArray)
                });
        const dbRefPod = firebase.database().ref("recordedliveUrl");
        dbRefPod.once("value").then(function (snapshot) {
                    const postSnap = snapshot.val();
                    const livestreamtArray = [];
                    for (let id in postSnap) {
                        livestreamtArray.push({id, ...postSnap[id]});
                    }
                    setLivestreamArray(livestreamtArray)
        });
            const dbChoir = firebase.database().ref("data/choir");
            dbChoir.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const choirArray = [];
                for (let id in postSnap) {
                    choirArray.push({id, ...postSnap[id]});
                }
                setChoirArray(choirArray)
            });

        const dbFuneral = firebase.database().ref("data/funeral");
        dbFuneral.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const funeralArray = [];
                for (let id in postSnap) {
                    funeralArray.push({id, ...postSnap[id]});
                }
                setFuneralArray(funeralArray)
        });
        const dbwed = firebase.database().ref("data/wedding");
        dbwed.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const weddingArray = [];
                for (let id in postSnap) {
                    weddingArray.push({id, ...postSnap[id]});
                }
                setWeddingArray(weddingArray)
        });
        
       const dbMass = firebase.database().ref("data/mass");
        dbMass.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const massArray = [];
                for (let id in postSnap) {
                    massArray.push({id, ...postSnap[id]});
                }
                setMassArray(massArray)
            });
       
      

    }, [update]);
   
  return (
    <div className="position-relative">
        <div className="design1-properties">
              <div className="position-absolute " id="primary-bg-color">
            </div>
        </div>
        <Container className="pad-y-md">
            <div className="title pad-y-sm">
                    <h2>Reports Generation Tab</h2>
                    <p>Here you will be able to view and even remove data which were posted in the generated website. Mind you that the data that you could remove here are just the once that are not editable and requires you to add another on the module.</p>
                </div>
        
            <Box
                className="pad-y-md"
                sx={{ flexGrow: 1, display: 'flex', width:'100%', flexWrap: 'wrap', textAlign: 'left'}}
            >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className="box pad-xy-sm "
            >
                <Tab label="Recorded Streams" {...a11yProps(3)} />
                <Tab label="Pages: Staffs" {...a11yProps(1)} />
                <Tab label="Pages: Prayerwall" {...a11yProps(3)} />
                <Tab label="Pages: Cantors and Choir Music" {...a11yProps(3)} />
                <Tab label="Pages: Funeral Music" {...a11yProps(3)} />
                <Tab label="Pages: Wedding Music" {...a11yProps(3)} />
                <Tab label="Pages: Mass Music" {...a11yProps(3)} />
                
                
            </Tabs>
            <TabPanel value={value} index={1}  className="width-md-no-margin">
                <TableContainer className="box">
                    <Table  size="medium" aria-label="a dense table">
                        <TableHead>
                            
                            <TableRow>
                                <TableCell align="center" colSpan={9}>Staff Posted</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                            profileArray ? profileArray.map((data) => {
                                return (
                                        <TableRow key={data.id}>
                                            <TableCell align="left"> 
                                               <img src={data.staffImage} className="qr-150" alt = "qr"/>
                                             </TableCell>
                                            <TableCell align="left"> {data.name} </TableCell>
                                            <TableCell align="left"> {data.email} </TableCell>
                                            <TableCell align="left"> {data.number} </TableCell>
                                            
                                           
                                            
                                            <TableCell align="left"> 
                                                <Button   id="btn-error-contained" color="inherit" onClick={()=> {remove("data/staff/", data.id, data.imageId)}}>remove</Button>
                                             </TableCell>
                                        </TableRow>
                                        )
                                    }) : ""
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            
            </TabPanel>
          <TabPanel value={value} index={2}  className="width-md-no-margin">
                    
                <TableContainer className="box">
                    <Table  size="medium" aria-label="a dense table">
                        <TableHead>
                            
                            <TableRow>
                                <TableCell align="center" colSpan={2}>Prayerwall</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >Data</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                            prayerArray ? prayerArray.map((data) => {
                                return (
                                        <TableRow key={data.id}>
                                            <TableCell align="left"> {data.postInput} </TableCell>
                                            <TableCell align="left"> 
                                                <Button   id="btn-error-contained" color="inherit" onClick={()=> {remove("prayerWallPosts/", data.id, "0")}}>remove</Button>
                                             </TableCell>
                                        </TableRow>
                                        )
                                    }) : ""
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                
             
            
            </TabPanel>
            <TabPanel value={value} index={0}  className="width-md-no-margin">
                    
                <TableContainer className="box">
                    <Table  size="medium" aria-label="a dense table">
                        <TableHead>
                            
                            <TableRow>
                                <TableCell align="center" colSpan={3}>Recorded Livestreams</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >Frame</TableCell>
                                <TableCell >Timestamp</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {
                            livestreamtArray ? livestreamtArray.map((data) => {
                                return (
                                        <TableRow key={data.id}>
                                            <TableCell align="left" className="react-player-sm"> 
                                                        <ReactPlayer
                                                            url = {data.liveUrl}
                                                            controls
                                                            width="150"
                                                            height="150"
                                                            className="react-player-sm "
                                                        />  </TableCell>
                                            <TableCell align="left"> {data.timestamp} </TableCell>
                                            <TableCell align="left"> 
                                              <Button  id="btn-error-contained" color="inherit" onClick={()=> {remove("recordedliveUrl/",data.id, "0")}}>remove</Button>
                                             </TableCell>
                                        </TableRow>
                                        )
                                    }) : ""
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                
             
            
                  </TabPanel>
                  <TabPanel value={value} index={3}  className="width-md-no-margin">
                        <TableContainer className="box">
                            <Table  size="medium" aria-label="a dense table">
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Posted Cantors and Choir Music</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Title</TableCell>
                                        <TableCell >Link</TableCell>
                                        <TableCell >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                
                                <TableBody>
                                    {
                                    choirArray ? choirArray.map((data) => {
                                        return (
                                                <TableRow key={data.id}>
                                                <TableCell align="left" >
                                                        {data.text}
                                                </TableCell>
                                                    <TableCell align="left"> {data.link} </TableCell>
                                                    <TableCell align="left"> 
                                                    <Button  id="btn-error-contained" color="inherit" onClick={()=> {remove("data/choir",data.id, "0")}}>remove</Button>
                                                    </TableCell>
                                                </TableRow>
                                                )
                                            }) : ""
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                  </TabPanel>
                  <TabPanel value={value} index={4}  className="width-md-no-margin">
                        <TableContainer className="box">
                            <Table  size="medium" aria-label="a dense table">
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Posted Funeral music</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Title</TableCell>
                                        <TableCell >Link</TableCell>
                                        <TableCell >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                
                                <TableBody>
                                    {
                                    funeralArray ? funeralArray.map((data) => {
                                        return (
                                                <TableRow key={data.id}>
                                                <TableCell align="left" >
                                                        {data.text}
                                                </TableCell>
                                                    <TableCell align="left"> {data.link} </TableCell>
                                                    <TableCell align="left"> 
                                                    <Button  id="btn-error-contained" color="inherit" onClick={()=> {remove("data/funeral",data.id, "0")}}>remove</Button>
                                                    </TableCell>
                                                </TableRow>
                                                )
                                            }) : ""
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                  </TabPanel>
                  <TabPanel value={value} index={5}  className="width-md-no-margin">
                        <TableContainer className="box">
                            <Table  size="medium" aria-label="a dense table">
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Posted Wedding music</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Title</TableCell>
                                        <TableCell >Link</TableCell>
                                        <TableCell >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                
                                <TableBody>
                                    {
                                    weddingArray ? weddingArray.map((data) => {
                                        return (
                                                <TableRow key={data.id}>
                                                <TableCell align="left" >
                                                        {data.text}
                                                </TableCell>
                                                    <TableCell align="left"> {data.link} </TableCell>
                                                    <TableCell align="left"> 
                                                    <Button  id="btn-error-contained" color="inherit" onClick={()=> {remove("data/wedding",data.id, "0")}}>remove</Button>
                                                    </TableCell>
                                                </TableRow>
                                                )
                                            }) : ""
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                  </TabPanel>
                  <TabPanel value={value} index={6}  className="width-md-no-margin">
                        <TableContainer className="box">
                            <Table  size="medium" aria-label="a dense table">
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Posted Mass music</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Title</TableCell>
                                        <TableCell >Link</TableCell>
                                        <TableCell >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                
                                <TableBody>
                                    {
                                    massArray ? massArray.map((data) => {
                                        return (
                                                <TableRow key={data.id}>
                                                <TableCell align="left" >
                                                        {data.text}
                                                </TableCell>
                                                    <TableCell align="left"> {data.link} </TableCell>
                                                    <TableCell align="left"> 
                                                    <Button  id="btn-error-contained" color="inherit" onClick={()=> {remove("data/mass",data.id, "0")}}>remove</Button>
                                                    </TableCell>
                                                </TableRow>
                                                )
                                            }) : ""
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
            </Box>
            
        </Container>
              {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
            feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning">
                    {alertMessage}
                </Alert>
              </Snackbar> :
             <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                   {alertMessage}
                </Alert>
            </Snackbar>
              }
    </div>
  );
}
