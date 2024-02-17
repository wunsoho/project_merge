import styled from "styled-components";

export const NotiContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`

export const NotiHeader = styled.div`
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

export const NotiBack = styled.div`
    margin: 5px;
`

export const NotiTitle = styled.div`
    margin: 0;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    font-size: 21px;
    font-weight: bold;
`

export const NotiSortDiv = styled.div`
    z-index: 1;
    margin-top: 60px;
    border-bottom: 1.5px solid #D4D4D4;
`

export const NotiSort = styled.select`
    display: flex;
    padding: 7px 15px 7px 5px;
    margin: 10px 13px;
    background-color: #F1F1F1;
    border: none;
    border-radius: 8px;
    font-size: 13px;

    &:focus {
        outline: none;
    }
`

export const NotiBoard = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: calc(100vh - 110px);
`