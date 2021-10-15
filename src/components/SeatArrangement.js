import React, { useState, useEffect } from 'react'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import IconButton from '@mui/material/IconButton';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';

function SeatArrangement() {
   
    //variables

    const [alertStatus, setAlertStatus] = useState(false);
    const [feedbackVariant, setFeedbackVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [seatColumn, setSeatColumn] = useState([])
    const [seatArray, setSeatArray] = useState();
    const [groupNumber, setGroupNumber] = useState(0);
    const [columnNumber, setColumnNumber] = useState(0);
    const [rowNumber, setRowNumber] = useState(0);
    const [update, setUpdate] = useState(false);
    
    
    //get 
     
    const saveServiceRequirement = (event) => {
        if (groupNumber === 0 || rowNumber === 0 || columnNumber === 0) {
                setAlertStatus(true)
                setFeedbackVariant("error")
                setAlertMessage("Ooops! you forgot to input rows, columns, and group numbers.")
        } else {
            let group = parseInt(groupNumber -1, 10);
            while (group >= 0) {
                const dbGrp = firebase.database().ref("seat-arrangement/")
              
                const pushedData = dbGrp.push()
                const key = pushedData.getKey()
                let rowNumberCounter = parseInt(rowNumber - 1, 10)
                while (rowNumberCounter >= 0) {
                    firebase.database().ref("seat-arrangement/" + key).push(seatColumn).then(() => {
                        setAlertStatus(true)
                        setFeedbackVariant("success")
                        setAlertMessage("Success! seat arrangement updated")
                    })
                    rowNumberCounter--
                }
                    group--
                }
                
            }
            
        setUpdate(!update)
        
                        
    }
    function handleOpenDeleteModal(id) {
        const dbGrp = firebase.database().ref("seat-arrangement/" + id)
        dbGrp.remove().then(() => {
                        setAlertStatus(true)
                        setFeedbackVariant("success")
                        setAlertMessage("Success! group deleted. You can always create a new one.")
        })
        setUpdate(!update)

    }
    useEffect(() => {
        const dbGrp = firebase.database().ref("seat-arrangement")
        
        dbGrp.once('value').then((snapshot) => {
             const snap = snapshot.val();
            const seatArray = [];
            for (let id in snap) {
                seatArray.push({id, ...snap[id]})
            }
            setSeatArray(seatArray);

        })

    }, [update])
    

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertStatus(false);
    };
    function registerSeatAdd(getter, setter, variable) {
        setter(getter + 1);
        if (variable === "columnNumber") {
            seatColumn.push({ reserved: false });
        }
        setUpdate(!update)
    }
    function registerSeatMinus(getter, setter) {
        setUpdate(!update)
        if(getter > 0) {
                setter(getter - 1)
        }
        if (getter === rowNumber) {
            seatColumn.pop()
        }
        setUpdate(!update)

    }
    return (
        <div>
            <Container className="pad-y-md">
                <div className="title pad-y-sm">
                    <h2>Seat Management</h2>
                    <p>Shown here are rows and columns of your church. You can customize the column, rows, and groups of seat plan mirrored to the church's arrangements. </p>
                </div>
                <div className="title pad-y-sm">
                    <p>Press plus sign to increase groups, columns, and rows</p>
                    <div className="pad-y-sm flex-flow-wrap-start">
                        <div>
                            <div className="flex-default m-l-sm">
                                <Grid4x4Icon fontSize="small"  color="disabled"className="m-r-sm"/>
                                <h5 className="text-no-margin"><b>Groups</b></h5>

                            </div>
                            <div className="flex-default m-r-md">
                                <div>
                                    <Tooltip title="subtract">
                                        <IconButton onClick={() => { registerSeatMinus(groupNumber, setGroupNumber) }}>
                                            <IndeterminateCheckBoxIcon/>
                                        </IconButton>

                                    </Tooltip>
                                </div>
                                <div >
                                    {groupNumber}
                                </div>
                                <div >
                                    <Tooltip title="add">
                                        <IconButton onClick={() => { registerSeatAdd(groupNumber, setGroupNumber, "groupNumber") }}>

                                            <AddBoxIcon/>
                                        </IconButton>

                                    </Tooltip>
                                </div>
                            </div>

                        </div>
                        <div className="pad-x-sm m-r-md">
                            <div className="flex-default m-l-sm">
                                <ViewWeekIcon fontSize="small"  color="disabled"className="m-r-sm"/>
                                <h5 className="text-no-margin"><b>Column</b></h5>

                            </div>
                            <div className="flex-default">
                                <div>
                                    <Tooltip title="subtract">
                                        <IconButton onClick={() => { registerSeatMinus(columnNumber, setColumnNumber) }}>
                                            <IndeterminateCheckBoxIcon/>
                                        </IconButton>

                                    </Tooltip>
                                </div>
                                <div >
                                    {columnNumber}
                                </div>
                                <div >
                                    <Tooltip title="add">
                                        <IconButton onClick={() => { registerSeatAdd(columnNumber, setColumnNumber, "columnNumber") }}>
                                            <AddBoxIcon/>
                                        </IconButton>

                                    </Tooltip>
                                </div>
                            </div>

                        </div>
                        <div >
                            <div className="flex-default m-l-sm">
                                <ViewStreamIcon fontSize="small" color="disabled" className="m-r-sm"/>
                                <h5 className="text-no-margin"><b>Rows</b></h5>
                            </div>
                            <div className="flex-default">
                                <div>
                                    <Tooltip title="subtract">
                                        <IconButton onClick={() => { registerSeatMinus(rowNumber, setRowNumber) }}>
                                            <IndeterminateCheckBoxIcon/>
                                        </IconButton>

                                    </Tooltip>
                                </div>
                                <div >
                                    {rowNumber}
                                </div>
                                <div className="m-r-md">
                                    <Tooltip title="add">
                                        <IconButton onClick={() => { registerSeatAdd(rowNumber, setRowNumber, "rowNumber") }}>

                                            <AddBoxIcon/>
                                        </IconButton>

                                    </Tooltip>
                                </div>
                                <div >
                                    <Button
                                                    onClick={saveServiceRequirement}
                                                    variant="contained"
                                                    className="btn-large primary-color"
                                                    color="secondary"
                                                    size="small"
                                                    id ="btn-default-primary"
                                                >
                                                    save 
                                    </Button>
                                </div>
                            </div>
                        
                        </div>
                      
                    </div>
                </div>
                <div>
                    <h5>Legends</h5>
                    <div className="flex-default">
                        <div className="m-r-sm">
                            <Chip label="Reserved" sx={{bgcolor:"eeeeee", color:"#34344d"}}/>
                        </div>
                        <div className="m-r-sm">
                            <Chip label="Available" sx={{bgcolor:"#26a69a", color:"#fff"}}/>
                        </div>
                    </div>
                </div>
                <div className="pad-y-sm">
                    <div className="flex-flow-wrap-x">
                        <div className="">
                            <Tooltip title="altar">
                                    <Button variant="outlined" disabled="true" id="altar" disableElevation>
                                            Altar
                                    </Button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="flex-flow-wrap-x ">
                        {seatArray ? seatArray.map((data) => {
                            return(
                                <div className="m-xy-lg" key={data.id}>
                                    {
                                            Object.values(data).map(key => {
                                                if (typeof (key) === "object") {
                                                    return (
                                                        <div className="flex-default" >
                                                            {Object.values(key).map((child, index) => {
                                                                    if (child.reserved === true) {
                                                                         return (
                                                                             <div className="seat-div" key={child}>
                                                                                    <Tooltip title="Click for action">
                                                                                        
                                                                                     <Button variant="contained"  id="reserved" disableElevation>
                                                                                                    {index + 1}
                                                                                                </Button>
                                                                                    </Tooltip>
                                                                                </div> 
                                                                        )
                                                                    } else {
                                                                            return (
                                                                                <div className="seat-div">
                                                                                    <Tooltip title="Click for action">
                                                                                        
                                                                                            <Button onClick={() => { alert(key) }} variant="contained" id="available" disableElevation>
                                                                                                    {index + 1}
                                                                                                </Button>
                                                                                    </Tooltip>
                                                                                </div> 
                                                                            )
                                                                    }
                                                                    
                                                                
                                                                })
                                                            }

                                                        </div>
                                                    )
                                                } 
                                                
                                        })
                                    }
                                    <div className="flex-flow-wrap-x">
                                        <div className="">
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => { handleOpenDeleteModal(data.id)}}>
                                                             <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                                
                            )

                            }) : "No registered rows, groups , and columns yet "}
                    </div>
                </div>
            </Container>
                 {feedbackVariant === "success"? <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar> :
            feedbackVariant === "warning"?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning">
                    {alertMessage}
                </Alert>
              </Snackbar> :
             <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertStatus} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                   {alertMessage}
                </Alert>
            </Snackbar>
            }
        </div>
    )
}

export default SeatArrangement
