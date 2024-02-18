import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryContent, CategoryHeader, CategoryBack, CategoryTitle, CategorySearch, CategoryAll, Category1st, Category2nd, Category3rd } from "../styled/CategoryBuilding.styled";

export default function CategoryBuilding() {
  const [Token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);
  const [selected1stCategory, setSelected1stCategory] = useState("건물별");
  const [selected2ndCategory, setSelected2ndCategory] = useState(null);
  const [selected3rdCategory, setSelected3rdCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const category2ndSelectedRef = useRef(null);
  const navigate = useNavigate();

  const topCategories = ["건물별", "테마별"];

  useEffect(() => {
    fetchData(selected1stCategory);
  }, [selected1stCategory]);

  const fetchData = async (category) => {
    try {
      let url = "http://13.125.247.248:8080/api/v1/facility/category";
      if (category === "건물별") {
        url += "/building";
      } else if (category === "테마별") {
        url += "/theme";
      }
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${Token}`,
        },
      });
      if (response.data.isSuccess === true) {
        setCategories(response.data.result.categories);
      } else {
        console.error("서버 응답 오류:", response.data.message);
      }
    } catch (error) {
      console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (category2ndSelectedRef.current && selected2ndCategory) {
      category2ndSelectedRef.current.scrollTo({
        left: category2ndSelectedRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  }, [selected2ndCategory]);

  const handle1stCategoryClick = (Firstcategory) => {
    setSelected1stCategory(Firstcategory);
    setSelected2ndCategory(null);
    setSelected3rdCategory(null);
  };

  const handle2ndCategoryClick = (category) => {
    if (category.count > 0) {
      setSelected2ndCategory(category);
      setSelected3rdCategory(null);
    }
  };

  const handle3rdCategoryClick = (facility) => {
    setSelected3rdCategory(facility);
    const id = facility.id;
    navigate('/detailinfo', { state : {id, Token} });
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <CategoryContent>
      <CategoryHeader>
          <CategoryBack onClick={handleBackClick}>
            <FontAwesomeIcon
                icon="chevron-left"
                style={{ fontSize: '1.5em' , color: '#000000'}} />
          </CategoryBack>
          <CategoryTitle>카테고리</CategoryTitle>
          <CategorySearch to="/search">
            <FontAwesomeIcon
                icon="magnifying-glass"
                style={{ fontSize: '1.5em' , color: '#000000'}} />
          </CategorySearch>
      </CategoryHeader>
      <CategoryAll ref={category2ndSelectedRef}>
        <Category1st>
          {topCategories.map(category => (
            <div key={category} onClick={() => handle1stCategoryClick(category)} className={selected1stCategory === category ? "active" : ""}>
              {category}
            </div>
          ))}
        </Category1st>
        <Category2nd>
          {categories.map(category => (
            <div key={category.name} onClick={() => handle2ndCategoryClick(category)} className={selected2ndCategory?.name === category.name ? "active" : ""}>
              {category.name}
            </div>
          ))}
        </Category2nd>
        <Category3rd style={{ display: selected2ndCategory ? 'block' : 'none' }}>
          {selected2ndCategory && selected2ndCategory.count > 0 && selected2ndCategory.facilities.map((facility) => (
            <div key={facility.name} onClick={() => handle3rdCategoryClick(facility)}>
              {facility.name}
            </div>
          ))}
        </Category3rd>
      </CategoryAll>
    </CategoryContent>
  );
}