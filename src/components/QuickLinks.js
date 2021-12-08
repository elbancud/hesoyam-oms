import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import '../style/themes.css'
import '../style/style.css'

export default function MenuListComposition() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
    const [liturgyPage, setLiturgyPage] = useState(false);
    const [staffPage, setStaffPage] = useState(false);
    const [outReachPage, setOutreactPage] = useState(false);
    const [quickLinksPage, setQuickLinksPage] = useState(false);
    const [sacramentsPage, setSacramentsPage] = useState(false);
    const [activeDesign, setActiveDesign] = useState("")

    useEffect(() => {
                    const dbPages = firebase.database().ref("pages")
                    dbPages.once("value").then((snap) => {
                        setLiturgyPage(snap.val().liturgyPage)
                        setStaffPage(snap.val().staffPage)
                        setOutreactPage(snap.val().outReachPage)
                        setQuickLinksPage(snap.val().quickLinkPage)
                        setSacramentsPage(snap.val().sacramentsPage)
                    })
                     const dbTheme = firebase.database().ref("themeChosen")
                        dbTheme.on('value', snap => {
                            setActiveDesign(snap.val().designName)      
                        })
                  
    }, []);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  function livestream() {
        history.push("/livestream")
        handleToggle()
    }
    function lit() {
        history.push("/liturgy")
        handleToggle()
    }
    function outreach() {
        history.push("/outreach")
        handleToggle()
    }
    function staff() {
        history.push("/staff")
        handleToggle()
    }
    function lit() {
        history.push("/liturgy")
        handleToggle()
    }
    function sacrament() {
        history.push("/sacrament")
        handleToggle()
    }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
        <div >
      
    <Stack direction="row" spacing={2}>
   
      <div className={activeDesign === "design1" ? "design1-properties " : activeDesign === "design2 " ? "design2-properties " : "design3-properties "}>
        
        <div  ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle} className = "flex-default font-light" >
                Quick Links
                
                <div className="m-t-sm">
                    <ArrowDropDownIcon/>
                </div>
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
                    
              <Paper  className="position-fixed-top-z-100">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu "
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                                  >
                                                <MenuItem onClick={livestream} id="font-dark">Recorded Livestreams</MenuItem>
                                            {liturgyPage? 
                                                    <MenuItem onClick={lit} id="font-dark">Liturgy & Music</MenuItem> : ""
                                                    
                                            }{outReachPage? 
                                                    <MenuItem onClick={outreach} id="font-dark">Outreach</MenuItem> : ""
                                                
                                            }{staffPage? 
                                                    <MenuItem onClick={staff} id="font-dark">Meet the Stuff</MenuItem> : ""
                                                
                                            }{sacramentsPage? 
                                                <MenuItem onClick={sacrament} id="font-dark">Sacraments</MenuItem> : ""
                                               
                                            }
                    
                 
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
          </Stack>
    </div>
  );
}
