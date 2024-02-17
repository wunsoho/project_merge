import styled from 'styled-components';

export const Body = styled.div`
  overflow-x : hidden;
  max-width: 960px;
  width: 100%;
`
const ArrowContainer = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  ${({ right }) => (right ? 'right: 0;' : 'left: 0;')}
  z-index: 1;
`;

ArrowContainer.shouldForwardProp = prop => prop !== 'right' && prop !== 'left';

export { ArrowContainer };

export const TextContainer = styled.div`
  width : 70vw;
  margin-left : 3vw;
  margin-top : 1vh;
`
export const TitleText = styled.div`
  font-size : 1.2em;
  font-weight : bold;
`
export const Number = styled.div`
  font-weight : bold;
`
export const Time = styled.div`
  margin-top : 10px;
  font-size : 0.8em;
  color : #626262;
`
export const All = styled.div`
  display : flex;
`
export const StarRateWrap = styled.div`
  margin-top : 2vh;
  margin-left : 16vw;
  width: 100%;
  .star_icon {
    display: inline-flex;
    margin-right: 1px;
  }
`
export const ReviewButton = styled.div`
  margin-top : 2.5vh;
  .button1 {
    border: none;
    background-color : #ffffff;
  }
`
export const StarText = styled.div`
  display : inline-block;
  margin-left : 1.5vw;
  font-size : 0.8em;
  color : #FFBE55;
`
export const ReviewWrap = styled.div`
  width : 40vw;
` 
export const ImageSlider = styled.div`
.img{
  max-width : 960px;
  width : 100%;
}
`

export const ReviewSilder = styled.div`
  margin-top : 2.5vh;
  .review-slide{
    padding : 0.8em;
    height : 10vh;
    border: 1px solid #ccc;
    box-shadow : 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8vw; 
    overflow: hidden; 
  }
`
export const ReviewDate = styled.div`
  font-size : 0.8em;
  color : #B1B1B1;
`
export const ReviewInfo = styled.div`
  margin-left : 1vw;
  .nickName {
    width : 20vw;
  }
`
export const StarRateWrap2 = styled.div`
  margin-left : 30vw;
  margin-bottom : 1.5vh;
  width: 100%;
  .star_icon {
    display: inline-flex;
    margin-right: 0.2vw;
  }
`

export const ReviewContainer = styled.div`
`

export const ReviewDetail = styled.div`
  font-size : 0.8em;
  margin-top : 1vh;
`
export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  .img12{
    height : 3vh;
    border-radius : 3vw;
  }
`

export const MapInfo = styled.div`
  margin-top : 2vh;
`
export const DetailTitle = styled.div`
  margin-left : 3.5vw;
  font-size : 0.9em;
  color : #B1B1B1;
`
export const DetailContent = styled.div`
  margin-left : 3.5vw;
  margin-top : 0.8vh;
  font-size : 0.8em;
`
export const Map = styled.div`
  margin-top : 1vh;
`
export const LocationData = styled.div`
`
export const DataContainer = styled.div`
  margin-top : 2vh;
`
export const Button1 = styled.div`
  width : 45vw;
  height : 4.5vh;
  font-size : 0.9em;
  border: 0.2vw solid #1FBC70;
  border-radius: 7vw;
  text-align : center;
  display: flex;
  align-items: center;
  justify-content : center; 
`
export const Button2 = styled.div`
  margin-left : 2vw;
  width : 45vw;
  height : 4.5vh;
  font-size : 0.9em;
  color : #FFFFFF;
  background-color : #1FBC70;
  border-radius: 7vw;
  text-align : center;
  display: flex;
  align-items: center;
  justify-content : center;  
`
export const ButtonContainer = styled.div`
  display : flex;
  margin-top : 5vh;
  margin-left : 4vw;
  margin-bottom : 4vh;
  `