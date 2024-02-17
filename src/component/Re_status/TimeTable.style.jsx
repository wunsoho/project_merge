import styled from 'styled-components'
export const Body = styled.div`
.timetable {
    max-width : 960px;
    width: 100%;
    border-collapse: collapse;
  }
  
  .timetable th, .timetable td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  .timetable td {   
    height: 3vh; /* 셀의 높이를 조절하거나 원하는 크기로 지정하세요 */
  }
  
  .course {
    border: 1px solid #ffffff;
    text-align: center;
  }
  
  .course p {
    margin: 0;
  }
`