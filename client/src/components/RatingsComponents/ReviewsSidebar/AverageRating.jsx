import React from 'react';

function AverageRating ({ratings}) {

  const calculateRating = (ratingsObj) => {
    let result = 0;
    let totalVotes = 0;
    for (const key in ratingsObj) {
      let currVal = parseInt(ratingsObj[key]);
      let currKey = parseInt(key);
      totalVotes+= currVal;
      result+= (currVal * currKey);
    }
    let roundedResult = Math.round((result/totalVotes) * 10) / 10;
    return roundedResult;
  }

  return (
    <div className='average-rating-container'>
      <div className='numerical-rating'>{`${calculateRating(ratings)}`}</div>
      <div className='stars-average'>Average Stars will go here</div>
    </div>
  )
}

export default AverageRating;