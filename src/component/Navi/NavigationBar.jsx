import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Navi/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper, StyledNav, NavLink } from "./NavigationBar.styled";

const NavigationBar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [activeNav, setActiveNav] = useState(() => {
    const activeNavFromPathname = location.pathname.split('/')[1];
    return activeNavFromPathname || "home";
  });
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  useEffect(() => {
    localStorage.setItem("activeNav", activeNav);
  }, [activeNav]);

  const handleClick = (navItem) => {
    setActiveNav(navItem);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("activeNav", navItem);
    window.history.push({ search: newSearchParams.toString() });
  }

  return (
    <Wrapper>
      <StyledNav>
        <NavLink to={{ pathname: "/main", state: { Token } }} onClick={() => handleClick('home')}>
          <div>
            <FontAwesomeIcon
              icon="house"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'home' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'home' ? "active" : "nav-item"}>홈</p>
          </div>
        </NavLink>
        <NavLink to={{ pathname: "/reservation", state: { Token } }} onClick={() => handleClick('reservation')}>
          <div>
            <FontAwesomeIcon
              icon="calendar-check"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'reservation' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'reservation' ? "active" : "nav-item"}>예약</p>
          </div>
        </NavLink>
        <NavLink to={{ pathname: "/map", state: { Token } }} onClick={() => handleClick('map')}>
          <div>
            <FontAwesomeIcon
              icon="map-location-dot"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'map' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'map' ? "active" : "nav-item"}>지도</p>
          </div>
        </NavLink>
        <NavLink to={{ pathname: "/mypage", state: { Token } }} onClick={() => handleClick('mypage')}>
          <div>
            <FontAwesomeIcon
              icon="circle-user"
              style={{ fontSize: '1.5em' }}
              className={activeNav === 'mypage' ? "active" : "nav-item"}
            />
            <p className={activeNav === 'mypage' ? "active" : "nav-item"}>마이페이지</p>
          </div>
        </NavLink>
      </StyledNav>
    </Wrapper>
  );
};

export default NavigationBar;