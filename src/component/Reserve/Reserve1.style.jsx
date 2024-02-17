import styled from 'styled-components';

export const Body = styled.div`
  overflow-x : hidden;
  max-width: 960px;
  width: 100%;
`
export const Back = styled.div`
    display : flex;
    margin-top : 2.5vh;
    .Backbutton {
        background-color : #ffffff;
        border : none;
    }
    .title { 
        font-size : 1.3em;
        margin-left : 35vw;
        font-weight : bold;
    }
`
export const DayTitle = styled.div`
    display : flex;
    margin-top : 1.5vh;  
    margin-left : 5vw;
    .title { 
        margin-top : 0.5vh;   
        font-weight : bold;
    }
`
export const InfoContainer = styled.div`
    margin-top : 3vh;
    margin-left : 5vw;
    display: flex;
    align-items : center;
`
export const InfoImg = styled.div`
`
export const Info = styled.div`
    margin-bottom : 1vh;
    margin-left : 5vw;
`
export const InfoTitle = styled.div`
    font-weight : bold;
    font-size : 1.1em;
`
export const InfoLocation = styled.div`
`
export const line = styled.div`
    margin-top : 2vh;
    .hr{
        background:#e2e2e2;
        height:0.1vh;
        border:0;
    }
`

export const CalContainer = styled.div`
    width : 85vw;
    margin-left : auto;
    margin-right : auto;
`
export const timeContainer = styled.div`
    display : flex;
    align-items: center;
    margin-top : 5vh;  
    margin-left : 3vw;
    font-size : 0.8em;
    .title {
        font-size : 1.3em;
        font-weight : bold;
    }
    .img1 {
        margin-left : 3vw;
    }
    .img2 { 
        margin-left : 3vw;
    }
`
export const peopleContainer = styled.div`
    display : flex;
    align-items: center;
    margin-top : 5vh;
    margin-left : 3vw;
    .title {
        font-size : 1.1em;
        font-weight : bold;
    }
    .minus {
        margin-left : 35vw;
        border : none;
        border-radius: 50%;
    }
    .counter {
        margin-left : 8vw;
        font-weight : bold;
    }
    .plus {
        margin-left : 8vw;
        border : none;
        border-radius: 50%;
    }
`
export const AlarmContainer = styled.div`
    display : flex;
    align-items: center;
    margin-top : 5vh;
    margin-left : 3vw;
    .title {
        font-size : 1.1em;
        font-weight : bold; 
    }
    .togle {
        margin-top : 1vh;
        margin-left : 55vw;
    }   
`

export const timeButton = styled.div`
    margin-left : 3vw;
`
export const AlarmButton = styled.div`
    margin-left : 3vw;
`
export const SlideContainer = styled.div`
    .slide-container {
        margin-top : 1vh;
        width : 96px;
        height : 38px;
        margin-right: 3vw;
        border-radius : 4vw;
        border : none;
        background-color : #F1F1F1;
        &.selected {
            background-color: #1FBC70; 
            color: #ffffff; 
        }
    }
`
export const ConfirmButton = styled.div`
    margin-top : 7vh;
    margin-bottom : 3vh ;
    width : 95vw;
    height : 7vh;
    background-color : #BBBBBB;
    border-radius : 5vw;
    display : flex;
    align-items : center;
    justify-content : center;
    font-weight : bold;
    margin-left : auto;
    margin-right : auto;
    &.active {
        background-color: #1FBC70;
        color: #ffffff; 
      }
`