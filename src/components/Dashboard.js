import React from 'react'
import WebIcon from '@material-ui/icons/Web';
import "../style/style.css";
import DynamicCalendar from './DynamicCalendar';
import Container from "@material-ui/core/Container";

function Dashboard() {
    return (
        <Container  >
            <main >
                    <div className="pad-y-md ">
                    </div>
                    <div className="title">
                        <h2>Dashboard</h2>
                    </div>
                    <div className="flex-no-wrap">
                        <div className="box box-default-width pad-xy-sm flex-default m-xy-sm">
                            <div className="pad-x-sm">
                                <WebIcon/>
                            </div>
                            <div className="subtitle">
                                <p>Web Pages</p>
                            </div>
                        </div>
                        <div className="box box-default-width pad-xy-sm flex-default m-xy-sm">
                            <div className="pad-x-sm">
                                <WebIcon/>
                            </div>
                            <div className="subtitle">
                                <p>Reserved seats</p>
                            </div>
                        </div>
                        <div className="box box-default-width pad-xy-sm flex-default m-xy-sm">
                            <div className="pad-x-sm">
                                <WebIcon/>
                            </div>
                            <div className="subtitle">
                                <p>Booked services</p>
                            </div>
                        </div>
                        <div className="box box-default-width pad-xy-sm flex-default m-xy-sm">
                            <div className="pad-x-sm">
                                <WebIcon/>
                            </div>
                            <div className="subtitle">
                                <p>Reports</p>
                            </div>
                        </div>
                        <div className="box box-default-width pad-xy-sm flex-default m-xy-sm">
                                <div className="pad-x-sm">
                                    <WebIcon/>
                                </div>
                                <div className="subtitle">
                                    <p>Reports</p>
                                </div>
                        </div>
                        <div className="box box-default-width pad-xy-sm flex-default m-xy-sm">
                            <div className="pad-x-sm">
                                <WebIcon/>
                            </div>
                            <div className="subtitle">
                                <p>Reports</p>
                            </div>
                        </div>
                    </div>
                    <div className="box m-xy-md">
                                <DynamicCalendar />
                    </div>
                </main>
        </Container>
    )
}

export default Dashboard
