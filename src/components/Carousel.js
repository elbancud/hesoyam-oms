import React, {useState, useEffect} from 'react'
import ItemsCarousel from 'react-items-carousel';
import Container from "@material-ui/core/Container";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Paper from '@mui/material/Paper';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import "../style/style.css";
import "../style/themes.css"

function Carousel() {
    const [announcementArray, setAnnouncementArray] = useState();
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {

        const dbRef = firebase.database().ref("announcements" );
        dbRef.once("value")
            .then(function (snapshot) {
                const postSnap = snapshot.val();
                const announcementArray = [];
                for (let id in postSnap) {
                    announcementArray.push({id, ...postSnap[id]});
                }
                setAnnouncementArray(announcementArray)
            });
    }, [])
  
    return (
        <div>
            <Container>
                <div style={{ padding: `0 40px` }}>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={1}
                        gutter={20}
                        leftChevron={<Tooltip title="previous">
                                                <IconButton >
                                                             <ArrowLeftIcon />
                                                </IconButton>
                                                </Tooltip>}
                        rightChevron={<Tooltip title="next">
                                                <IconButton >
                                                             <ArrowRightIcon />
                                                </IconButton>
                                                </Tooltip>}
                        outsideChevron
                        chevronWidth={40}
                    >
                          {announcementArray ? announcementArray.map((data)=> {
                             if (data.announcementTitle) {
                                 return (
                                 <div key={data.id} className="box m-xy-sm">
                                    <div className ="flex-space-between ">   
                                        <div className="box-default-width">
                                            <div className="  pad-xy-sm text-custom-width ">
                                                <div >
                                                    <b><h2>{data.announcementTitle}</h2></b>
                                                </div>
                                                <div className="subtitle">
                                                    <p>{data.announcementDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                 </div>
                                )
                            }
                        }) : "No anouncements yet"}
                    
                    </ItemsCarousel>
                </div>
            </Container>
        </div>
    )
}

export default Carousel
