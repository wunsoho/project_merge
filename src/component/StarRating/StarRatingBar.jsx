import React from 'react';
import * as B from './StarRatingBr.style';

const StarRatingBar = ({ reviews }) => {
  const barScores = [5, 4, 3, 2, 1];

  const calculateBarWidth = (score) => {
    const totalReviews = reviews.length;
    const scoreCount = reviews.filter((review) => review.score === score).length;

    if (totalReviews === 0 || scoreCount === 0) {
      return { width: 0, count: 0 };
    }

    return {width : (scoreCount / totalReviews) * 100, count: scoreCount };
  };
  return (
    <B.ScoreContainer>
      {barScores.map((barScore, index) => (
        <div key={index} className="review-item">
          <div className="rating">{barScore}점</div>
          <div className="bar">
            <div className={`empty-bar`}></div>
            {reviews && reviews.length > 0 && (
                <div
                  className={`filled-bar`}
                  style={{
                    width: `${calculateBarWidth(barScore).width}%`,
                  }}
                ></div>
            )}
          </div>
          <div className="review-count">{calculateBarWidth(barScore).count}개</div> 
        </div>
      ))}
    </B.ScoreContainer>
  );
};

export default StarRatingBar;