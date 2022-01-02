import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ReviewsSidebar from './RatingsComponents/ReviewsSidebar/ReviewsSidebar.jsx';
import ReviewsList from '../components/RatingsComponents/ReviewsList/ReviewsList.jsx';
import { token } from '/config.js';

function Ratings ({product_Id, productName}) {
  const [productReviews, setProductReviews] = useState({});
  const [sort, setSort] = useState('relevant');

  useEffect(() => {
    const url = `http://127.0.0.1:3000/reviews`;
    const params = {product_id: product_Id, count: 50, sort : sort};
    const fetchReviews = async () => {
      const getReviews = await Axios.get(url, {
        params: params
      });
      const reviews = await getReviews.data;
      setProductReviews(reviews);
    };
    fetchReviews();
  }, [sort]);

  const [characteristics, setCharacteristics] = useState({});
  const [factors, setFactors] = useState([]);

  useEffect(() => {
    const url = `http://127.0.0.1:3000/reviews/meta?product_id=${product_Id}`;

    const fetchMeta = async () => {
      const getMetaData = await Axios.get(url, {
        headers: {
          'Authorization': token
        }
      });
      const data = await getMetaData.data.characteristics;
      await setCharacteristics(data);
      let factorsData = [];
      for (const factor in data) {
        factorsData.push(factor)
      }
      setFactors(factorsData);
    };
    fetchMeta();
  }, []);

  const handleChangeSort = (sortedBy) => {
    setSort(sortedBy);
    console.log('this was sorted:::', sortedBy);
  };

  return (
      <div className='reviews'>
        <h3>{`Ratings & Reviews`}</h3>
        <div className='reviews-features'>
          {productReviews.product !== undefined ?
          <ReviewsSidebar
            className='reviews-sidebar'
            productId={productReviews.product}/> : null}
          <ReviewsList
            className='reviews-list'
            reviews={productReviews}
            factors={factors}
            productName={productName}
            characteristics={characteristics}
            product_Id={product_Id}
            handleChangeSort={handleChangeSort}/>
        </div>
      </div>
  )
}


export default Ratings;