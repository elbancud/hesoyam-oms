import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {useEffect,useState} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Container from "@material-ui/core/Container";
import "../style/style.css";
import firebase from "firebase";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2021, 9, 0),
//         end: new Date(2021, 9, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2021, 9, 7),
//         end: new Date(2021, 9, 7),
//     },
//     {
//         title: "Conference",
//         start: new Date(2021, 9, 20),
//         end: new Date(2021, 9, 23),
//     },
// ];

function CalendarTab() {
const [events, setEvents] = useState([]);
    

useEffect(() => {

   
     const db = firebase.database().ref("events")
        db.once('value', snapshot => {
             const postSnap = snapshot.val();
                const events = [];
            
            for (let id in postSnap) {
                    if (!postSnap.time) {
                        events.push(postSnap[id]);
                    }
                }
                setEvents(events)
        // const events = []
            // snapshot.forEach(snap => {
            //     const data = {
            //         title: snap.val().title,
            //         start: new Date(snap.val().start),
            //         end: new Date(snap.val().end),
            //     }
            //     setEvents([...events, data])
            // });
            })
            
    // db.once('value', snapshot => {
    //     const events = []
    //     const snap = snapshot.val()
    //     for (let id in snap) {
    //         const data = {
    //             title: snap.val().title,
    //             start: new Date(snap.val().start),
    //             end: new Date(snap.val().end),
    //         }
    //         events.push({events, ...data})
    //     }
    //     setEvents(events);
    // })
}, [])

    return (
          <main className=" pad-y-md div align-text-center" >
                    
                    <Container>
                      
                            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, width:"100%"}} />
                    </Container>
        </main>
    );
}

export default CalendarTab;