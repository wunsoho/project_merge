import React, { useState, useEffect } from 'react';
import * as A from './Main.style';
import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavigationBar from "../Navi/NavigationBar";
import facility2 from "../Image/MainImage/facility2.png";
import facility3 from "../Image/MainImage/facility3.png";

const ImgWrapper = styled.div`
padding: 20px;
text-align: center;

& img {
    margin: 0 auto;
}
`;

function Main() {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const navigate = useNavigate();
    const [Token, setToken] = useState('');

    useEffect(() => {
      const storedToken = localStorage.getItem("Token");
      setToken(storedToken);
      console.log(storedToken);
    }, []);

    const categories = ['#조용한', '#회의', '#팀플', '#스터디룸', '#프린트'];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500, 
        slidesToShow: 1 ,
        slidesToScroll: 1,
        centerMode : true,
        centerPadding : '100px',
    };

    const onClickImg = (id) => {
        navigate(`/facility/${id}`, {
            state : {id}
        });
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const handleReturnClick = () => {
        navigate(`/return`);
    };
    const handleExtensionClick = () => {
        navigate(`/extension`);
    }
    const handleAlarmClick = () => {
        navigate(`/Alarm`);
    };
    const handleHistoryClick = () => {
        navigate(`/history`);
    };
    const handleInfoClick = () => {
        navigate(`/Info`);
    };

    const facilityData = [
        { id: 1, title: "11호관 커피", poster_path: facility2 },
        { id: 2, title: "휴게실", poster_path: facility2 },
        { id: 3, title: "북카페", poster_path: facility3 },
        { id: 4, title: "북카페", poster_path: facility3 },
        { id: 5, title: "북카페", poster_path: facility3 },
    ];

    return (
        <A.Body>
            <A.Text>
                <A.GreenText>김연지</A.GreenText>님, 오늘은
                <br></br>
                <div>이런 시설 어때요 ?</div>
            </A.Text>
            <A.Tag>
                {categories.map(category => (
                    <A.button
                        className='CircleButt'
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{ marginRight: '3px', marginBottom: '3px', padding: '2px 4px', 
                        cursor: 'pointer', backgroundColor: selectedCategory === category ? '#d3d3d3' : 'initial',
                        color: selectedCategory === category ? 'green' : 'black'}}
                    >
                    {category}  
                    </A.button>
                ))}
            </A.Tag>
            <A.container>
                <A.CustomSlider {...settings}>
                    {facilityData.map((item) => (
                        <A.component key={item.id} onClick={() => onClickImg(item.id)}>
                            <ImgWrapper>
                                <img src={item.poster_path} alt={`facility${item.id}`}/>
                                <div style={{ textAlign: 'center' }}>{item.title}</div>  
                            </ImgWrapper>  
                        </A.component>
                    ))}
                </A.CustomSlider>
            </A.container>
            <A.Button1 onClick = {handleReturnClick}>반납하기</A.Button1>
            <A.Button1 onClick = {handleExtensionClick}>연장하기</A.Button1>
            <A.Button1 onClick = {handleAlarmClick}>알람</A.Button1>
            <A.Button1 onClick = {handleHistoryClick}>예약 내역</A.Button1>
            <A.Button1 onClick = {handleInfoClick}>상세 정보</A.Button1>
            <NavigationBar Token={Token}/>
        </A.Body>
    );
}

export default Main;