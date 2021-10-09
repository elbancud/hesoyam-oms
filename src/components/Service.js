import React, { useState, useEffect } from 'react'
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import "../style/style.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormHelperText from '@mui/material/FormHelperText';
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

function Service() {
    
    //variables
    const [service, setService] = useState('');
    const [requirementErrorState, setRequirementState] = useState(false);
    const [requirementError, setRequirementError] = useState("");
    const [requirementInput, setRequirementInput] = useState("");

    const [selectError, setSelectError] = useState("");
    const [selectErrorState, setSelectErrorState] = useState(false);

    const [serviceArray, setServiceArray] = useState();

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [update, setUpdate] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const [activePost, setActivePost] = useState("");

    const [editRequirementState, setEditRequirementState] = useState(false);
    const [editRequirementError, setEditRequirementError] = useState("");
    const [editRequirementInput, setEditRequirementInput] = useState("");

    const [maxErrorState, setMaxErrorState] = useState(false);
    const [maxError, setMaxError] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    
    const [daysBeforeErrorAppointState, setDaysBeforeErrorAppointState] = useState(false);
    const [daysBeforeAppointError, setDaysBeforeAppointError] = useState("");
    const [daysBeforeAppoint, setDaysAppointBefore] = useState("");

    const [daysBeforeCancelErrorState, setDaysBeforeCancelErrorState] = useState(false);
    const [daysBeforeCancelError, setDaysBeforeCancelError] = useState("");
    const [daysBeforeCancel, setDaysBeforeCancel] = useState("");

    const [operationDaysFromErrorState, setOperationDaysFromErrorState] = useState(false);
    const [operationDaysFrom, setOperationDaysFrom] = useState("");
    const [operationDayFromError, setOperationDayFromError] = useState("");
    
    const [operationDaysToErrorState, setOperationDaysToErrorState] = useState(false);
    const [operationDaysTo, setOperationDaysTo] = useState("");
    const [operationDayToError, setOperationDayToError] = useState("");

    const [timeOpFromState, setTimeOpFromState] = useState(false);
    const [timeOpFrom, setTimeOpFrom] = useState("");
    const [timeOpFromError, setTimeOpFromError] = useState("");

    const [timeOpToState, setTimeOpToState] = useState(false);
    const [timeOpTo, setTimeOpto] = useState("");
    const [timeOpToError, setTimeOpToError] = useState("");
    const [enableConstraintBtn,setEnableConstraingtBtn] = useState(true);
    const [session, setSessions] = useState(0);

    const [sessionIntervalErrorState, setSessionIntervalErrorState] = useState(false);
    const [sessionInterval, setSessionInterval] = useState("");
    const [sessionIntervalError, setSessionIntervalError] = useState("");

  
    //display inputted requirements on change event
    //map through objects
    const handleChange = (event) => {
        setSelectErrorState(false)
        setSelectError("");
        setService(event.target.value);
        setUpdate(!update);
                setMaxCapacity("")
                setOperationDaysFrom()
                setOperationDaysTo()
                setTimeOpFrom()
                setTimeOpto()
                setDaysAppointBefore()
                setDaysBeforeCancel()

    };
    
    function handleOperationDaysFrom(event) {
        setOperationDaysFrom(event.target.value);
    }
    function handleOperationDaysTo(event) {
        setOperationDaysTo(event.target.value);
    }
    const pushState = () => {
        const dbRef = firebase.database().ref("services/" + service);
                                   const requirementPush = {
                                    requirement: requirementInput.toLowerCase(),
                                }
                                dbRef.push(requirementPush).then(() => {
                                                    setAlertStatus(true)
                                                    setFeedbackVariant("success")
                                                    setAlertMessage("Great! New requirement in " + service + " added")
                                                    setRequirementInput('');
                                                })
    }
    //usestate for mounting 

    useEffect(() => {
        const dbRef = firebase.database().ref("services/" + service);

        if (service) {
                  dbRef.once("value").then(function (snapshot) {
                    const snap = snapshot.val();
                    const serviceArray = [];
                    for (let id in snap) {
                        serviceArray.push({id, ...snap[id]});
                    }
                    setServiceArray(serviceArray)
                    })
        }
       
       
    }, [update])
    // validate 
    //disable if no requirement is inputted
    //push requirement
    const saveServiceRequirement = (event) => {
        setUpdate(!update);

        event.preventDefault();

        if (requirementInput.length < 3) {
            setRequirementState(true)
            setRequirementError("Please input a phrase. 2 to 3 words")
        } else {
            setRequirementState(false)
            setRequirementError("")
        }
        if (!service) {
            setSelectErrorState(true)
            setSelectError("Select a church service");
        } else {
            setSelectErrorState(false)
            setSelectError("");
            if (requirementErrorState === false && selectErrorState === false && requirementInput.length > 3 && service !== "") {
               
                //push if no errorrs
                    const dbAccountDetails = firebase.database().ref("services") 
                  
                    dbAccountDetails.orderByKey().equalTo(service).once('value').then(snapshot => { 
                        if (snapshot.exists()) {
                            const dbRef = firebase.database().ref("services/" + service);
                            
                            dbRef.orderByChild('requirement').equalTo(requirementInput.toLowerCase()).once('value').then(snapshot => {
                                if (snapshot.exists()) {
                                    setRequirementState(true)
                                    setRequirementError("Requirement already exists. Try a new one.")
                                    setAlertStatus(true)
                                    setFeedbackVariant("warning")
                                    setAlertMessage("Requirement already exist. Please enter a new one in the text field.")
                                    return true

                                } else {
                                    pushState();
                                    setUpdate(!update);
                                }
                           
                             })
                        } else {
                            pushState();
                            setUpdate(!update);

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
        setEditRequirementInput(title);
        setActivePost(title);
        setActiveKey(key);

    }
    function handleOpenDeleteModal(title, key) {
        setOpenDeleteModal(true);
        setActivePost(title);
        setActiveKey(key);

    }
    function handleCLoseDeleteModal() {
        setOpenDeleteModal(false)
    }
    function handleEdit() {
        
         if (editRequirementInput.length < 3) {
                setAlertStatus(true)
                setFeedbackVariant("error")
                setAlertMessage("Ooops! Seems like you are forgetting to fill all the entries with proper phrases.")
                setEditRequirementState(true)
                setEditRequirementError("Please input a phrase. 2 to 3 words")
        } else {
                setEditRequirementState(false)
                setEditRequirementError("")
            if (editRequirementInput === activePost) {
                setAlertStatus(true)
                setFeedbackVariant("error")
                setAlertMessage("Oops you don't seem to change anything, kindly check it again. Thankyou")
                setEditRequirementState(true)
                setEditRequirementError("No changes found")
                
            } else {
                    const dbAccountDetails = firebase.database().ref("services") 
                     dbAccountDetails.orderByKey().equalTo(service).once('value').then(snapshot => { 
                        if (snapshot.exists()) {
                            const dbRef = firebase.database().ref("services/" + service);
                            
                            dbRef.orderByChild('requirement').equalTo(editRequirementInput.toLowerCase()).once('value').then(snapshot => {
                                if (snapshot.exists()) {
                                     
                                        setEditRequirementState(true)
                                        setEditRequirementError("Please try a new one.")
                                    setAlertStatus(true)
                                    setFeedbackVariant("error")
                                    setAlertMessage("Requirement already exist. Please enter a new one in the text field.")
                                    return true

                                } else {
                                      const dbRef = firebase.database().ref("account-details/" + service + "/" +activeKey);

                                            const update = {
                                                    requirement: editRequirementInput
                                                }
                                                dbRef.update(update).then(()=>{
                                                    setAlertStatus(true)
                                                    setFeedbackVariant("success")
                                                    setAlertMessage("Success! " + activePost + " post updated")
                                                    setOpenEditModal(false)
                                                })
                                    setUpdate(!update);
                                }
                           
                             })
                        }
                     });
                
                       
                
            }
        }
        setUpdate(!update);
       
       
    }
    function handleDelete(title) {
        const dbRef = firebase.database().ref("services/" + service).child(activeKey);
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
    function serviceConstraints() {
        if (!service) {
            setSelectErrorState(true)
            setSelectError("Select a church service");
        } else {
            setSelectErrorState(false)
            setSelectError("");
        }
         if (!maxCapacity) {
            setMaxErrorState(true)
            setMaxError("Please enter max capacity")
            setEnableConstraingtBtn(false)
        } else if (isNaN(parseInt(maxCapacity,10))) {
            setMaxErrorState(true)
            setMaxError("Please enter Numbers only")
            setEnableConstraingtBtn(false)
        }
        else {
            setMaxErrorState(false)
            setMaxError("")
            setEnableConstraingtBtn(true)
            
        }
        if (!operationDaysFrom) {
            setOperationDaysFromErrorState(true)
            setOperationDayFromError("Please select starting date")
            setEnableConstraingtBtn(false)

        } else {
            setOperationDaysFromErrorState(false)
            setOperationDayFromError("")
            setEnableConstraingtBtn(true)

        }
        if (!operationDaysTo) {
            setOperationDaysToErrorState(true)
            setOperationDayToError("Please select an ending date")
            setEnableConstraingtBtn(false)

        } else {
            setOperationDaysToErrorState(false)
            setOperationDayToError("")
            setEnableConstraingtBtn(true)

        }
        if (!operationDaysFrom) {
            setOperationDaysFromErrorState(true)
            setOperationDayFromError("Please select starting date")
            setEnableConstraingtBtn(false)

        } else {
            setOperationDaysFromErrorState(false)
            setOperationDayFromError("")
            setEnableConstraingtBtn(true)

        }
        if (!timeOpFrom) {
            setTimeOpFromState(true)
            setTimeOpFromError("Please select an opening hours")
            setEnableConstraingtBtn(false)

        } else {
            setTimeOpFromState(false)
            setTimeOpFromError("")
            setEnableConstraingtBtn(true)

        }
        if (!timeOpTo) {
            setTimeOpToState(true)
            setTimeOpToError("Please select closing hours")
            setEnableConstraingtBtn(false)

        } else {
            setTimeOpToState(false)
            setTimeOpToError("")
            setEnableConstraingtBtn(true)

        }
        if (isNaN(parseInt(daysBeforeAppoint, 10))) {
            setDaysBeforeAppointError("Please input numbers only")
            setEnableConstraingtBtn(false)

            setDaysBeforeErrorAppointState(true)
        } else {
            setDaysBeforeCancelError("")
            setDaysBeforeErrorAppointState(false)
            setEnableConstraingtBtn(true)

        }
        if (isNaN(parseInt(daysBeforeCancel, 10))) {
            setDaysBeforeCancelError("Please input numbers only")
            setEnableConstraingtBtn(false)
            setDaysBeforeCancelErrorState(true)
        } else {
            setDaysBeforeCancelError("")
            setDaysBeforeCancelErrorState(false)
  
        }
        if (session === 0) {
            setSessionIntervalErrorState(true)
            setSessionIntervalError("Enter session intervals")
        } else if (!sessionInterval) {
              setSessionIntervalErrorState(true)
             setSessionIntervalError("Enter session intervals")
        } else {
               setSessionIntervalErrorState(false)
               setSessionIntervalError("")
        }
        if (sessionInterval && !session !== 0 && service && !isNaN(parseInt(daysBeforeCancel, 10)) && maxCapacity && !isNaN(parseInt(daysBeforeAppoint, 10)) && timeOpTo && timeOpFrom && operationDaysFrom && maxCapacity && !isNaN(parseInt(maxCapacity,10)))  {
            const dbRef = firebase.database().ref("services/" + service);
            const serviceConstraints = {
                maxCapacity: maxCapacity,
                operationDaysStart: operationDaysFrom,
                operationDaysEnd: operationDaysTo,
                timeOperationStart: timeOpFrom,
                timeOperationEnd: timeOpTo,
                daysBeforeAppointment: daysBeforeAppoint,
                daysBeforeCancel: daysBeforeCancel,
                sessionInterval: session + " " + sessionInterval
            }
            dbRef.update(serviceConstraints).then(() => {
                setAlertStatus(true)
                setFeedbackVariant("success")
                setAlertMessage("Success! service constraints updated")
                setUpdate(!update);

              

            })

        }
             
    }
    function addSession(getter, setter) {
        setter(getter + 1);
    }
    function minusSession(getter, setter) {
        setUpdate(!update)
        if(getter > 0) {
                setter(getter - 1)
        }
      

    }
    return (
        <div>

            <Container className="pad-y-md">
                <div className="title pad-y-sm">
                    <h2>Services</h2>
                    <p>Here you will activate your church's activities and fill them out with requirements. This action will stack up on the generated page.</p>
                </div>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth error={selectErrorState} >
                        <InputLabel id="demo-simple-select-label">Services</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={service}
                            label="Service"
                            onChange={handleChange}
                        >
                            <MenuItem value="Sunday Mass">Sunday Mass</MenuItem>
                            <MenuItem value="Baptism">Baptism</MenuItem>
                            <MenuItem value="Marriage">Marriage</MenuItem>
                            <MenuItem value="Compil">Compil</MenuItem>
                            <MenuItem value="House blessing">House Blessing</MenuItem>
                            <MenuItem value="Car blessing">Car Blessing</MenuItem>
                            <MenuItem value="Burial">Burial</MenuItem>
                        </Select>
                        <FormHelperText>{selectError}</FormHelperText>

                    </FormControl>
                     </Box>
                    <div className="pad-y-sm flex-flow-wrap-start ">
                        <div className="m-r-sm m-y-sm" >
                            
                            <div>
                                <h5><b>Max Capacity</b></h5>
                            </div>
                             <Box sx={{maxWidth:120}}>
                                <TextField type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} error={maxErrorState} helperText={maxError} onChange={e => { setMaxCapacity(e.target.value) }} value={maxCapacity} id="outlined-full-width" fullWidth label="Max capacity" variant="outlined" className="text-input-deafult" />
                            </Box>
                        </div>
                       
                        <div className="m-y-sm">

                            <div>
                                <h5><b>Operation days</b></h5>
                            </div>
                            <div className=" flex-default ">
                                
                                <div>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth error={operationDaysFromErrorState} >
                                            <InputLabel id="demo-simple-select-label">From</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={operationDaysFrom}
                                                label="Service"
                                                onChange={handleOperationDaysFrom}
                                            >
                                                <MenuItem value="0">Sunday </MenuItem>
                                                <MenuItem value="1">Monday</MenuItem>
                                                <MenuItem value="2">Tuesday</MenuItem>
                                                <MenuItem value="3">Wednesday</MenuItem>
                                                <MenuItem value="4">Thursday</MenuItem>
                                                <MenuItem value="5">Friday</MenuItem>
                                                <MenuItem value="6">Saturday</MenuItem>
                                            </Select>
                                            <FormHelperText>{operationDayFromError}</FormHelperText>

                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="pad-x-sm">
                                
                                    
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth error={operationDaysToErrorState} >
                                            <InputLabel id="demo-simple-select-label">To</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={operationDaysTo}
                                                label="Service"
                                                onChange={handleOperationDaysTo}
                                            >
                                                <MenuItem value="0">Sunday </MenuItem>
                                                <MenuItem value="1">Monday</MenuItem>
                                                <MenuItem value="2">Tuesday</MenuItem>
                                                <MenuItem value="3">Wednesday</MenuItem>
                                                <MenuItem value="4">Thursday</MenuItem>
                                                <MenuItem value="5">Friday</MenuItem>
                                                <MenuItem value="6">Saturday</MenuItem>
                                            </Select>
                                            <FormHelperText>{operationDayToError}</FormHelperText>

                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className="m-y-sm ">
                                <div>
                                    <h5><b>Time operations</b></h5>
                                </div>
                            <div className="flex-default">
                                  <div className="m-r-sm">
                                
                                <TextField
                                    error={timeOpFromState}
                                    helperText={timeOpFromError}
                                    onChange={e => { setTimeOpFrom(e.target.value) }}
                                    value = {timeOpFrom}
                                    variant="outlined"
                                    id="time"
                                    label="From"
                                    type="time"
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                />
                            </div>
                            <div className="m-r-sm">
                                
                                 <TextField
                                    error={timeOpToState}
                                    helperText={timeOpToError}
                                    onChange={e => { setTimeOpto(e.target.value) }}
                                    value = {timeOpTo}
                                    variant="outlined"
                                    id="time"
                                    label="To"
                                    type="time"
                                    defaultValue="05:00"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                    sx={{ width: 150 }}
                                />
                            </div>
                            </div>
                          
                        </div>
                        <div className="m-y-sm ">
                                <div>
                                    <h5><b>Sessions Interval</b></h5>
                                </div>
                                <div className="flex-default">
                                    <div className="m-r-sm">
                                    
                                    <div className="flex-default">
                                    <div>
                                        <Tooltip title="subtract">
                                            <IconButton onClick={() => { minusSession(session, setSessions) }}>
                                                <IndeterminateCheckBoxIcon/>
                                            </IconButton>

                                        </Tooltip>
                                    </div>
                                    <div >
                                        {session}
                                    </div>
                                    <div >
                                        <Tooltip title="add">
                                            <IconButton onClick={() => { addSession(session, setSessions) }}>
                                                <AddBoxIcon/>
                                            </IconButton>

                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="m-r-sm">
                                
                                 <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth error={sessionIntervalErrorState} >
                                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sessionInterval}
                                                label="Service"
                                                onChange={(event) => setSessionInterval(event.target.value)}
                                            >
                                                <MenuItem value="minutes">Minutes </MenuItem>
                                                <MenuItem value="hours">Hours</MenuItem>
                                               
                                            </Select>
                                            <FormHelperText>{sessionIntervalError}</FormHelperText>

                                        </FormControl>
                                    </Box>
                            </div>
                            </div>
                          
                        </div>
                                     
                </div>
                    <div className="pad-y-sm flex-flow-wrap-start">
                        <div className="m-y-sm ">
                                    <div>
                                        <h5><b>Appointment Period (in days)</b></h5>
                                    </div>
                                <div className="flex-default">
                                    <div className="m-r-sm">
                                        <TextField type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} error={daysBeforeErrorAppointState} helperText={daysBeforeAppointError} onChange={e => { setDaysAppointBefore(e.target.value) }} value={daysBeforeAppoint} id="outlined-full-width" fullWidth label="Before appointments" variant="outlined" className="text-input-deafult" />
                                    </div>
                                </div>
                            
                            </div>
                            <div className="m-y-sm ">
                                    <div>
                                        <h5><b>Cancellation Period (in days)</b></h5>
                                    </div>
                                <div className="flex-default">
                                    <div className="m-r-sm">
                                        <TextField type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} error={daysBeforeCancelErrorState} helperText={daysBeforeCancelError} onChange={e => { setDaysBeforeCancel(e.target.value) }} value={daysBeforeCancel} id="outlined-full-width" fullWidth label="Before cancellation" variant="outlined" className="text-input-deafult" />
                                    </div>
                                    <div className="grid-place-center">
                                        <Button
                                            onClick={serviceConstraints}
                                            disabled={!daysBeforeCancel}
                                            // id="btn-large-secondary"
                                            variant="outlined"
                                            className="btn-large primary-color "
                                            color="primary"
                                            size="large"
                                        >
                                            Save changes
                                        </Button>
                                    </div>
                                </div>
                            </div> 
                    </div>
                
                <div className="pad-y-sm">
                    <div className="flex-default">
                        <div className="icon-padding">
                            <FavoriteIcon className="icon-set-light" />
                        </div>
                        <div className="pad-x-sm ">
                            <p className="m-b-sm"><b>Steps</b></p>
                        </div>
                    </div>
                    <div className=" flex-default ">
                        <div >
                            <TextField error={requirementErrorState} helperText={requirementError} onChange={e => { setRequirementInput(e.target.value) }} value={requirementInput} id="outlined-full-width" fullWidth label="Enter requirement" variant="outlined" className="text-input-deafult" />
                        </div>
                        <div>
                         <div className="pad-xy-sm">
                            <Button
                                onClick={saveServiceRequirement}
                                disabled={!requirementInput}
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
                  
              
                    
                    <ul className="width-sm-no-margin ul-customized pad-x-md">
                            {serviceArray ? serviceArray.map((data)=> {
                                if (data.requirement) {
                                return (
                                    <li key={data.id} className="full-width">
                                        <div className ="flex-space-between ">   
                                            <div className="">
                                                <p><b>{data.requirement}</b></p>
                                            </div>
                                                    
                                            <div className="flex-default ">
                                                <div className=" cursor-pointer">
                                                    <Tooltip title="Edit">
                                                    <IconButton onClick={()=>{handleOpenModalEdit(data.requirement, data.id)}}>
                                                                <EditIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                </div>
                                                <div className=" cursor-pointer">
                                                    <Tooltip title="Delete">
                                                    <IconButton onClick={() => { handleOpenDeleteModal(data.requirement,data.id)}}>
                                                                <DeleteIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                    )
                                } 
                                return null
                            }): ""
                         }
                    </ul>
                </div>
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
                                    <h2>Edit your requirement</h2>
                                    <p>
                                        Enter your changes in the text 
                                    </p>
                                    <div className="pad-y-sm">
                                        <div>
                                            <TextField error={editRequirementState} helperText={editRequirementError} onChange={e => {setEditRequirementInput(e.target.value)}} value={editRequirementInput}   id="outlined-full-width" fullWidth label="Edit your requirement here" variant="outlined" className="text-input-deafult"/>
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
            </Container>
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

export default Service

