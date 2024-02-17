import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotiContent, NotiHeader, NotiBack, NotiTitle, NotiSort, NotiSortDiv, NotiBoard } from "../styled/Notification.styled";
import Board from "../component/NotificationBoard";

export default function Announcement() {
  const [sort, setSort] = useState("전체");
  const [notiData, setNotiData] = useState([]);
  const [DetailNotiData, setDetailNotiData] = useState([]);

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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3dW5zb2hvQG1haWwudWxzYW4uYWMua3IiLCJlbWFpbCI6Ind1bnNvaG9AbWFpbC51bHNhbi5hYy5rciIsImlhdCI6MTcwODE1MTIyOSwiZXhwIjoxNzA4MTU4NDI5fQ.WzJi_jCEqp1imb-Iu1VgXEbAdip6krc09gtk3hCupNA",
        },
      });
      if (response.data.isSuccess === true) {
        setNotiData(response.data.result.list);
      } else {
        console.error("서버 응답 오류:", response.data.message);
      }
    } catch (error) {
      console.error("공지사항 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchNotiData = async (id) => {
    try {
      let url = `http://13.125.247.248:8080/api/v1/announcement/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3dW5zb2hvQG1haWwudWxzYW4uYWMua3IiLCJlbWFpbCI6Ind1bnNvaG9AbWFpbC51bHNhbi5hYy5rciIsImlhdCI6MTcwODE1MTIyOSwiZXhwIjoxNzA4MTU4NDI5fQ.WzJi_jCEqp1imb-Iu1VgXEbAdip6krc09gtk3hCupNA",
        },
      });
      if (response.data.isSuccess === true) {
        setDetailNotiData(response.data.result);
      } else {
        console.error("서버 응답 오류:", response.data.message);
      }
    } catch (error) {
      console.error("공지사항 자세히보기 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleBackClick = () => {
    window.history.back();
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
          <Board
            key={noti.id}
            title={noti.title}
            date={noti.date}
          />
        ))}
      </NotiBoard>
    </NotiContent>
  );
}