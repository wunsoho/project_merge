import styled from "styled-components";
import { Link } from "react-router-dom";

export const FAQContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`

export const FAQHeader = styled.div`
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

export const FAQBack = styled.div`
    margin: 5px;
`

export const FAQTitle = styled.div`
    margin: 0;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    font-size: 21px;
    font-weight: bold;
`

export const FAQSortDiv = styled.div`
    display: flex;
    z-index: 1;
    flex-direction: row;
    margin-top: 75px;
    margin-left: 15px;
`

export const FAQSort = styled.div`
    display: flex;
    padding: 6px 11px;
    margin: 0px 5px;
    background-color: white;
    border: 1px solid #F1F1F1;
    border-radius: 17px;
    font-size: 13.5px;

    &:focus,
    &.active {
        outline: none;
        background-color: #F1F1F1;
    }
`

export const FAQBoard = styled.div`
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    overflow-y: auto;
    max-height: calc(100vh - 185px);
`

export const FAQInquiry = styled(Link)`
    position: fixed;
    left: 50%;
    bottom: 15px;
    transform: translateX(-50%);
    width: 85%;
    padding: 13px;
    text-align: center;
    color: white;
    font-size: 15px;
    font-weight: bold;
    background-color: #1FBC70;
    border-radius: 15px;
    border-color:  #1FBC70;
    text-decoration: none;  
`