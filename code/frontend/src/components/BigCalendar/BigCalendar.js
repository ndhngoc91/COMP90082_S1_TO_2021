import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";
import React from "react";

const localizer = momentLocalizer(moment)

const start = new Date();
const end = new Date().setDate(start.getDate() + 7)

const myEventsList = [
    {
        id: 0,
        title: 'Available',
        allDay: true,
        start: start,
        end: end
    }
];

const BigCalendar = () => {
    return <Calendar
        localizer={localizer}
        events={myEventsList}
        views={[Views.MONTH, Views.WEEK]}
        startAccessor="start"
        endAccessor="end"
        style={{height: 500}}
    />;
};

export default BigCalendar;
