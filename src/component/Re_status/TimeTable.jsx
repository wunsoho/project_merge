  import React from 'react';
  import Course from '../Re_status/Course';
  import * as B from '../Re_status/TimeTable.style'

  const TimeTable = ({ courses }) => {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const timeSlots = ['9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7'];

    const getCellStyle = (day, time, courses) => {
      const course = findCourse(day, time, courses);
  
      if (course) {
        return course.back ? 'reserved-back' : 'reserved';
      } else {
        return 'available';
      }
    };
    return (
      <div>
        <B.Body>
          <h2>예약현황</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th></th>
                {days.map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(timeSlot => (
                <tr key={timeSlot}>
                  <td>{timeSlot}</td>
                  {days.map(day => (
                    <td
                      key={day}
                      className={getCellStyle(day, timeSlot, courses)}
                    >
                      <Course course={findCourse(day, timeSlot, courses)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </B.Body>
      </div>
    );
  };

  const findCourse = (day, time, courses) => {
    return courses.find(
      course =>
        course.day === day &&
        isTimeInRange(time, course.start_time.toString(), course.end_time.toString())
    );
  };

  const isTimeInRange = (time, startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const currentTimeInMinutes = hour * 60 + minute;

    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
  };

  export default TimeTable;