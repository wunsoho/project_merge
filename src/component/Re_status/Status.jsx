import React, { useState, useEffect } from 'react';
import TimeTable from './TimeTable';

const Status = () => {
  const [reservationData, setReservationData] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3dW5zb2hvQG1haWwudWxzYW4uYWMua3IiLCJlbWFpbCI6Ind1bnNvaG9AbWFpbC51bHNhbi5hYy5rciIsImlhdCI6MTcwNzgyNDIxNywiZXhwIjoxNzA3ODMxNDE3fQ.M4TP8J5sC4xdSoul9Z6TDpehTaWdySgeZfw-pHCImDw';

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const facilityId = 1;
        const response = await fetch(`http://13.125.247.248:8080/api/v1/reservation/byfacility?facilityId=${facilityId}&page=1`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReservationData(data.result.resultList);
          console.log(data)
        } else {
          console.error('Failed to fetch reservation data');
        }
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };

    fetchReservationData();
  }, [token]);

  return (
    <div>
      <h1>예약 현황</h1>
      <TimeTable courses={reservationData} />
    </div>
  );
};

export default Status;