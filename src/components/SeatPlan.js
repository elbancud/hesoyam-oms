import React, { useState, useEffect } from 'react'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import firebase from 'firebase';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
function SeatArrangement() {
   
    const [seatArray, setSeatArray] = useState();

    
    //get 
 
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

    }, [])
    


    return (
        <div>
            <Container className="pad-y-md">
         
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
                                                                                        
                                                                                        <Button onClick={() => { console.log(key) }} variant="contained" id="available" disableElevation>
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
                                    
                                </div>
                                
                            )

                            }) : "No registered rows, groups , and columns yet "}
                    </div>
                </div>
            </Container>
        
        </div>
    )
}

export default SeatArrangement
