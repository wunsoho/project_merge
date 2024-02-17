import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReservationContent, ReservationHeader, ReservationTitle, ReservationSearch, ReservationCategoryAll, ReservationCategory1st, ReservationCategory2nd } from "../styled/Reservation.styled";

export default function Reservation() {
  const [categories, setCategories] = useState([]);
  const [selected1stCategory, setSelected1stCategory] = useState(null);
  const [selected2ndCategory, setSelected2ndCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'http://13.125.247.248:8080/api/v1/facility/category/building',
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3dW5zb2hvQG1haWwudWxzYW4uYWMua3IiLCJlbWFpbCI6Ind1bnNvaG9AbWFpbC51bHNhbi5hYy5rciIsImlhdCI6MTcwODE3MjMxNCwiZXhwIjoxNzA4MTc5NTE0fQ.fRgSBkrGlpgH91Sh1HNQVpleqtn4s7aVcagpnA-3K_0",
          },
        }
      );
      if (result.data.isSuccess === true) {
        setCategories(result.data.result.categories);
      } else {
        console.error("서버 응답 오류:", result.data.message);
      };
    };
    fetchData();
  }, []);

  const handle1stCategoryClick = (category) => {
    if (category.count > 0) {
      setSelected1stCategory(category);
      setSelected2ndCategory(null);
    }
  };

  const handle2ndCategoryClick = (facility) => {
    setSelected2ndCategory(facility);
    const id = facility.id;
    navigate('/facility/${id}', { state : {id} });
  };

  return (
    <ReservationContent>
      <ReservationHeader>
        <ReservationTitle>예약</ReservationTitle>
        <ReservationSearch to="/search">
          <FontAwesomeIcon
              icon="magnifying-glass"
              style={{ fontSize: '1.5em' , color: '#000000'}} />
        </ReservationSearch>
      </ReservationHeader>
      <ReservationCategoryAll>
        <ReservationCategory1st>
          {categories.map(category => (
            <div key={category.name} onClick={() => handle1stCategoryClick(category)} className={selected1stCategory?.name === category.name ? "active" : ""}>
              {category.name}
            </div>
          ))}
        </ReservationCategory1st>
        <ReservationCategory2nd>
          {selected1stCategory && selected1stCategory.count > 0 && selected1stCategory.facilities.map((facility) => (
            <div key={facility.name} onClick={() => handle2ndCategoryClick(facility)}>
              {facility.name}
            </div>
          ))}
        </ReservationCategory2nd>
      </ReservationCategoryAll>
    </ReservationContent>
  );
}