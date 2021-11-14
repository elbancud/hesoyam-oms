
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Container from "@material-ui/core/Container";
import "../style/style.css";
import DynamicCalendar from './DynamicCalendar';


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