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


function PageTab() {
    // const { currentUser, key } = useAuth();
    const history = useHistory();
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [designPage, setDesignPage] = useState("");
    // const [openModal, setOpenModal] = useState(false);
    
    // const [webSizeCustom, setWebSizeCustom] = useState("");
    
    const [activatePage, setActivatePage] = useState("");
    const [customizeTheme, setCustomizeTheme] = useState(false);
      useEffect(() => {
            const dbRefWithKey = firebase.database().ref("themeChosen");
                dbRefWithKey.on("value", snap => {
                    setActivatePage(snap.val().designName);
                 
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

    }
    return (
        <div>
            <Container>

           <div className={customizeTheme? "on-customize-display-none " : ""}>
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

        </div>
        
    )
}

export default PageTab
