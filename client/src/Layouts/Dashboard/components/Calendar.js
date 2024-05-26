import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import { useUser } from '../../../helper/UserContext';

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const { user, token } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        if (!token) return; // Ensure token exists
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:3001/recruitment/interviews/getAll', config);
        console.log(response.data);
        const firstInterviews = response.data.filter(interview => interview.status === 'first_interview'); // Filter first_interviews
        const interviews = firstInterviews.map(interview => ({
          title: `${interview.interviewee.name} - ${interview.interviewee.jobTitle}`,
          date: new Date(interview.datetime).toISOString().split('T')[0],
          ...interview 
        }));
        setEvents(interviews);
      } catch (error) {
        console.error('Error fetching interviews', error);
      }
    };

    if (user?.id) {
      fetchInterviews();
    }
  }, [user, token]);

  const handleEventClick = (info) => {
    setSelectedInterview(info.event.extendedProps);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInterview(null);
  };

  const handleViewChange = (viewType) => {
    calendarRef.current.getApi().changeView(viewType);
  };

  return (
    <div className="px-4 py-8 bg-white">
      <div className="flex justify-center mb-4">
        <div className="inline-flex shadow-sm" role="group">
          <button onClick={() => handleViewChange('dayGridMonth')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">Monthly</button>
          <button onClick={() => handleViewChange('timeGridWeek')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">Weekly</button>
          <button onClick={() => handleViewChange('timeGridDay')} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">Daily</button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
        />
      </div>
      {selectedInterview && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50`}>
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl mx-auto">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold mb-4">Interview Details</h2>
              <div className="mb-2">
                <strong>Agenda:</strong> {selectedInterview.agenda}
              </div>
              <div className="mb-2">
                <strong>Date:</strong> {new Date(selectedInterview.datetime).toLocaleString()}
              </div>
              <div className="mb-2">
                <strong>Duration:</strong> {selectedInterview.duration} minutes
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {selectedInterview.status}
              </div>
              <div className="mb-2">
                <strong>Join URL:</strong> <a href={selectedInterview.join_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Join Meeting</a>
              </div>
              <div className="mb-2">
                <strong>Interviewee Name:</strong> {selectedInterview.interviewee.name}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {selectedInterview.interviewee.email}
              </div>
              <div className="mb-2">
                <strong>Phone:</strong> {selectedInterview.interviewee.phone}
              </div>
              <div className="mb-2">
                <strong>Job Title:</strong> {selectedInterview.interviewee.jobTitle}
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end">
              <button onClick={handleClose} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
