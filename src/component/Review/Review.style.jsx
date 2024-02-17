import styled from 'styled-components';

export const Title = styled.div`
text-align : center;
font-size : 1.5em;
font-weight : bold;
margin-top : 3vh;
`
export const StarWrapper = styled.div`
background-color : #FFFFFF;
margin-top : 3vh;
margin-left : 3vw;
margin-right : 3vw;
border-radius : 5vw;
border: 1px solid #ccc;
box-shadow : 0px 0px 10px rgba(0, 0, 0, 0.1);
.star_icon {
    margin-top : 0.8vh;
    display: inline-flex;
    margin-right: 0.2vw;
  }
.flex-container {
    display : flex;
}
`
export const AverageStar = styled.div`
margin-left : 5vw;
`
export const StarContainer = styled.div`
margin-top : 5vh;
`
export const StarTitle = styled.div`
font-weight : bold;
margin-top : 2vh;
margin-left : 10vw;
`
export const ScoreContainer = styled.div`
margin-top : 1.5vh;
margin-left : 6vw;
margin-bottom : 1.5vh;
.review-item {
  font-size : 0.8em;
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  margin: 0.3vh;             
  }
.standard{
    margin-right : 1.5vw; 
}
.bar { 
    margin-top : 0.8vh;
    margin-right : 1.5vw; 
}
`
export const checkBox = styled.div`
margin-left : 60vw;
margin-top : 2vh;
display : flex;
font-size : 0.8em;
input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 4vw;
  height: 1.5vh;

  background-color: transparent; 
  border: 0.2vw solid #ccc; 

  &:checked {
    background-color: #5ABD8D; 
    border-color: #ccc; 
  }
}
.sorting {
  margin-left : 3vw;
  border: none;
}
.sorting option {
  background-color: #fffff;
  padding: 10px;
}
`
export const Review1 = styled.div`
background-color : #FFFFFF;
margin-top : 3vh;
margin-left : 3vw;
margin-right : 3vw;
border-radius : 5vw;
border: 1px solid #ccc;
box-shadow : 0px 0px 10px rgba(0, 0, 0, 0.1);
.img1{
  margin-left : 3vw;
  margin-top : 1vh;
  margin-bottom : 1.5vh;
}
.img2{
  margin-left : 1.5vw;
  margin-bottom : 1.5vh;
}
.img3{
  margin-left : 1.5vw;
  margin-bottom : 1.5vh;
}
.img4{
  margin-left : 1.5vw;
  margin-bottom : 1.5vh;
}
`
export const ReviewDate = styled.div`
  font-size : 0.8em;
  color : #B1B1B1;
`
export const ReviewInfo = styled.div`
`
export const StarRateWrap2 = styled.div`
  display : flex;
  margin-left : 40vw;
  margin-bottom : 3vh;
  width: 100%;
  .star_icon {
    margin-top : 0.3vh;
    display: inline-flex;
    margin-right: 0.2vw;
  }
  .score {
    color : #FFBE55;
    margin-right : 2vw;
    font-size : 0.8em;
  }
`
export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 1vw;
  }
  .img1{
    width : 10vw;
    height : 5vh;
  }
`
export const ReviewContainer = styled.div`
`

export const ReviewDetail = styled.div`
  font-size : 0.8em;
  margin-top : 1.4vh;
  margin-left : 4vw;
`