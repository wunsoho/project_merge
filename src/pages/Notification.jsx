import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotiContent, NotiHeader, NotiBack, NotiTitle, NotiSort, NotiSortDiv, NotiBoard } from "../styled/Notification.styled";
import Board from "../component/NotificationBoard";

export default function Notification() {
  const [sort, setSort] = useState("전체");
  const [notiData, setNotiData] = useState([]);
  const navigate = useNavigate(); 
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  useEffect(() => {
    fetchData(sort);
  }, [sort]);

  const fetchData = async (sort) => {
    try {
      let url = "http://13.125.247.248:8080/api/v1/announcement/list?page=1";
      if (sort !== "전체") {
        url += `&type=${sort}`;
      }
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${Token}`,
        },
      });
      if (response.data.isSuccess === true) {
        setNotiData(response.data.result.list);
        console.log(notiData);
      } else {
        console.error("서버 응답 오류:", response.data.message);
      }
    } catch (error) {
      console.error("공지사항 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const notiClick = (id) => {
    console.log(id);
    if (id !== null) {
      navigate('/NotificationView', { state: { id, Token } });
    }
  };

  return (
    <NotiContent>
      <NotiHeader>
          <NotiBack onClick={handleBackClick}>
            <FontAwesomeIcon
                icon="chevron-left"
                style={{ fontSize: '1.5em' }} />
          </NotiBack>
          <NotiTitle>공지사항</NotiTitle>
      </NotiHeader>
      <NotiSortDiv>
        <NotiSort value={sort} onChange={handleSortChange}>
          <option value="전체">전체</option>
          <option value="일반">일반</option>
          <option value="취업">취업</option>
          <option value="행사">행사</option>
        </NotiSort>
      </NotiSortDiv>
      <NotiBoard>
        {notiData.map((noti) => (
          <Board onClick={() => notiClick(noti.id)}
            id={noti.id}
            title={noti.title}
            date={noti.date}
          />
        ))}
      </NotiBoard>
    </NotiContent>
  );
}