import WebIcon from '@material-ui/icons/Web';
import "../style/style.css";
import DynamicCalendar from './DynamicCalendar';
import Container from "@material-ui/core/Container";
import EventNoteIcon from '@mui/icons-material/EventNote';
import SeatPlan from './SeatPlan';
import design1 from '../images/Design1-BoldType.JPG';
import design2 from '../images/Design2-SerifFlex.JPG';
import design3 from '../images/Design3-DarkModeSerif.JPG';
import React, {useState, useEffect} from 'react'
import firebase from '../firebase';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ImageIcon from '@mui/icons-material/Image';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Skeleton from '@mui/material/Skeleton';
import SeatMinified from './SeatMinified';


function Dashboard() {

    const [qrArray, setQrArray] = useState('')
    const [activatePage, setActivatePage] = useState("");
    const [podcastArray, setPodcastArray] = useState()

    useEffect(() => {
            const dbRefWithKey = firebase.database().ref("themeChosen");
                dbRefWithKey.on("value", snap => {
                    setActivatePage(snap.val().designName);
                 
                })
        
            const dbRef = firebase.database().ref("podcast-audios-upload");
            dbRef.once("value").then(function (snapshot) {
                    const postSnap = snapshot.val();
                    const podcastArray = [];
                    for (let id in postSnap) {
                        podcastArray.push({id, ...postSnap[id]});
                    }
                    setPodcastArray(podcastArray)
            });
        
            const dbQR= firebase.database().ref('qr-e-wallet')
                      dbQR.once("value")
                          .then(function (snapshot) {
                          const snap = snapshot.val().eWalletLink;
                              setQrArray(snap)
            });
                
    }, []);
    
    return (
        <Container  >
            <main className=" pad-y-md  " >

                    {/* <div className="pad-y-md ">
                    </div>
                    <div className="title">
                        <h2>Dashboard</h2>
                    </div> */}
                     <div className="title m-t-md ">
                            <h2>Dashboard</h2>
                        </div>
                    <div>
                        <div className="m-y-md flex-default-center-y pad-x-sm m-b-sm">
                                        <EventNoteIcon className="m-r-sm"/>
                                        <h4 >Events</h4>
                        </div>
                        <div className="box  pad-xy-sm">
                            
                            <DynamicCalendar />
                        </div>
                        
                    </div>
                    
                    <div className="full-width flex-no-wrap pad-y-md flex-evenly">
                        <div className="m-y-sm">
                            <div className="flex-default-center-y pad-x-sm m-b-sm">
                                        <WebIcon className="m-r-sm"/>
                                        <h4 >Website</h4>
                            </div>
                            <div className="box box-default-width m-x-md theme-img ">
                                    <img src={activatePage === "design1"? design1: activatePage === "design2" ? design2: design3} alt = "pages"></img>
                                    <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                        <div className="flex-space-between pad-y-sm">
                                        <p>{activatePage === "design1" ? "Bold and Loud": ""} Activated page</p>
                                        
                                        </div>
                                    </div>
                            </div>
                            
                        </div>
                        
                        <div className="m-xy-sm">
                                <div className="flex-default-center-y pad-x-sm m-b-sm">
                                    <LibraryMusicIcon className="m-r-sm"/>
                                    <h4 >Podcasts</h4>
                                </div>
                                <div className="box box-default-width box-fixed-height ">
                                        <div className="flex-space-between ">
                                            {podcastArray ? podcastArray.map((data,index)=> {
                                                if(index === 0) {
                                                return (
                                                                <div className=" font-light" key={data.audioTitle}>
                                                                    <div className="pad-y-md box-default-width  position-relative under-garment-gradient">
                                                                                <div className="pad-xy-sm align-text-center font-light ">
                                                                                        <h3 className="font-light">{data.audioTitle}</h3>
                                                                                </div>
                                                                    </div>
                                                                    <div>
                                                                        <AudioPlayer
                                                                            id="full-width"
                                                                            src={data.audioLink}
                                                                        />
                                                                    
                                                                    </div>    
                                                                </div>
                                                            
                                                )}
                                            }) : <Skeleton animation="wave"  variant="rectangular" width={500} height={250} />}
                                        
                                        </div>
                                </div>        
                                
                            </div>
                            
                            <div className="m-y-sm box-default-width-force">
                                <div className="flex-default-center-y pad-x-sm m-b-sm">
                                            <QrCode2Icon className="m-r-sm"/>
                                            <h4 >E-wallet QR</h4>
                                </div>
                                <div className="box  box-fixed-height  ">
                                        <div className="flex-default-center-x theme-img ">
                                            {qrArray? <img src={qrArray} alt="qr"/> : <Skeleton animation="wave"  variant="rectangular" width={500} height={250} />}
                                            
                                        </div>
                                        
                                </div>
                            </div>
                            
                            
                            
                    </div>
                    
                    <div>
                        <div className="m-y-md flex-default-center-y pad-x-sm m-b-sm">
                                        <EventNoteIcon className="m-r-sm"/>
                                        <h4 >Seat plan</h4>
                        </div>
                        <div className="box  pad-xy-sm">
                            
                            <SeatMinified />
                        </div>
                        
                    </div>
                </main>
        </Container>
    )
}

export default Dashboard
