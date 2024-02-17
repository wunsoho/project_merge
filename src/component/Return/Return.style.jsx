import styled from 'styled-components';

export const Body = styled.div`
  overflow-x : hidden;
  max-width: 960px;
  width: 100%;
`
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
export const SlideContainer = styled.div`
.capture{
    width : 25vw;
    height : 15vh;
    margin-right : 3vw;
}
`
export const ReturnContainer = styled.div`
background-color : #FFFFFF;
border-radius : 5vw;
border: 0.2vw solid #ccc;
box-shadow : 0px 0px 10px rgba(0, 0, 0, 0.1);
margin-top : 2vh;
margin-left : 3vw;
margin-right : 3vw;
.Info{
    margin-top : 3.5vh;
    margin-left : 3vw;
}
.InfoTitle{
    margin-bottom : 0.5vh;
    font-size : 1.2em;
    font-weight : bold;
}
`
export const imageContainer = styled.div`
margin-top : 2vh;
margin-left : 3vw;
.Imgtitle{
    font-size : 0.8em;
    color : #BBBBBB;
}
`
export const container1 = styled.div`
display : flex;
`
export const container2 = styled.div`
margin-top : 1vh;
margin-left : 3vw;
margin-bottom : 1vh;
.caImg{
    margin-right : 3vw;
}
.cab{
    justify-content : center;
    align-items : center;
    display : flex;
    margin-top : 0.5vh;
    width : 85vw;
    height : 5vh;
    border : none;
    border-radius : 4vw;
    color : #ffffff;
    background-color : #5ABD8D;
}
.caimg {
    margin-right : 3vw;
}
.capture{
    margin-top : 1vh;
    margin-left : 1vw;
    border-radius : 1vw;
}
`
export const CheckContainer = styled.div`
margin-left : 3vw;
margin-right : 3vw;
margin-top : 2vh;
background-color : #FFFFFF;
border-radius : 5vw;
border: 1px solid #ccc;
box-shadow : 0px 0px 10px rgba(0, 0, 0, 0.1);
.title{
    margin-top : 2vh;
    text-align : center;
}
.Info1{
    font-size : 1em;
}
.Info2{
    margin-top : 0.5vh;
    font-size : 0.7em;
}
.check1,
.check2,
.check3{
    margin-top : 2vh;
    margin-left : 5vw;
    display : flex;
}
.check4{
    margin-top : 2vh;
    margin-left : 5vw;
    margin-bottom : 3vh;
    display : flex;
}
.box1,
.box2,
.box3,
.box4{
    width : 5vw;
    height : 2vh;
}
`
export const returnButton = styled.div`
margin-top : 1vh;
margin-bottom : 3vh ;
width : 95vw;
height : 7vh;
background-color : #1FBC70;
color : #ffffff;
border-radius : 5vw;
display : flex;
align-items : center;
justify-content : center;
font-weight : bold;
margin-left : auto;
margin-right : auto;
`