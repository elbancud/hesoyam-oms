import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Container from "@material-ui/core/Container";
import "../style/style.css";
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
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
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
                            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, width:"100%"}} />
                    </Container>
        </main>
    );
}

export default CalendarTab;