import React from 'react'
import WebIcon from '@material-ui/icons/Web';
import "../style/style.css";

function Dashboard() {
    return (
        <div>
            <main className="m-x-sm pad-y-md " >
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
                    <div>
                        <div className="flex-no-wrap pad-y-sm">
                            <div className="box  pad-xy-sm flex-default m-xy-sm ">
                                <p></p>
                            </div>
                            <div className="box box-default-width pad-xy-sm flex-default m-xy-sm">
                            
                            </div>
                        </div>
                    </div>
                </main>
        </div>
    )
}

export default Dashboard
