import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FAQContent, FAQHeader, FAQBack, FAQTitle, FAQSortDiv, FAQSort, FAQBoard, FAQInquiry,
} from "../styled/FAQ.styled";
import Board from "../component/FAQBoard";

export default function FAQ() {
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);
  const [selectedSort, setSelectedSort] = useState("reservation");
  const [faqData, setFaqData] = useState([]);
  const [expandedState, setExpandedState] = useState({});

  useEffect(() => {
    fetchData(selectedSort);
    setExpandedState({});
  }, [selectedSort]);

  const fetchData = async (sort) => {
    try {
      const response = await axios.get(
        `http://13.125.247.248:8080/api/v1/faq/list?type=${sort}&page=1`,
        {
          headers: {
            'Authorization': `Bearer ${Token}`,
          },
        }
      );      
      if (response.data.isSuccess === true) {
        setFaqData(response.data.result.list);
      } else {
        console.error("서버 응답 오류:", response.data.message);
      }
    } catch (error) {
      console.error("FAQ 데이터를 가져오는 중 오류 발생:", error);
    }
  }
  
  const handleToggle = (index) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleSortClick = (sort) => {
    setSelectedSort(sort);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <FAQContent>
      <FAQHeader>
        <FAQBack onClick={handleBackClick}>
          <FontAwesomeIcon icon="chevron-left" style={{ fontSize: "1.5em" }} />
        </FAQBack>
        <FAQTitle>FAQ</FAQTitle>
      </FAQHeader>
      <FAQSortDiv>
        <FAQSort
          onClick={() => handleSortClick("reservation")}
          className={selectedSort === "reservation" ? "active" : ""}
        >
          예약/반납
        </FAQSort>
        <FAQSort
          onClick={() => handleSortClick("join")}
          className={selectedSort === "join" ? "active" : ""}
        >
          가입/탈퇴
        </FAQSort>
        <FAQSort
          onClick={() => handleSortClick("etc")}
          className={selectedSort === "etc" ? "active" : ""}
        >
          기타
        </FAQSort>
      </FAQSortDiv>
      <FAQBoard>
        {faqData.map((faq, index) => (
          <Board
            key={index}
            title={faq.title}
            initialContent={faq.content}
            expanded={expandedState[index]}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </FAQBoard>
      <FAQInquiry to="/inquiry">문의하기</FAQInquiry>
    </FAQContent>
  );
}
