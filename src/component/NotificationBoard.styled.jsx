import styled from "styled-components";

export const NotiBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const NotiBoardSimple = styled.div`
    display: flex;    
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1.5px solid #F1F1F1;
    padding: 0 15px;
`

export const NotiTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`

export const NotiDate = styled.p`
    font-size: 11px;
    margin-bottom: 15px;
`