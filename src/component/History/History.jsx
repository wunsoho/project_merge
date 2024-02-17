import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as B from './History.style';
import Back from '../Image/ReserveImage/back.png';

function History() {
    const navigate = useNavigate();
    const [reservationData, setReservationData] = useState(null);

    const ReservationItem = ({ reservation }) => (
        <B.DayContainer>
          <div className="title">{`${reservation.month}월 ${reservation.day}일`}</div>
          <B.TimeContainer>
            <div className="time">{`AM ${reservation.start_time}:00`}</div>
            <div className='v-line'></div>
            <B.Info>
              <div className="title">열린 열람실</div>
              <div className="content">42번 좌석</div>
            </B.Info>
          </B.TimeContainer>
        </B.DayContainer>
      );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3dW5zb2hvQG1haWwudWxzYW4uYWMua3IiLCJlbWFpbCI6Ind1bnNvaG9AbWFpbC51bHNhbi5hYy5rciIsImlhdCI6MTcwODE1MTIyOSwiZXhwIjoxNzA4MTU4NDI5fQ.WzJi_jCEqp1imb-Iu1VgXEbAdip6krc09gtk3hCupNA';
                const response = await fetch('http://13.125.247.248:8080/api/v1/reservation/details?memberId=9&page=1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const sortedData = data.result.resultList.sort((a, b) => {
                        const dateA = `${a.year}-${a.month}-${a.day}`;
                        const dateB = `${b.year}-${b.month}-${b.day}`;
                        return dateA.localeCompare(dateB);
                      });
            
                      setReservationData(sortedData);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="HistoryBody">
            <B.Back>
                <button onClick={handleGoBack} className="Backbutton">
                    <img src={Back} alt="뒤로가기" />
                </button>
                <div className="title">예약 내역</div>
            </B.Back>
            
            {reservationData && Array.isArray(reservationData) && reservationData.map((reservation, index) => (
        <ReservationItem key={index} reservation={reservation} />
      ))}
        </div>
    );
}

export default History;