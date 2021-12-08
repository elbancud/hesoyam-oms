import React, {useState, useEffect} from 'react'
import design1 from '../images/Design1-BoldType.JPG';
import design2 from '../images/Design2-SerifFlex.JPG';
import design3 from '../images/Design3-DarkModeSerif.JPG';
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

import Design1 from './Design1';
import Design2 from './Design2';
import Design3 from './Design3';

import firebase from '../firebase';
import EditIcon from '@material-ui/icons/Edit';
import AccordionSideTab from './AccordionSideTab';
import Container from "@material-ui/core/Container";
import ForwardIcon from '@mui/icons-material/Forward';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Switch from '@material-ui/core/Switch';
import AccordionLiturgy from './AccordionLiturgy';
import StaffAccordion from './StaffAccordion';
import OutreachAccordion from './OutreachAccordion'
import AccordionSacrament from './AccordionSacrament';


function PageTab() {
    // const { currentUser, key } = useAuth();
    const history = useHistory();
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [designPage, setDesignPage] = useState("");
    // const [openModal, setOpenModal] = useState(false);
    
    // const [webSizeCustom, setWebSizeCustom] = useState("");
    
    const [activatePage, setActivatePage] = useState("");
    const [customizeTheme, setCustomizeTheme] = useState(false);

    const [liturgySwitch, setLiturgySwitch] = useState(false);
    const [staffSwitch, setStaffSwitch] = useState(false);
    const [outreachSwitch, setOutreactSwitch] = useState(false);
    const [sacramentsSwitch, setSacramentsSwitch] = useState(false);

    const [liturgyBtn, setLiturgyBtn] = useState(false);
    const [staffBtn, setStaffBtn] = useState(false);
    const [outreachBtn, setOutreactBtn] = useState(false);
    const [quickLinksBtn, setQuickLinksBtn] = useState(false);
    const [sacramentsBtn, setSacramentsBtn] = useState(false);
      useEffect(() => {
            const dbRefWithKey = firebase.database().ref("themeChosen");
                dbRefWithKey.on("value", snap => {
                    setActivatePage(snap.val().designName);
                 
                })
          
          const dbPages = firebase.database().ref("pages")
          dbPages.once("value").then(snap => {
              setLiturgySwitch(snap.val().liturgyPage)
              setStaffSwitch(snap.val().staffPage)
              setOutreactSwitch(snap.val().outReachPage)
              setSacramentsSwitch(snap.val().sacramentsPage)
          })
                
     }, []);
    
    function redirectToGenWeb() {
        history.push("/" + activatePage)
    }
    function handleCustomize() {
        setCustomizeTheme(true);
    }
    function closeAccordion() {
        setCustomizeTheme(false);
        setLiturgyBtn(false)
        setStaffBtn(false)
        setOutreactBtn(false)
        setQuickLinksBtn(false)
        setSacramentsBtn(false)

    }
    function switchTab(tab) {
        const db = firebase.database().ref("pages");
        if (tab === "liturgy") {
            db.update({ liturgyPage: !liturgySwitch })
            
        } else if (tab === "staff") {
            db.update({ staffPage: !staffSwitch })
            
        } else if (tab === "outreach") {
            db.update({outReachPage: !outreachSwitch})
            
        } else if (tab === "sacrament") {
            db.update({sacramentsPage: !sacramentsSwitch})
        }
    }
    return (
        <div>
            <Container>

           <div className={customizeTheme || liturgyBtn || outreachBtn || staffBtn || quickLinksBtn || sacramentsBtn ? "on-customize-display-none " : ""}>
            <main className="m-x-sm pad-y-md " >
                 
                    <div className="title pad-y-sm">
                        <h2>Activated pages</h2>
                        <p> Listed here are your activated themes, you can now start customizing them to your preferences.</p>
                    </div>
                        <main className="pad-y-sm flex-no-wrap ">
                            <div >
                                <Button
                                onClick={redirectToGenWeb}
                                className="btn-large primary-color full-width"
                                color="primary"
                                size="large"
                                type="submit"
                                >
                                visit website
                                <ForwardIcon/>
                                </Button>
                            </div>
                            
                        </main>
                    <div className=" flex-no-wrap ">
                        <div className={!activatePage ? "display-none": "display-block"}>
                            <div className="box box-default-width m-xy-md theme-img">
                                <img src={activatePage === "design1"? design1: activatePage === "design2" ? design2: design3} alt = "pages"></img>
                                <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                    <div className="flex-space-between pad-y-sm">
                                    <p>{activatePage === "design1" ? "Bold and Loud": ""} (Landingpage)</p>
                                        <Button
                                                onClick = {handleCustomize}
                                                className="btn-large primary-color"
                                                color="secondary"
                                                size="large"
                                        >
                                        <EditIcon />
                                        
                                        </Button>
                                    
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        <div className={!activatePage ? "display-block": "display-none"}>
                            "no theme selected yet"

                        </div>
                    </div>
                    
                 
            </main>
                        <div className="title pad-y-sm">
                            <b><p> Other pages</p></b>
                        </div> 
                    <div className=" flex-no-wrap  ">
                        
                        <div className="box box-default-width-sm  m-xy-md theme-img">
                             <img src="https://media.istockphoto.com/photos/table-with-guitar-crosses-bible-and-sheet-music-picture-id1304117146?b=1&k=20&m=1304117146&s=170667a&w=0&h=vPyy_1hfs_hIur7S02oRsMHB81RW5KAVSPfcgOgL0BM=" alt ="design 3"></img>
                             <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                <div className="flex-space-between pad-y-sm">
                                    <p>Liturgy & Music</p>
                                        <div className="flex-space-between">
                                        <Switch color = "primary" checked={liturgySwitch} onChange={event => { setLiturgySwitch(event.target.checked); switchTab("liturgy")}} />
                                            <div className={!liturgySwitch ? "on-customize-display-none " : ""}>
                                                <Button
                                                        onClick = {()=> {setLiturgyBtn(true)}}
                                                        className="btn-large primary-color"
                                                        color="secondary"
                                                        size="large"
                                                >
                                                <EditIcon />
                                                
                                                </Button>
                                            
                                              </div>
                                            
                                        </div>

                                </div>
                            </div>  
                        </div>
                        <div className="box box-default-width-sm  m-xy-md theme-img">
                             <img src="https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt ="design 3"></img>
                             <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                <div className="flex-space-between pad-y-sm">
                                    <p>Outreach</p>
                                    
                                    <div className="flex-space-between">
                                        <Switch  color = "primary"checked={outreachSwitch} onChange={event => { setOutreactSwitch(event.target.checked);switchTab("outreach") }} />
                                            <div className={!outreachSwitch ? "on-customize-display-none " : ""}>
                                                <Button
                                                        onClick = {()=> {setOutreactBtn(true)}}
                                                        className="btn-large primary-color"
                                                        color="secondary"
                                                        size="large"
                                                >
                                                <EditIcon />
                                                
                                                </Button>
                                            
                                              </div>
                                            
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div className="box box-default-width-sm  m-xy-md theme-img">
                             <img src="https://images.unsplash.com/photo-1554623301-7ab68a2a30e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt ="design 3"></img>
                             <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                <div className="flex-space-between pad-y-sm">
                                    <p>Sacraments</p>
                                    
                                    <div className="flex-space-between">
                                        <Switch color = "primary" checked={sacramentsSwitch} onChange={event => { setSacramentsSwitch(event.target.checked);switchTab("sacrament") }} />
                                            <div className={!sacramentsSwitch ? "on-customize-display-none " : ""}>
                                                <Button
                                                        onClick = {()=> {setSacramentsBtn(true)}}
                                                        className="btn-large primary-color"
                                                        color="secondary"
                                                        size="large"
                                                >
                                                <EditIcon />
                                                
                                                </Button>
                                            
                                              </div>
                                            
                                        </div>
                                </div>
                            </div>  
                        </div>
                        <div className="box box-default-width-sm  m-xy-md theme-img">
                             <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt ="design 3"></img>
                             <div className="modal-footer plain-white-color-bg  pad-x-sm ">
                                <div className="flex-space-between pad-y-sm">
                                    <p>Staff</p>
                                    
                                    <div className="flex-space-between">
                                        <Switch  color = "primary"checked={staffSwitch} onChange={event => { setStaffSwitch(event.target.checked); switchTab("staff") }} />
                                            <div className={!staffSwitch ? "on-customize-display-none " : ""}>
                                                <Button
                                                        onClick = {()=>{setStaffBtn(true)}}
                                                        className="btn-large primary-color"
                                                        color="secondary"
                                                        size="large"
                                                >
                                                <EditIcon />
                                                
                                                </Button>
                                            
                                              </div>
                                            
                                        </div>
                                </div>
                            </div>  
                        </div>
                    </div>
            </div>
            </Container>
            <main className={customizeTheme ? "display-block" : "display-none"}>
                <div className="flex-flow-wrap-x pad-x-sm">
                    <div className="position-relative m-y-sm">
                        <div className="  ">
                            <div className="position-absolute accordion-btn ">
                                <Button
                                    className="btn-large primary-color"
                                    color="default"
                                    size="large"
                                    onClick={closeAccordion}
                                >
                                    <HighlightOffIcon />
                                </Button>
                            </div>
                            <AccordionSideTab/>
                        </div>
                    </div>
                    <Container>
                        <div>
                            {activatePage === "design1"? <Design1/> : activatePage === "design2"? <Design2/> : <Design3/>}
                        </div>

                    </Container>
                </div>
            </main>
            <main className={liturgyBtn ? "display-block" : "display-none"}>
                <div className="flex-flow-wrap-x pad-x-sm">
                    <div className="position-relative m-y-sm">
                        <div className="  ">
                            <div className="position-absolute accordion-btn ">
                                <Button
                                    className="btn-large primary-color"
                                    color="default"
                                    size="large"
                                    onClick={closeAccordion}
                                >
                                    <HighlightOffIcon />
                                </Button>
                            </div>
                            <AccordionLiturgy/>
                        </div>
                    </div>
                    <Container>
                        <div>
                            {activatePage === "design1"? <Design1/> : activatePage === "design2"? <Design2/> : <Design3/>}
                        </div>

                    </Container>
                </div>
            </main>
            <main className={staffBtn ? "display-block" : "display-none"}>
                <div className="flex-flow-wrap-x pad-x-sm">
                    <div className="position-relative m-y-sm">
                        <div className="  ">
                            <div className="position-absolute accordion-btn ">
                                <Button
                                    className="btn-large primary-color"
                                    color="default"
                                    size="large"
                                    onClick={closeAccordion}
                                >
                                    <HighlightOffIcon />
                                </Button>
                            </div>
                            <StaffAccordion/>
                        </div>
                    </div>
                    <Container>
                        <div>
                            {activatePage === "design1"? <Design1/> : activatePage === "design2"? <Design2/> : <Design3/>}
                        </div>

                    </Container>
                </div>
            </main>
            <main className={outreachBtn ? "display-block" : "display-none"}>
                <div className="flex-flow-wrap-x pad-x-sm">
                    <div className="position-relative m-y-sm">
                        <div className="  ">
                            <div className="position-absolute accordion-btn ">
                                <Button
                                    className="btn-large primary-color"
                                    color="default"
                                    size="large"
                                    onClick={closeAccordion}
                                >
                                    <HighlightOffIcon />
                                </Button>
                            </div>
                            <OutreachAccordion/>
                        </div>
                    </div>
                    <Container>
                        <div>
                            {activatePage === "design1"? <Design1/> : activatePage === "design2"? <Design2/> : <Design3/>}
                        </div>

                    </Container>
                </div>
            </main>
            
            <main className={sacramentsBtn ? "display-block" : "display-none"}>
                <div className="flex-flow-wrap-x pad-x-sm">
                    <div className="position-relative m-y-sm">
                        <div className="  ">
                            <div className="position-absolute accordion-btn ">
                                <Button
                                    className="btn-large primary-color"
                                    color="default"
                                    size="large"
                                    onClick={closeAccordion}
                                >
                                    <HighlightOffIcon />
                                </Button>
                            </div>
                            <AccordionSacrament/>
                        </div>
                    </div>
                    <Container>
                        <div>
                            {activatePage === "design1"? <Design1/> : activatePage === "design2"? <Design2/> : <Design3/>}
                        </div>

                    </Container>
                </div>
            </main>
        </div>
        
    )
}

export default PageTab
