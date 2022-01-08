import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
const { localhost } = require('/config.js');

const YourOutfit = (props) => {

  const outfit = props.outfit;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${localhost}/products/`)
      .then(products => products.data.filter(product => outfit.includes(product.id)))
      .then(filteredProducts => setProducts(filteredProducts));
  }, []);

  return (<div>
    <h3>
    Your Outfit
    </h3>
    <button addToOutfit={props.addToOutfit}>Add to Outfit</button>
    <div className='related-products' >
      {products.length !== 0 ?
        products.map(product => (
          <OutfitCard
            product = {product}
            key = {product.id}
            relatedClickHandler = {props.relatedClickHandler}
          />
        ))
        : null}
    </div>

  </div>);
};

export default YourOutfit;