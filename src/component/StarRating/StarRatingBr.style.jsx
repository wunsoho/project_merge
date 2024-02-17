import styled from 'styled-components';

export const ScoreContainer = styled.div`
display: flex;
flex-direction: column;
.review-item {
    display: flex;
    align-items: center;
  }
  
  .bar {
    margin-bottom : 0.5vh;
    display: flex;
    flex-direction: row-reverse;
    width: 40vw;
  }
  
  .empty-bar {
    flex: 1;
    height: 0.8vh;
    background-color: #d9d9d9;
  }
  
  .filled-bar {
    height: 0.8vh;
    background-color: #FFBE55;
  }
  
  .rating {
    margin-right : 1vw;
  }
` 