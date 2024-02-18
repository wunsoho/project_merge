import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotiViewContent, NotiViewHeader, NotiViewBack, NotiViewTitle, NotiViewBoard, NotiTitle, NotiDate, NotiContent, NotiList } from "../styled/NotificationView.styled";

export default function NotificationView() {
  const [notiViewData, setNotiViewData] = useState([]);
  const location = useLocation();
  const { id } = location.state || {};
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      let url = `http://13.125.247.248:8080/api/v1/announcement/${id}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${Token}`,
        },
      });
      if (response.data.isSuccess === true) {
        setNotiViewData(response.data.result);
        console.log(notiViewData)
      } else {
        console.error("서버 응답 오류:", response.data.message);
      }
    } catch (error) {
      console.error("공지사항 보기 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <NotiViewContent>
      <NotiViewHeader>
          <NotiViewBack onClick={handleBackClick}>
            <FontAwesomeIcon
                icon="chevron-left"
                style={{ fontSize: '1.5em' }} />
          </NotiViewBack>
          <NotiViewTitle>공지사항 조회</NotiViewTitle>
      </NotiViewHeader>
      <NotiViewBoard>
        <NotiTitle>{notiViewData.title}</NotiTitle>
        <NotiDate>공지일 | {notiViewData.date}</NotiDate>
        <NotiContent dangerouslySetInnerHTML={ {__html: notiViewData.content} }></NotiContent>
      </NotiViewBoard>
      <NotiList onClick={handleBackClick}>목록</NotiList>
    </NotiViewContent>
  );
}