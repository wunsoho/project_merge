import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import * as B from './Detail.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow_img from '../Image/DetailImage/NextArrow.png';
import PrevArrow_img from '../Image/DetailImage/PrevArrow.png';
import default_img from '../Image/DetailImage/defaultImg.png';
import Map from './Map';

function Detail1() {
  const location = useLocation();
  const { id } = location.state || {};
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);
  const navigate = useNavigate();
  const [facilityData, setFacilityData] = useState(null);
  const [facilityImages, setFacilityImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFacilityImages = async () => {
      try {
        const response = await fetch(`http://13.125.247.248:8080/api/v1/facility/${id}/img?page=1`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.result.list.length === 0) {
            setFacilityImages([default_img]);
          } else {
            setFacilityImages(data.result.list);
          }
        } else {
          console.error('Failed to fetch facility images');
        }
      } catch (error) {
        console.error('Error fetching facility images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilityImages();
  }, [id, Token]);
  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const settings2 = {
    infinite: false,
    speed: 500, 
    slidesToShow: 1 ,
    slidesToScroll: 1,
    centerMode : true,
  };
  const AVR_RATE = 82;
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (AVR_RATE * 70) / 100;
        let idx = 0;
        while (starVerScore > 14) {
            tempStarRatesArr[idx] = 14;
            idx += 1;
            starVerScore -= 14;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };
    useEffect(() => {
        setRatesResArr(calcStarRates())
    }, [])
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
  
        if (scrollPosition >= pageHeight) {
          console.log('스크롤이 페이지 끝에 도달했습니다!');
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const onClickButton1 = () => {
        navigate(`/status`, {
          state: {
            Token : Token,
          },
        });
    };

    const onClickButton2 = () => {
        navigate(`/facility/${id}/reserve1`, {
          state: {
            Token : Token,
            buildingName: facilityData.buildingName,
            name: facilityData.name,
            location: facilityData.location,
            id: id,
          },
        });
    };
    const onClickReviewButton = () => {
      navigate(`/review`, {
        state: {
          Token : Token,
          id : id
        },
      });
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://13.125.247.248:8080/api/v1/facility/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Token}`
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setFacilityData(data.result);
            console.log(data);
          } else {
            console.error('Failed to fetch facility data');
          }
        } catch (error) {
          console.error('Error fetching facility data:', error);
        }
      };
  
      fetchData();
    }, [id, Token]);
    useEffect(() => {
    }, [facilityData]);
  return (
    <B.Body>
     <B.ImageSlider>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Slider {...settings1}>
            {facilityImages.length > 0 ? (
              facilityImages.map((item, index) => (
                <div key={index} className="slide-container">
                  <img className="img" src={item} alt={`facility${index + 1}`} />
                </div>
              ))
            ) : (
              <div className="slide-container">
                <img className="img" src={default_img} alt="이미지가 없습니다" />
              </div>
            )}
          </Slider>
        )}
      </B.ImageSlider>
      <B.All>
        <B.TextContainer>
          <B.TitleText>{facilityData && facilityData.buildingName}</B.TitleText>
          <B.Number>{facilityData && facilityData.name}</B.Number>
          <B.Time>이용가능시간 {facilityData && facilityData.hours[0] &&
          `${facilityData.hours[0].openingTime} - ${facilityData.hours[0].closingTime}`}</B.Time>
        </B.TextContainer>
        <B.ReviewWrap>
          <B.StarRateWrap>
              {STAR_IDX_ARR.map((item, idx) => {
                  return <span className='star_icon' key={`${item}_${idx}`}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='7' height='10' viewBox='0 0 14 13' fill='#cacaca'>
                          <clipPath id={`${item}StarClip`}>
                              <rect width={`${ratesResArr[idx]}`} height='10' />
                          </clipPath>
                          <path
                              id={`${item}Star`}
                              d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                              transform='translate(-2 -2)'
                          />
                          <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#FFBE55'
                          />
                      </svg>
                  </span>
              })
              }
              <B.StarText>4.1</B.StarText>
          </B.StarRateWrap>
          <B.ReviewButton>
            <button className = "button1" onClick = {onClickReviewButton}>{'리뷰 86개 전체보기 >'}</button>
          </B.ReviewButton>
        </B.ReviewWrap>
      </B.All>
      <B.ReviewSilder>
        <Slider {...settings2}>
          {facilityData && facilityData.reviews && facilityData.reviews.map((item) => (
            <div key={item.id}>
              <B.ReviewContainer>
                <div className="review-slide">
                  <B.ImageContainer>
                    <img className = "img12" src={item.imageURL} alt={`facility${item.id}`} />
                    <B.ReviewInfo>
                      <div className ="nickName">{item.nickname}</div>
                      <B.ReviewDate>{item.date}</B.ReviewDate>
                    </B.ReviewInfo>
                    <B.StarRateWrap2>
                      {STAR_IDX_ARR.map((item, idx) => {
                          const score = facilityData.reviews && facilityData.reviews.length > 0
                              ? facilityData.reviews.reduce((sum, review) => sum + review.score, 0) / facilityData.reviews.length
                              : 0;
                          const starWidth = (score * 70) / 100;
                          return (
                              <span className='star_icon' key={`${item}_${idx}`}>
                                  <svg xmlns='http://www.w3.org/2000/svg' width='7' height='10' viewBox='0 0 14 13' fill='#cacaca'>
                                      <clipPath id={`${item}StarClip`}>
                                          <rect width={`${starWidth}`} height='10' />
                                      </clipPath>
                                      <path
                                          id={`${item}Star`}
                                          d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                                          transform='translate(-2 -2)'
                                      />
                                      <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#FFBE55'
                                      />
                                  </svg>
                              </span>
                          );
                      })}
                      </B.StarRateWrap2>
                  </B.ImageContainer>
                  <B.ReviewDetail>{item.body}</B.ReviewDetail>
                </div>
              </B.ReviewContainer>
            </div>
          ))}
        </Slider>
      </B.ReviewSilder>
      <B.MapInfo>
        <B.DetailTitle>세부 위치</B.DetailTitle>
        <B.DetailContent>{facilityData && facilityData.location}</B.DetailContent>
        <B.Map>
          <Map latitude={facilityData && facilityData.latitude} longitude={facilityData && facilityData.longitude} />
        </B.Map>
      </B.MapInfo>
      <B.LocationData>
        {[
          { title: '주요 목적', content: facilityData && facilityData.purpose },
          { title: '이용 가능 물품', content: facilityData && facilityData.item },
          { title: '이용 주의사항', content: facilityData && facilityData.caution },
        ].map((item, index) => (
          <DetailDataItem key={index} title={item.title} content={item.content} />
        ))}
      </B.LocationData>
      <B.ButtonContainer>
      <B.Button1 key={1} onClick={() => onClickButton1()}>
          예약현황
        </B.Button1>
        <B.Button2 key={2} onClick={() => onClickButton2()}>
          예약하기
        </B.Button2>
      </B.ButtonContainer>
    </B.Body>
  );
}

function DetailDataItem({ title, content }) {
  return (
    <B.DataContainer>
      <B.DetailTitle>{title}</B.DetailTitle>
      <B.DetailContent>{content}</B.DetailContent>
    </B.DataContainer>
  );
}

const NextArrow = ({ onClick }) => {
    return (
      <B.ArrowContainer right="true" onClick={onClick}>
        <img src={NextArrow_img} alt="Next" />
      </B.ArrowContainer>
    );
  };
  
  const PrevArrow = ({ onClick }) => {
    return (
      <B.ArrowContainer left="true" onClick={onClick}>
        <img src={PrevArrow_img} alt="Prev" />
      </B.ArrowContainer>
    );
  };


export default Detail1;