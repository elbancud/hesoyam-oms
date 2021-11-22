import React, {useEffect, useState} from 'react'
import { Route , Redirect} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import firebase from "../firebase"

export default function PrivateRouteDesign({ component: Component, ...rest }) {
    const [activeDesign, setActiveDesign] = useState("")

    useEffect(() => {
     
            const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
              
                    
    }, []);
    return (
           <Route
                {...rest}
                render={props => {
                    return activeDesign === "design1" ?<Redirect to="/design1" /> : activeDesign === "design2" ? <Redirect to="/design2" /> : activeDesign === "design3"? <Redirect to="/design3" />  : "" 
                }}
    ></Route>
    )
}
