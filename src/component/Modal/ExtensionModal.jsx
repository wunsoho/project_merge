import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Modal/Modal.style';
import * as B from './Modal.style';
import ModalImg from '../Image/MainImage/ModalImage.png'

const Modal = ({ isOpen, onClose  }) => {
    const navigate = useNavigate();
    const handleModalClick = () => {    
      if (isOpen) {
        return null;
      }
    };
    const handleStatusBottomClick = () => {
      navigate('/status')
    }
    const handleClose = () => {
      localStorage.setItem('modalClosed', 'true');
      onClose();
      navigate('/main');
    };
  return (  
    <>
      {isOpen && (
        <B.modaloverlay onClick={handleModalClick}>
          <B.ModalTotal>
              <B.ModalHeader>
                홍길동님의 {'<'}<B.GreenText>학생회관 소강당</B.GreenText>{'>'} <br/> 예약이 연장되었습니다.
              </B.ModalHeader>
              <B.ModalContent>
                <span className="close-btn" onClick={handleClose}>&times;</span>
                <img className = "img" src = {ModalImg} alt = "모달이미지"/>
                <B.ModalInfo>
                  <div className = "title">학생회관 소강당</div>
                  <div className = "location">22호관 지하 1F</div>
                  <div className = "time">이용일자 : 2024-01-23<br/>이용시간 : 10:00~10:59</div>
                </B.ModalInfo>
                <B.Button>
                  <button className = "button" onClick ={handleStatusBottomClick}>예약내역</button>
                </B.Button>
            </B.ModalContent>
          </B.ModalTotal>
        </B.modaloverlay>
      )}
    </>
  );
};

export default Modal;