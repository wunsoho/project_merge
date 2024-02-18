import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as B from './Review.style';
import StarRatingBar from '../StarRating/StarRatingBar';

function Review() {
  const [showImages, setShowImages] = useState(true);
  const location = useLocation();
  const { id } = location.state || {};
  const [facilityData, setFacilityData] = useState(null);
  const [averageScore, setAverageScore] = useState(null);
  const [Token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  const calcStarRates = (score) => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (score * 20 * 70) / 100;
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://13.125.247.248:8080/api/v1/user/${id}/reviews/byFacility?page=1`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFacilityData(data.result);
          if (data.result && data.result.content && data.result.content.length > 0) {
            const totalScore = data.result.content.reduce(
              (accumulator, review) => accumulator + review.score,
              0
            );
            const averageScore = totalScore / data.result.content.length;
            setAverageScore(averageScore);
          }
        } else {
          console.error('Failed to fetch facility data');
        }
      } catch (error) {
        console.error('Error fetching facility data:', error);
      }
    };

    fetchData();
  }, [id, Token]);

  return (
    <div className="ReviewBody">
      <B.Title>리뷰 {facilityData?.totalElements || 0}개</B.Title>
      <B.StarWrapper>
        <div className="flex-container">
          <B.StarContainer>
            <B.StarTitle>평균 {averageScore !== null ? averageScore.toFixed(1) : '평점 없음'}</B.StarTitle>
            <B.AverageStar>
            {averageScore !== null ? (
              <>
                {calcStarRates(averageScore).map((rate, idx) => (
                  <span className="star_icon" key={`avg_star_${idx}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 14 13"
                      fill="#cacaca"
                    >
                      <clipPath id={`avg_starClip_${idx}`}>
                        <rect width={`${rate}`} height="20" />
                      </clipPath>
                      <path
                        id={`avg_star_${idx}`}
                        d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                        transform="translate(-2 -2)"
                      />
                      <use
                        clipPath={`url(#avg_starClip_${idx})`}
                        href={`#avg_star_${idx}`}
                        fill="#FFBE55"
                      />
                    </svg>
                  </span>
                ))}
              </>
            ) : (
              '평점 없음'
            )}
          </B.AverageStar>
          </B.StarContainer>
          <B.ScoreContainer>
            <div key="review-bars" className="review-item">
              <div className="bar">
                <StarRatingBar reviews={facilityData?.content || []} />
              </div>
            </div>
          </B.ScoreContainer>
        </div>
      </B.StarWrapper>
      <B.checkBox>
        <input
          type="checkbox"
          onChange={() => setShowImages(!showImages)}
        />
        <div>포토리뷰</div>
        <select className="sorting">
          <option>추천순</option>
          <option>최신순</option>
        </select>
      </B.checkBox>
      <B.ReviewContainer>
        {facilityData?.content?.map((review, index) => {
          const ratesResArr = calcStarRates(review.score);
          console.log("ratesResArr:", ratesResArr);
          return (
            <B.Review1 key={index}>
              <B.ImageContainer>
                <img className="img1" src={review.profileUrl} alt={`프로필 이미지`} />
                <B.ReviewInfo>
                  <div>{review.ownerNickname}</div>
                  <B.ReviewDate>{review.createdAt}</B.ReviewDate>
                </B.ReviewInfo>
                <B.StarRateWrap2>
                  <div className="score">{review.score}</div>
                  {ratesResArr.map((rate, idx) => (
                    <span className="star_icon" key={`${idx}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="7"
                        height="10"
                        viewBox="0 0 14 13"
                        fill="#cacaca"
                      >
                        <clipPath id={`starClip_${idx}`}>
                          <rect width="14" height="13" />
                        </clipPath>
                        <path
                          id={`star_${idx}`}
                          d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                          transform="translate(-2 -2)"
                        />
                        <use
                          clipPath={`url(#starClip_${idx})`}
                          href={`#star_${idx}`}
                          fill={rate > 0 ? "#FFBE55" : "#cacaca"}
                        />
                      </svg>
                    </span>
                  ))}
                </B.StarRateWrap2>
              </B.ImageContainer>
              <B.ReviewDetail>{review.body}</B.ReviewDetail>
              {showImages &&
                review.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    className={`img${index + 1}`}
                    src={imageUrl}
                    alt={`리뷰${review.id}-${index + 1}`}
                    width="80vw"
                    height="80vh"
                  />
                ))}
            </B.Review1>
          );
        })}
      </B.ReviewContainer>
    </div>
  );
}

export default Review;