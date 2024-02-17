import styled from "styled-components";

export const FAQBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const FAQBoardSimple = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #F1F1F1;
    padding: 5px 15px;
`

export const FAQTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
`

export const ExpandButton = styled.div`
    color: #BBBBBB;
`

export const FAQBoardDetail = styled.div`
    display: ${({ expanded }) => (expanded ? "block" : "none")};
    background-color: #F1F1F1;
    padding: 3px 15px;
`

export const FAQDetail = styled.p`
    font-size: 13px;
`