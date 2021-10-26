import React, { useState, useEffect } from 'react'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "../style/style.css";
import firebase from 'firebase';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

function SeatArrangement() {

    const [seatArray, setSeatArray] = useState();


    //get 

    useEffect(() => {
        const dbGrp = firebase.database().ref("seat-arrangement")

        dbGrp.once('value').then((snapshot) => {
            const snap = snapshot.val();
            const seatArray = [];
            for (let id in snap) {
                seatArray.push({ id, ...snap[id] })
            }
            setSeatArray(seatArray);

        })

    }, [])
    function reserveSeat(parentIndex, parent, row, col) {
        const parentId = seatArray[parentIndex].id;
        const rowId = Object.keys(seatArray[parentIndex])[row]
        console.log(col)
        console.log(seatArray)
        const db = firebase.database().ref("seat-arrangement/" + parentId + "/" + rowId + "/" + col)
        db.update({ reserved: true })

    }
    return (
        <div>
            <Container className="">

                <div className="pad-y-sm">
                    <div className="flex-flow-wrap-x">
                        <div className="">
                            <Tooltip title="altar">
                                <Button variant="outlined" disabled={true} id="altar" disableElevation>
                                    Altar
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="flex-flow-wrap-x ">
                        {seatArray ? seatArray.map((data, parentIndex) => {
                            return (
                                <div className="m-y-md" key={data.id}>
                                    {
                                        Object.values(data).map((key, indexLvl1) => {
                                            if (typeof (key) === "object") {
                                                return (
                                                    <div className="flex-default" >
                                                        {Object.values(key).map((child, index) => {
                                                            if (child.reserved === true) {
                                                                return (
                                                                    <div className="seat-div" key={child}>
                                                                        <Tooltip title="Click for action">

                                                                            <Button variant="contained" id="reserved" disableElevation>
                                                                                {index + 1}
                                                                            </Button>
                                                                        </Tooltip>
                                                                    </div>
                                                                )
                                                            } else {

                                                                return (
                                                                    <div className="seat-div">
                                                                        <Tooltip title="Click for action">

                                                                            <Button onClick={() => { reserveSeat(parentIndex, data.id, indexLvl1, index) }} variant="contained" id="available" disableElevation>
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
