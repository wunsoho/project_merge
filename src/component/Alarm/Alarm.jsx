import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as B from '../Alarm/Alarm.style';
import Back from '../Image/ReserveImage/back.png';
import Speaker from '../Image/AlarmImage/Speaker.png';
import Bell from '../Image/AlarmImage/Bell.png';

function Alarm () {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
      };
    return (
        <div className = "AlarmBody">
            <B.Back>
            <button onClick={handleGoBack} className = "Backbutton">
                <img src = { Back } alt = "뒤로가기"/>
            </button>
            <div className = "title">알림</div>
            </B.Back>
            <B.AlarmContainer>
                <img className = "img" src = {Speaker} alt ="스피커"/>
                <div className = "title">시설 반납 10분 전 안내</div>
                <div>예약하신 <B.greenText>열간열람실</B.greenText> 이용시간이 <B.RedText>10분</B.RedText> 남았습니다.</div>
            </B.AlarmContainer>
            <B.AlarmContainer>
                <img className = "img" src = {Speaker} alt ="스피커"/>
                <div className = "title">시설 반납 30분 전 안내</div>
                <div>예약하신 <B.greenText>열간열람실</B.greenText> 이용시간이 <B.greenText>30분</B.greenText> 남았습니다.</div>
            </B.AlarmContainer>
            <B.AlarmContainer>
                <img className = "img" src = {Bell} alt ="종"/>
                <div className = "title">시설 이용 1일 전 안내</div>
                <div>예약하신 <B.greenText>학생회관 소강당</B.greenText> 이용일이 <B.greenText>1일</B.greenText> 남았습니다.</div>
            </B.AlarmContainer>
            <B.AlarmContainer>
                <img className = "img" src = {Bell} alt ="종"/>
                <div className = "title">시설 반납 10분 전 안내</div>
                <div>예약하신 <B.greenText>학생회관 소강당</B.greenText> 이용일이 <B.greenText>3일</B.greenText> 남았습니다.</div>
            </B.AlarmContainer>
        </div>
    )
}
export default Alarm;