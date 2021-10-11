import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Container from "@material-ui/core/Container";
import "../style/style.css";
import DynamicCalendar from './DynamicCalendar';

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

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 9, 0),
        end: new Date(2021, 9, 0),
    },
    {
        title: "Vacation",
        start: new Date(2021, 9, 7),
        end: new Date(2021, 9, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 9, 20),
        end: new Date(2021, 9, 23),
    },
];

function CalendarTab() {

    return (
          <main className=" pad-y-md " >
                    
                    <Container>
                       <div className="title pad-y-sm">
                            <h2>Calendar</h2>
                            <p>Shown in here are the appointed services within the day.</p>
                        </div>
                            <DynamicCalendar/>
                    </Container>
        </main>
    );
}

export default CalendarTab;