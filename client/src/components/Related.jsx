import React from 'react';
import RelatedProducts from './Related/RelatedProducts.jsx';
import YourOutfit from './Related/YourOutfit.jsx';

class Related extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (<div id='Related'>
      <RelatedProducts
        relatedClickHandler = {this.props.relatedClickHandler}
        product_Id = {this.props.product_Id}
        mainProductName = {this.props.product_name}/>
      <YourOutfit
        outfit = {this.props.outfit}
        addToOutfit = {this.props.addToOutfit}
      />
    </div>);
  }
}

export default Related;