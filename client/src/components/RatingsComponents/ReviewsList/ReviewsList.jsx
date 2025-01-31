import React from 'react';
import { useState } from 'react';
import ReviewTile from './ReviewTile.jsx';
import ReviewsListSorting from './ReviewsListSorting.jsx';

function ReviewsList ({reviews}) {
  return (
    <div className='reviews-list'>
      <ReviewsListSorting reviewsNum={reviews.count}/>
      <div className='reviews-list-tiles'>
        {reviews?.results?.map((review) => {
          return <ReviewTile
            rating={review.rating}
            key={review.review_id}
            user={review.reviewer_name}
            time={review.date}
            body={review.body}
            summary={review.summary}
            recommend={review.recommend}
            response={review.response}
            photos={review.photos}
            helpfulness={review.helpfulness}
            reviewId={review.review_id}/>
        })}
      </div>
      <div className='review-list-buttons-container'>
        <button>Add Review</button>
        <button>Add Review</button>
      </div>
    </div>
  )
}


export default ReviewsList;