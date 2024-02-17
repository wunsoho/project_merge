import styled from 'styled-components';

export const Back = styled.div`
    display : flex;
    margin-top : 3vh;
    .Backbutton {
        margin-left : 3vw;
        background-color : #ffffff;
        border : none;
    }
    .title { 
        font-size : 1.2em;
        margin-left : 30vw;
        font-weight : bold;
    }
`
export const DayContainer = styled.div`
margin-top : 3vh;
margin-left : 3vw;
.title{
margin-left : 2vw;
font-weight : bold;
font-size : 1.2em;
}
`
export const TimeContainer = styled.div`
display : flex;
margin-top : 2vh;
.time{
margin-top : 1.5vh;
margin-left : 3vw;
font-size : 0.8em;
}
.v-line {
    margin-left : 4.5vw;
    border-left : thick solid #5ABD8D;
    height : 7vh;
}
.v-line2 {
margin-left : 3vw;
border-left : thick solid #5ABD8D;
height : 5vh;
}
`
export const Time = styled.div`
margin-top : 1.5vh;
margin-left : 3vw;
font-size : 0.8em;
`
export const Time2 = styled.div`
margin-top : 0.5vh;
margin-left : 3vw;
font-size : 0.8em;
`
export const Info = styled.div`
max-width : 960px;
width : 100%;
background-color : #FFFFFF;
margin-left : 3vw;
margin-right : 3vw;
border-radius : 3vw;
padding : 2vw;
border: 1px solid #ccc;
box-shadow : 0px 0px 10px rgba(0, 0, 0, 0.1);
.title{
    margin-top : 0.5vh;
    margin-left : 3vw;
    font-size : 1em;
}
.content{
    margin-left : 3vw;
    font-size : 0.8em;
}
`