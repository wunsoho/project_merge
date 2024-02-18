import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as B from './Return.style';
import Back from '../Image/ReserveImage/back.png';
import Img1 from '../Image/ReturnImage/Img1.png';
import camera from '../Image/ReturnImage/Camera1.png';
import NavigationBar from "../Navi/NavigationBar";
import Slider from 'react-slick';
import axios from 'axios';
import Modal from '../Modal/ReturnModal';

const Return = () => {
  const [file,setFile] = useState()
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [checkList, setCheckList] = useState({
    checkList1: false,
    checkList2: false,
    checkList3: false,
    checkList4: false,
  });
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);
  const handleGoBack = () => {
    navigate(`/main`);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const onChangeImg = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      const newPhotos = Array.from(selectedFiles).slice(0, 5).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
        });
      });

      Promise.all(newPhotos).then((results) => {
        const updatedPhotos = [...photos, ...results.slice(0, 5)];

        if (updatedPhotos.length > 5) {
          console.log('이미지는 최대 5개까지만 업로드 가능합니다.');
          return;
        }

        setPhotos(updatedPhotos);
      });
    }
    e.preventDefault();
    const formData = new FormData();
    
    
    if(e.target.files){
      const uploadFile = e.target.files[0]
      formData.append('image',uploadFile)
      setFile(uploadFile)
      console.log(uploadFile)
      console.log('===useState===')
      console.log(file)
    }
  }
  const onClickLogin2 = async (event) => {
    event.preventDefault();
  
    if (
      checkList.checkList1 &&
      checkList.checkList2 &&
      checkList.checkList3 &&
      checkList.checkList4
    ) {
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const returnDTO = {
          reservationId: 24,
          checkList1: checkList.checkList1,
          checkList2: checkList.checkList2,
          checkList3: checkList.checkList3,
          checkList4: checkList.checkList4,
        };
  
        formData.append(
          'returnDTO',
          new Blob([JSON.stringify(returnDTO)], { type: 'application/json' })
        );
  
        const result = await axios.post(
          'http://13.125.247.248:8080/api/v1/reservation/return',
          formData,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setIsOpenModal(true);
  
        console.log('post 요청 성공');
        console.log(result);
      } catch (error) {
        console.log('요청 실패');
        console.log(error);
      }
    } else {
      console.log('모든 체크박스를 체크해주세요.');
    }
  };


  const openCamera = () => {
    document.getElementById('photoFile').click();
  };

  const handleCheckListToggle = (listName) => {
    setCheckList((prevCheckList) => ({
      ...prevCheckList,
      [listName]: !prevCheckList[listName],
    }));
  };

  return (
    <div className="ReturnBody">
      <B.Body>
        <B.Back>
          <button onClick={handleGoBack} className="Backbutton">
            <img src={Back} alt="뒤로가기" />
          </button>
          <div className="title">반납하기</div>
        </B.Back>
        <B.ReturnContainer>
          <B.container1>
              <B.imageContainer>
                <img src={Img1} alt="반납 대표 사진" />
                <div className="Imgtitle">반납 사진 등록하기</div>
              </B.imageContainer>
              <div className="Info">
                <div className="InfoTitle">열린 열람실</div>
                <div>이용일 2023-12-24<br />이용시간 9:00~13:00</div>
              </div>
            </B.container1>
          <B.container2>
              <Slider {...sliderSettings}>
                  {photos.map((photo, index) => (
                  <B.SlideContainer key={index}>
                      <div>
                      <img className = "capture" src={photo} alt={`Selected ${index}`}/>
                      </div>
                  </B.SlideContainer>
                  ))}
              </Slider>
              <input
                  type="file"
                  name="photoFile"
                  id="photoFile"
                  accept="image/*"
                  capture="camera"
                  onChange={onChangeImg}
                  style={{ display: 'none' }}
                  multiple
              />
              <br />
              <button className="cab" onClick={openCamera}>
                  <img className ="caimg" src={camera} alt="반납 버튼" />반납 사진 촬영
              </button>
          </B.container2>
          <br />
          <div id="result"></div>
        </B.ReturnContainer>
        <B.CheckContainer>
          <div className="title">
            <div className="Info1">잠깐, 반납하기 전 확인하셨나요?</div>
            <div className="Info2">체크리스트를 작성하여 반납 전 다시 한 번 체크해보아요.</div>
          </div>
          <div className="check1">
            <input className = "box1" type="checkbox" checked={checkList.checkList1} onChange={() => handleCheckListToggle('checkList1')} />
            <div>소등은 하였나요?</div>
          </div>
          <div className="check2">
            <input className = "box1" type="checkbox" checked={checkList.checkList2} onChange={() => handleCheckListToggle('checkList2')} />
            <div>에어컨/히터는 종료하였나요?</div>
          </div>
          <div className="check3">
            <input className = "box1" type="checkbox" checked={checkList.checkList3} onChange={() => handleCheckListToggle('checkList3')} />
            <div>에어컨/히터는 종료하였나요?</div>
          </div>
          <div className="check4">
            <input className = "box1" type="checkbox" checked={checkList.checkList4} onChange={() => handleCheckListToggle('checkList4')} />
            <div>에어컨/히터는 종료하였나요?</div>
          </div>
        </B.CheckContainer>
        <B.returnButton onClick={onClickLogin2}>반납하기</B.returnButton>
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} Token={Token}/>
      </B.Body>
      <NavigationBar />
    </div>
  );
};

export default Return;