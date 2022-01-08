import React from 'react';
import StarRating from './OverviewComponents/StarRating.jsx';
import Reviews from './OverviewComponents/Reviews.jsx';
import axios from 'axios';
import StyleSelector from './OverviewComponents/StyleSelector.jsx';
import AddToCart from './OverviewComponents/AddToCart.jsx';
import ProductDescription from './OverviewComponents/ProductDescription.jsx';
import ImageGallery from './OverviewComponents/ImageGallery.jsx';
import MainImage from './OverviewComponents/MainImage.jsx';
import ExpandedView from './OverviewComponents/ExpandedView.jsx';
const { localhost } = require('/config.js');

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfReviews: null,
      rating: null,
      productName: null,
      productCategory: null,
      productPrice: null,
      thumbnails: [],
      images: null,
      styles: [],
      selectedStyle: 0,
      sizes: [],
      outOfStock: null,
      selectedSize: null,
      quantity: null,
      results: null,
      validATC: null,
      productDescription: null,
      productSlogan: null,
      salePrice: null,
      expandedView: null,
      currentIndex: 0

    };
  }

  componentDidMount() {
    axios.get(`${localhost}/reviews`, { params: { product_id: this.props.product_Id }})
      .then(res => {
        this.setState({numberOfReviews: res.data.results.length});

        var sum = 0;
        res.data.results.forEach(item => {
          sum += item.rating;
        });
        var rating = sum / (res.data.results.length);
        this.setState({rating: rating});
      });

    axios.get(`${localhost}/products/${this.props.product_Id}`)
      .then(res => {
        this.setState({productName: res.data.name});
        this.setState({productCategory: res.data.category});
        this.setState({productDescription: res.data.description});
        this.setState({productSlogan: res.data.slogan});
        this.setState({productPrice: res.data.default_price});

      });

    axios.get(`${localhost}/products/${this.props.product_Id}/styles`)
      .then(res => {
        // maintain styles API results in state, so that I can use it later in lifecycle
        this.setState({results: res.data.results});
        // initialize available sizes of default style
        var style = res.data.results[0];
        var styleSkus = style.skus;
        var sizesArr = [];
        for (var sku in styleSkus) {
          if (!sizesArr.includes(styleSkus[sku].size)) {
            sizesArr.push(styleSkus[sku].size);
          }
        }
        this.setState({sizes: sizesArr});
        // initialize quantity of default style and selected size
        var style = res.data.results[0];
        var styleSkus = style.skus;
        var quantity = 0;
        for (var sku in styleSkus) {
          if (styleSkus[sku].size === this.state.selectedSize) {
            quantity += styleSkus[sku].quantity;
          }
        }
        this.setState({quantity: quantity});
        // render thuumbnails and available sizes of default style
        var urls = [];

        var images = [];


        res.data.results.forEach( (style, i) => {
          urls.push( {url: style.photos[0]['thumbnail_url'], index: i});
          images.push( style.photos );
          this.setState({sale_price: style.sale_price});
        });
        this.setState({thumbnails: urls}, () => {
          this.setState({images: images });
        });

      });




  }

  componentWillReceiveProps() {
    axios.get(`${localhost}/reviews`, { params: { product_id: this.props.product_Id }})
      .then(res => {
        this.setState({numberOfReviews: res.data.results.length});

        var sum = 0;
        res.data.results.forEach(item => {
          sum += item.rating;
        });
        var rating = sum / (res.data.results.length);
        this.setState({rating: rating});
      });

    axios.get(`${localhost}/products/${this.props.product_Id}`)
      .then(res => {
        this.setState({productName: res.data.name});
        this.setState({productCategory: res.data.category});
        this.setState({productDescription: res.data.description});
        this.setState({productSlogan: res.data.slogan});
        this.setState({productPrice: res.data.default_price});

      });

    axios.get(`${localhost}/products/${this.props.product_Id}/styles`)
      .then(res => {
        // maintain styles API results in state, so that I can use it later in lifecycle
        this.setState({results: res.data.results});
        // initialize available sizes of default style
        var style = res.data.results[0];
        var styleSkus = style.skus;
        var sizesArr = [];
        for (var sku in styleSkus) {
          if (!sizesArr.includes(styleSkus[sku].size)) {
            sizesArr.push(styleSkus[sku].size);
          }
        }
        this.setState({sizes: sizesArr});
        // initialize quantity of default style and selected size
        var style = res.data.results[0];
        var styleSkus = style.skus;
        var quantity = 0;
        for (var sku in styleSkus) {
          if (styleSkus[sku].size === this.state.selectedSize) {
            quantity += styleSkus[sku].quantity;
          }
        }
        this.setState({quantity: quantity});
        // render thuumbnails and available sizes of default style
        var urls = [];

        var images = [];


        res.data.results.forEach( (style, i) => {
          urls.push( {url: style.photos[0]['thumbnail_url'], index: i});
          images.push( style.photos );
          this.setState({sale_price: style.sale_price});
        });
        this.setState({thumbnails: urls}, () => {
          this.setState({images: images });
        });

      });


  }


  // componentDidUpdate(prevProps) {
  //   // if (this.props.product_Id !== prevProps.product_Id) {
  //   //   console.log('prevProps', prevProps);
  //   // }
  //   // console.log('prevProps', prevProps);
  //   // console.log('this.props', this.props);

  //   axios.get('http://127.0.0.1:3000/reviews', { params: { product_id: this.props.product_Id }})
  //     .then(res => {
  //       this.setState({numberOfReviews: res.data.results.length});

  //       var sum = 0;
  //       res.data.results.forEach(item => {
  //         sum += item.rating;
  //       });
  //       var rating = sum / (res.data.results.length);
  //       this.setState({rating: rating});
  //     });

  //   axios.get(`http://127.0.0.1:3000/products/${this.props.product_Id}`)
  //     .then(res => {
  //       this.setState({productName: res.data.name});
  //       this.setState({productCategory: res.data.category});
  //       this.setState({productDescription: res.data.description});
  //       this.setState({productSlogan: res.data.slogan});
  //       this.setState({productPrice: res.data.default_price});

  //     });

  //   axios.get(`http://127.0.0.1:3000/products/${this.props.product_Id}/styles`)
  //     .then(res => {
  //       // maintain styles API results in state, so that I can use it later in lifecycle
  //       this.setState({results: res.data.results});
  //       // initialize available sizes of default style
  //       var style = res.data.results[0];
  //       var styleSkus = style.skus;
  //       var sizesArr = [];
  //       for (var sku in styleSkus) {
  //         if (!sizesArr.includes(styleSkus[sku].size)) {
  //           sizesArr.push(styleSkus[sku].size);
  //         }
  //       }
  //       this.setState({sizes: sizesArr});
  //       // initialize quantity of default style and selected size
  //       var style = res.data.results[0];
  //       var styleSkus = style.skus;
  //       var quantity = 0;
  //       for (var sku in styleSkus) {
  //         if (styleSkus[sku].size === this.state.selectedSize) {
  //           quantity += styleSkus[sku].quantity;
  //         }
  //       }
  //       this.setState({quantity: quantity});
  //       // render thuumbnails and available sizes of default style
  //       var urls = [];

  //       var images = [];


  //       res.data.results.forEach( (style, i) => {
  //         urls.push( {url: style.photos[0]['thumbnail_url'], index: i});
  //         images.push( style.photos );
  //         this.setState({sale_price: style.sale_price});
  //       });
  //       this.setState({thumbnails: urls}, () => {
  //         this.setState({images: images });
  //       });

  //     });

  // }



  // componentDidUpdate() {
  //   axios.get('http://127.0.0.1:3000/reviews', { params: { product_id: this.props.product_Id }})
  //     .then(res => {
  //       this.setState({numberOfReviews: res.data.results.length});

  //       var sum = 0;
  //       res.data.results.forEach(item => {
  //         sum += item.rating;
  //       });
  //       var rating = sum / (res.data.results.length);
  //       this.setState({rating: rating});
  //     });

  //   axios.get(`http://127.0.0.1:3000/products/${this.props.product_Id}`)
  //     .then(res => {
  //       this.setState({productName: res.data.name});
  //       this.setState({productCategory: res.data.category});
  //       this.setState({productDescription: res.data.description});
  //       this.setState({productSlogan: res.data.slogan});
  //       this.setState({productPrice: res.data.default_price});

  //     });

  //   axios.get(`http://127.0.0.1:3000/products/${this.props.product_Id}/styles`)
  //     .then(res => {
  //       // maintain styles API results in state, so that I can use it later in lifecycle
  //       this.setState({results: res.data.results});
  //       // initialize available sizes of default style
  //       var style = res.data.results[0];
  //       var styleSkus = style.skus;
  //       var sizesArr = [];
  //       for (var sku in styleSkus) {
  //         if (!sizesArr.includes(styleSkus[sku].size)) {
  //           sizesArr.push(styleSkus[sku].size);
  //         }
  //       }
  //       this.setState({sizes: sizesArr});
  //       // initialize quantity of default style and selected size
  //       var style = res.data.results[0];
  //       var styleSkus = style.skus;
  //       var quantity = 0;
  //       for (var sku in styleSkus) {
  //         if (styleSkus[sku].size === this.state.selectedSize) {
  //           quantity += styleSkus[sku].quantity;
  //         }
  //       }
  //       this.setState({quantity: quantity});
  //       // render thuumbnails and available sizes of default style
  //       var urls = [];

  //       var images = [];


  //       res.data.results.forEach( (style, i) => {
  //         urls.push( {url: style.photos[0]['thumbnail_url'], index: i});
  //         images.push( style.photos );
  //         this.setState({sale_price: style.sale_price});
  //       });
  //       this.setState({thumbnails: urls}, () => {
  //         this.setState({images: images });
  //       });

  //     });




  // }






  handleStyleClick(event) {

    // update available sizes upon clicking new style
    this.setState({selectedStyle: event.target.getAttribute('id')}, () => {
      var style = this.state.results[Number(this.state.selectedStyle)];
      var styleSkus = style.skus;
      var sizesArr = [];
      for (var sku in styleSkus) {
        if (!sizesArr.includes(styleSkus[sku].size)) {
          sizesArr.push(styleSkus[sku].size);
        }
      }
      this.setState({sizes: sizesArr}, () => {
        this.setState({sale_price: this.state.results[Number(this.state.selectedStyle)].sale_price});
      });


      // toggle "outOfStock" boolean if quantity of currently selected style === 0

      var quantity = 0;
      for (var sku in styleSkus) {
        quantity += styleSkus[sku].quantity;
      }
      if (quantity === 0) {
        this.setState({outOfStock: true});
      } else {
        this.setState({outOfStock: null});
      }
    });
  }


  handleSizeSelect(e) {

    // update selectedSize state back to null if user presses "Select Size"
    if (e.target.value === 'Select Size') {
      this.setState({selectedSize: null}, () => {
        this.setState({quantity: 0});
      });
      return;
    }

    // update selectedSize state and render quantity of given style/size combination selected
    this.setState({selectedSize: e.target.value}, () => {
      var style = this.state.results[this.state.selectedStyle];
      var styleSkus = style.skus;
      var quantity = 0;
      for (var sku in styleSkus) {
        if (styleSkus[sku].size === this.state.selectedSize) {
          quantity += styleSkus[sku].quantity;
        }
      }
      this.setState({quantity: quantity}, () => {
        this.setState({validATC: null});
      });
    });



  }


  handleAddToCart() {
    // check for invalid add to cart (ATC)
    if (this.state.selectedSize === null || this.state.selectedStyle === null) {
      this.setState({validATC: false});
    } else {
      this.setState({validATC: true});
    }
  }

  showExpandedView() {
    this.setState({expandedView: true});
  }

  handleCircleClick() {
    console.log('a');

  }

  handleExpandedImageClose(e) {
    this.setState({expandedView: null});
  }

  render () {

    return (
      <div id='Overview'>

        {/* {this.props.product_Id } */}



        <div className = 'overview-container'>

          <div className = 'image-gallery-container'>
            <ImageGallery expandedView = {this.state.expandedView}
              currentIndex = {this.state.currentIndex}
              showExpandedView = {this.showExpandedView.bind(this)}
              length = {this.state.images ? this.state.images[Number(this.state.selectedStyle)].length : ''}
              selectedStyle = {this.state.selectedStyle}
              images = {this.state.images} />
          </div>

          <ExpandedView images = {this.state.images}
            currentIndex = {this.state.currentIndex}
            handleExpandedImageClose = {this.handleExpandedImageClose.bind(this)}
            handleCircleClick = {this.handleCircleClick.bind(this)}
            selectedStyle = {this.state.selectedStyle}
            expandedView = {this.state.expandedView}/>

          <div className = 'info-container'>
            <StarRating rating ={this.state.rating}/>
            <Reviews numberOfReviews = {this.state.numberOfReviews} />
            <div id = 'category-overview'>{this.state.productCategory}</div>
            <div id = 'product-name-overview'>{this.state.productName}</div>

            {this.state.sale_price ?
              <>
                <div id = 'sale-price-overview-strikethrough'>${this.state.productPrice}</div>
                <div id = 'sale-price-overview'>${this.state.sale_price}</div>
              </>
              :
              <div id = 'price-overview'>${this.state.productPrice}</div>
            }

            <StyleSelector results = {this.state.results} selectedStyle = {this.state.selectedStyle} handleStyleClick = {this.handleStyleClick.bind(this)} thumbnails = {this.state.thumbnails} />

            <AddToCart validATC = {this.state.validATC} handleAddToCart = {this.handleAddToCart.bind(this)} handleSizeSelect = {this.handleSizeSelect.bind(this)} quantity = {this.state.quantity} sizes = {this.state.sizes} outOfStock = {this.state.outOfStock}/>
            <div id = 'social-container'>
              <i className="fab fa-2x fa-facebook"></i>
              <i className="fab fa-2x fa-twitter"></i>
              <i className="fab fa-2x fa-pinterest"></i>
            </div>

          </div>
        </div>

        <ProductDescription productSlogan = {this.state.productSlogan} productDescription = {this.state.productDescription}/>

      </div>



    );

  }

}

export default Overview;