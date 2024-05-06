import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ButtonGroup, Button } from '@mui/material';

const MyCalendar = () => {
  const calendarRef = useRef(null);

  const handleViewChange = (viewType) => {
    calendarRef.current.getApi().changeView(viewType);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
               <ButtonGroup variant="text" color="primary" className="mb-4">
        <Button onClick={() => handleViewChange('dayGridMonth')}>Monthly</Button>
        <Button onClick={() => handleViewChange('timeGridWeek')}>Weekly</Button>
        <Button onClick={() => handleViewChange('timeGridDay')}>Daily</Button>
      </ButtonGroup>
    <div className="max-w-3xl mx-auto">
       
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth" // Monthly view
          events={[
            { title: 'Event 1', date: '2024-05-01' },
            { title: 'Event 2', date: '2024-05-02' },
          ]}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
