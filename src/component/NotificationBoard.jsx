import React from "react";
import { NotiBoardContainer, NotiBoardSimple, NotiTitle, NotiDate } from "./NotificationBoard.styled"

const NotiBoard = ({ title, date }) => {

  return (
    <NotiBoardContainer>
      <NotiBoardSimple>
        <NotiTitle>{title}</NotiTitle>
        <NotiDate>{date}</NotiDate>
      </NotiBoardSimple>
    </NotiBoardContainer>
  );
};

export default NotiBoard;