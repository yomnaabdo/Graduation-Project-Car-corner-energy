import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Correct CSS import paths
import '@fullcalendar/daygrid/package.json';
import '@fullcalendar/core/package.json';
import '@fullcalendar/bootstrap/package.json';

const MyCalendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, bootstrapPlugin]}
      initialView="dayGridMonth"
      themeSystem="bootstrap"
      headerToolbar={{
        start: 'title',
        center: '',
        end: 'prev,next',
      }}
      fixedWeekCount={false}
    />
  );
};

export default MyCalendar;
