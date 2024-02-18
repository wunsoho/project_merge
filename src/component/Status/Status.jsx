import React, { useState, useEffect } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NavigationBar from '../Navi/NavigationBar';
import * as B from './Status.style';

const localizer = momentLocalizer(moment);
const TimeTable = () => {
  const [events, setEvents] = useState([]);
  const [Token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  const fetchTimeTableData = async () => {
    try {
      const response = await fetch(`http://13.125.247.248:8080/api/v1/reservation/byfacility?facilityId=1&page=1&page=1`, {
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.result.resultList;
      } else {
        console.error('Failed to fetch time table data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching time table data:', error);
      return [];
    }
  };
  useEffect(() => {
    const fetchReservationData = async () => {
      const timeTableData = await fetchTimeTableData(Token);
      const formattedEvents = timeTableData.map(reservation => ({
        start: new Date(reservation.year, reservation.month - 1, reservation.day, reservation.start_time),
        end: new Date(reservation.year, reservation.month - 1, reservation.day, reservation.end_time),
        title : "예약중"
      }));
      setEvents(formattedEvents);
    };

    fetchReservationData();
  }, [fetchTimeTableData, Token]);
  const CustomEvent = ({ event }) => (
    <div style={{ backgroundColor: '#5C5D61', borderRadius: '0px', opacity: 0.8, color: 'white', border: '0px', padding: '5px', position: 'relative', height: '100%' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {event.title}
      </div>
    </div>
  );

  const eventStyleGetter = () => {
    const backgroundColor = '#5C5D61';
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: '#5C5D61',
      border: '0px',
    };
    return {
      style,
    };
  };
  return (
    <div>
      <B.title>예약현황</B.title>
      <B.Calendar>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={['week']}
          defaultView="week"
          min={new Date(0, 0, 0, 9, 0)}
          max={new Date(0, 0, 0, 20, 0)}
          weekStartsOn={0}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
          }}
        />
      </B.Calendar>
      <NavigationBar/>
    </div>
  );
};

export default TimeTable;