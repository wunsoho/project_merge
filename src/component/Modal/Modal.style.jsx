import styled from 'styled-components';

export const modaloverlay = styled.div`
max-width: 960px;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
  .close-btn {
    position: absolute;
    margin-left : 75vw;
    top : 8vh;
    font-size : 4em;
    cursor: pointer;
  }
`
export const ModalTotal = styled.div`
`
export const ModalContent = styled.div`
  background: white;
  border-radius: 5vw;
  .img{
    max-width : 960px;
    width : 100%;
  }
`
export const Button = styled.div`
text-align : center;
.button{
  background-color : white;
  border-color : #1FBC70;
  border-radius : 5vw;
  margin-left : auto;
  margin-right : auto;
  width : 75vw;
  height : 5vh;
  margin-top: 2.5vh; 
  margin-bottom: 1vh;
}
`
export const ModalInfo = styled.div`
margin-top : 2vh;  
margin-left : 5vw;
.title{
  font-size : 1.2em;
  font-weight : bold;
}
.location {
  font-size : 1em;
}
.time {
  margin-top : 1.5vh;
  color : #FFBE55;
}
`
export const ModalHeader = styled.div`
  background-color : transparent;
  text-align : center;
  margin-bottom : 4vh;
  color: white;
`;
export const GreenText = styled.div`
  display : inline-block;
  color : green;
`