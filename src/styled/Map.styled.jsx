import styled from "styled-components";
import { Link } from "react-router-dom";

export const MapContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`

export const MapHeader = styled.div`
    display: flex;
    z-index: 1;
    max-width: 768px;
    width: 100%;
    height: 35px;
    position: fixed;
    top: 0;
    margin: 0;
    padding: 5px;
    align-items: center;
    background-color: white;
`

export const MapMenu = styled(Link)`
    margin: 5px;
    text-decoration: none;
    color: black;
`

export const MapTitle = styled.div`
    margin: 0;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    font-size: 21px;
    font-weight: bold;
`

export const MapNotice = styled.div`
    display: flex;
    z-index: 1;
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 15px;
    background-color: rgba(255, 255, 255, 0.9);
    font-size: 13px;
    font-weight: bold;
    border-radius: 20px;
    white-space: nowrap;
`

export const GoogleMap = styled.div`
    z-index: 0;
    margin: 0;
    padding: 0;
`

export const MarkerInfo = styled.div`
    display: flex;
    z-index: 1;
    max-width: 723px;
    width: 90%;
    position: fixed;
    bottom: 75px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    background-color: white;
    border-radius: 20px;
    flex-direction: column;
`

export const InfoContent = styled.div`
    display: flex;
    z-index: 2;
`

export const InfoPic = styled.img`
    display: flex;
    z-index: 2;
    border-radius: 10px;
    width: 80px;
    height: 80px;
`

export const InfoWord = styled.div`
    display: flex;
    z-index: 2;
    flex-direction: column;
    margin: 5px 0 5px 15px;
`

export const InfoTitle = styled.div`
    display: flex;
    z-index: 2;
    font-size: 15px;
    font-weight: bold;
`

export const InfoTime = styled.div`
    display: flex;
    z-index: 2;
    margin-top: 10px;
    margin-bottom: 3px;
    font-size: 13.5px;
`

export const InfoDetilTime = styled.div`
    display: flex;
    z-index: 2;
    margin-bottom: 20px;
    font-size: 13px;
`

export const InfoButton = styled.div`
    display: flex;
    z-index: 2;
    width: 100%;
    justify-content: end;
    align-items: center;
`

export const InfoDetail = styled.div`
    display: flex;
    z-index: 3;
    width: 49.5%;
    padding: 8px;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 13px;
    background-color: #1FBC70;
    border-radius: 30px;
    border-color:  #1FBC70;
    text-decoration: none;
`