import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.nav`
  max-width: 960px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 2;
`;

export const StyledNav = styled.nav`
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  background-color: #FFFFFF;
  border-top: 1px solid #EBEBEB;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const NavLink = styled(Link)`
  float: left;
  width: 25%;
  text-align: center;
  text-decoration: none;

  & > div {
    display: flex;
    padding-top: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  & > div > p {
    margin-top: 5px;
    font-size: 13px;
    text-align: center;
    text-decoration: none;
  }

  .nav-item {
    color: grey;
  }

  .active {
    color: #1FBC70;
  }
`;
