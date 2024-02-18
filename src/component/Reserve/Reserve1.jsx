import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Back from '../Image/ReserveImage/back.png';
import Day from '../Image/ReserveImage/Day.png';
import Info from '../Image/ReserveImage/Info.png';
import time from '../Image/ReserveImage/time.png';
import people from '../Image/ReserveImage/people.png';
import Alarm from '../Image/ReserveImage/Alarm.png';
import choose1 from '../Image/ReserveImage/choose1.png';
import choose2 from '../Image/ReserveImage/choose2.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Switch from 'react-switch';
import * as B from './Reserve1.style';
import Calendar from 'react-calendar';
import '../Reserve/Calendar.css';
import Modal from '../Modal/ReserveModal';
import NotificationModal from '../Modal/NotificationModal';
import { Client } from '@stomp/stompjs';
function Reserve1() {
    const location = useLocation();
    const { buildingName, name, location: facilityLocation, id } = location.state;
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(`/facility/${id}`,{
        state : {id}
      });
    };
    const [Token, setToken] = useState('');

    useEffect(() => {
      const storedToken = localStorage.getItem("Token");
      setToken(storedToken);
      console.log(storedToken);
    }, []);  
    const [value, onChange] = useState(new Date());
    const [counter, setcount] = useState(0);
    const [bookedTimes, setBookedTimes] = useState([]);
    const [duration, setDuration] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    const handleDateChange  = async (newValue) => {
      const year = newValue.getFullYear();
      const month = newValue.getMonth() + 1;
      const day = newValue.getDate();
      onChange(newValue);
    
      try {
        const response = await fetch(`http://13.125.247.248:8080/api/v1/reservation/time?facilityId=${id}&year=${year}&month=${month}&day=${day}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          const bookedUpList = data.result.bookedUpList;

          const bookedTimes = bookedUpList.map(item => item.startTime);
          setSelectedTime([]);
          setBookedTimes(bookedTimes);

          console.log({year},{month},{day})
          console.log('GET 요청 성공:', bookedUpList);
          console.log(bookedTimes);
        } else {
          console.error('Failed to fetch reservation time');
        }
      } catch (error) {
        console.error('Error fetching reservation time:', error);
      }
    };
    const settings1 = {
        infinite: false,
        speed: 500,
        variableWidth: true,
        slidesToShow: 3,
        slidesToScroll: 3, 
    };
    const fac_detailData1 = [
        { id: 1, Info : 9 },
        { id: 2, Info : 10 },
        { id: 3, Info : 11 },
        { id: 4, Info : 12 },
        { id: 5, Info : 13 },
        { id: 6, Info : 14 },
        { id: 7, Info : 15 },
        { id: 8, Info : 16 },
        { id: 9, Info : 17 },
        { id: 10, Info : 18 },
        { id: 11, Info : 19 },
    ];
    const fac_detailData2 = [
        { id: 1, Info : "3일 전", exp : "THREE_DAYS_BEFORE" },
        { id: 2, Info : "1일 전", exp : "ONE_DAY_BEFORE" },
        { id: 3, Info : "1시간 전", exp : "THIRTY_MINUTES_BEFORE" },
        { id: 4, Info : "10분 전", exp : "TEN_MINUTES_BEFORE" },
    ];
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedAlarm, setSelectedAlarm] = useState([]);
    const [toggleAlarm, setToggleAlarm] = useState(true);

    const handleTimeButtonClick = (timeInfo) => {
      setSelectedTime((prevSelectedTime) => {
        const isSelected = prevSelectedTime.includes(timeInfo);
        const newDuration = isSelected ? duration - 1 : duration + 1;
        setDuration(newDuration);
        return isSelected
        ? prevSelectedTime.filter((selected) => selected !== timeInfo)
        : [...prevSelectedTime, timeInfo];
      });
      };
      
    const handleTimeButtonClick2 = (AlarmInfo) => {
      if (toggleAlarm) {
        setSelectedAlarm((prevSelectedAlarm) => {
          const isSelected = prevSelectedAlarm.includes(AlarmInfo);
          return isSelected
            ? prevSelectedAlarm.filter((selected) => selected !== AlarmInfo)
            : [...prevSelectedAlarm, AlarmInfo];
        });
      }
    };
    const handleToggleChange = () => {
      setToggleAlarm(!toggleAlarm);
    };
    const handleConfirmButtonClick = async () => {
      try {
        const selectedStartTime = selectedTime[0];
        const selectedDate = value;
        const selectedAlerts = selectedAlarm.map((selectedInfo) => {
          const correspondingItem = fac_detailData2.find(item => item.Info === selectedInfo);
          return correspondingItem ? correspondingItem.exp : null;
        }).filter(Boolean);
    
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
    
        const requestBody = {
          memberId: 9,
          facilityId: location.state.id,
          startTime: selectedStartTime,
          endTime: selectedStartTime + 1,
          duration: duration,
          year: year.toString(),  
          month: month.toString(),
          day: day.toString(),
          alerts: selectedAlerts
        };
    
        const response = await fetch('http://13.125.247.248:8080/api/v1/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          },
          body: JSON.stringify(requestBody)
        });
    
        if (response.ok) {
          const responseData = await response.json();
          console.log('POST 요청 성공:', responseData);
          if (responseData.isSuccess) { 
            setIsOpenModal(true);
          } else {
            console.error('Failed to make reservation:', responseData.message);
          }
        } else {
          console.error('Failed to make reservation');
          console.log(requestBody);
        }
      } catch (error) {
        console.error('Error making reservation:', error);
      }
    };

    return( 
        <B.Body>
            <B.Back>
                <button onClick={handleGoBack} className = "Backbutton">
                    <img src = { Back } alt = "뒤로가기"/>
                </button>
                <div className = "title">예약</div>
            </B.Back>
            <B.InfoContainer>
                <B.InfoImg>
                    <img src = { Info } alt = "정보"/>
                </B.InfoImg>
                <B.Info>
                    <B.InfoTitle>{buildingName}</B.InfoTitle>
                    <B.InfoLocation>{name} {facilityLocation}</B.InfoLocation>
                </B.Info>
            </B.InfoContainer>
            <B.line>    
                <hr className = "hr"></hr>
            </B.line>
            <B.DayTitle>
                <img src = { Day } alt = "달력"/>
                <div className = "title">이용 날짜</div>
            </B.DayTitle>
            <B.CalContainer>
                <Calendar
                    locale = "en"
                    onChange={handleDateChange }
                    value={value}
                    showNeighboringMonth = {false}
                    calendarType="gregory"
                />
            </B.CalContainer>
            <B.line>    
                <hr className = "hr"></hr>
            </B.line>
          <B.timeContainer> 
            <img src = { time } alt = "시간"/>
            <div className = "title">이용 시간</div>
            <img className = "img1" src = { choose1 } alt = "선택가능"/>
            <div>선택가능</div>
            <img className = "img2" src = { choose2 } alt = "선택불가능"/>
            <div>선택불가능</div>
          </B.timeContainer>
          <B.timeButton>
            <Slider {...settings1}>
            {fac_detailData1.map((item) => (
                <div key={item.id}>
                    <B.SlideContainer>
                    <button
                      className={`slide-container ${
                        selectedTime.includes(item.Info) ? 'selected' : ''
                      } ${bookedTimes.includes(item.Info) ? 'disabled' : ''}`}
                      onClick={() => handleTimeButtonClick(item.Info)}
                      disabled={bookedTimes.includes(item.Info)}
                    >
                      {convertToAMPMFormat(item.Info)}
                      </button>
                    </B.SlideContainer>
                </div>
            ))}
            </Slider>
          </B.timeButton>
          <B.peopleContainer>
            <img src = { people } alt = "인원"/>
            <div className = "title">이용 인원</div>
            <button className = "minus" onClick={() => {setcount(counter - 1)}}>-</button>
            <div className = "counter">{counter}명</div>
            <button className = "plus" onClick={() => {setcount(counter + 1)}}>+</button>  
          </B.peopleContainer>
          <B.AlarmContainer>
            <img src = { Alarm } alt = "알림"/>
            <div className = "title">알람 설정</div>
            <div className = "togle">
            <Switch
                onChange={handleToggleChange}
                checked={toggleAlarm}
                uncheckedIcon={false}
                checkedIcon={false}
                height={24}
                width={45}
                onColor="#1FBC70"
            />
            </div>
          </B.AlarmContainer>
          <B.AlarmButton>
          <Slider {...settings1}>
            {fac_detailData2.map((item) => (
                <div key={item.id}>
                    <B.SlideContainer>
                        <button className={`slide-container ${selectedAlarm.includes(item.Info) ? 'selected' : ''}`}
                        onClick={() => handleTimeButtonClick2(item.Info)}
                        >
                        {item.Info}
                        </button>
                    </B.SlideContainer>
                </div>
            ))}
            </Slider>
          </B.AlarmButton>
            <B.ConfirmButton className = {selectedTime.length > 0 || selectedAlarm.length > 0 ? 'active' : ''}
            onClick={handleConfirmButtonClick}>확인</B.ConfirmButton>
            <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        </B.Body>
    );
}
function convertToAMPMFormat(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:00 ${ampm}`;
}
export default Reserve1;