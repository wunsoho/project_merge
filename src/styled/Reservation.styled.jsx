import styled from "styled-components";
import { Link } from "react-router-dom";

export const ReservationContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`

export const ReservationHeader = styled.div`
    display: flex;
    z-index: 1;
    max-width: 768px;
    width: 100%;
    height: 35px;
    position: fixed;
    top: 0;
    margin: 0;
    padding: 5px;
    justify-content: flex-end;
    align-items: center;
    background-color: white;
    border-bottom: 1.5px solid #D4D4D4;
`

export const ReservationTitle = styled.div`
    margin: 0;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    font-size: 21px;
    font-weight: bold;
`

export const ReservationSearch = styled(Link)`
    margin-right: 15px;
    text-decoration: none;
    color: black;
`

export const ReservationCategoryAll = styled.div`
    display: flex;
`

export const ReservationCategory1st = styled.div`
    display: flex;
    flex-direction: column;
    width: 58%;
    height: calc(100vh - 113px);
    margin-top: 45px;
    border-right: 1.5px solid #D4D4D4;
    overflow-y: auto;

    & > div {
        display: flex;
        margin: 25px 15px 20px 20px;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        color: #BBBBBB;
        cursor: pointer;

        &.active {
            color: #1FBC70;
        }
    }
`

export const ReservationCategory2nd = styled.div`
    display: flex;
    flex-direction: column;
    width: 42%;
    height: calc(100vh - 113px);
    margin-top: 45px;
    overflow-y: auto;

    & > div {
        display: flex;
        margin: 25px 15px 20px 20px;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        color: #BBBBBB;
        cursor: pointer;
    }
`