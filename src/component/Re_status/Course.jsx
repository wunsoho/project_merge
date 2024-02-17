import React from 'react';
import * as B from '../Re_status/Course.style';

const Course = ({ course }) => {
  const hasCourse = !!course;

  return (
    <B.Body>
        <div className={`course ${hasCourse ? 'has-course' : ''}`}>
        {hasCourse && (
            <>
            <p>{course.name}</p>
            <p>{`${course.startTime} - ${course.endTime}`}</p>
            </>
        )}
        </div>
    </B.Body>
  );
};

export default Course;