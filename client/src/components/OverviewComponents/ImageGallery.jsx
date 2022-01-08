import React from 'react';
import LeftArrow from './LeftArrow.jsx';
import RightArrow from './RightArrow.jsx';
import MainImage from './MainImage.jsx';
import Slider from './Slider.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      imageRange: [0, 6],
    };
  }

  handleLeftArrow() {

    // if (this.state.currentIndex === 0) {
    //   return;
    // }

    var length = this.props.images[Number(this.props.selectedStyle)].length;
    if (this.state.currentIndex === 0) {
      this.setState({currentIndex: length - 1});
    } else {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }


    if (this.state.currentIndex <= this.state.imageRange[0]) {
      var imageRange = this.state.imageRange.slice();
      imageRange[0]--;
      imageRange[1]--;
      this.setState({imageRange: imageRange});
    }

  }

  handleRightArrow() {

    var length = this.props.images[Number(this.props.selectedStyle)].length;
    if (this.state.currentIndex === length - 1) {
      this.setState({currentIndex: 0});
    } else {
      this.setState({currentIndex: this.state.currentIndex + 1});
    }

    if (this.state.currentIndex >= this.state.imageRange[1]) {
      var imageRange = this.state.imageRange.slice();
      imageRange[0]++;
      imageRange[1]++;
      this.setState({imageRange: imageRange});
    }
  }


  handleSliderThumbnailClick(event) {
    this.setState({currentIndex: Number(event.target.getAttribute('thumbnailid'))});
  }


  handleLeftArrowSlider() {

    if (this.props.length <= 7 ) {
      return;
    }

    if (this.state.imageRange[0] === 0) {
      return;
    }

    var imageRange = this.state.imageRange.slice();
    imageRange[0]--;
    imageRange[1]--;
    this.setState({imageRange: imageRange});
  }



  handleRightArrowSlider() {

    if (this.props.length <= 7 ) {
      return;
    }

    if (this.props.length - 1 === this.state.imageRange[1]) {
      return;
    }

    var imageRange = this.state.imageRange.slice();
    imageRange[0]++;
    imageRange[1]++;
    this.setState({imageRange: imageRange});


  }








  render () {
    return (
      <>
        <div className = 'main-image-container'>


          {/* {this.state.currentIndex === this.props.length - 1 ? '' :
            <RightArrow handleRightArrow = {this.handleRightArrow.bind(this)}/>} */}
          <LeftArrow className = {this.state.currentIndex === 0 ? 'pink' : ''} handleLeftArrow = {this.handleLeftArrow.bind(this)}/>
          <MainImage showExpandedView = {this.props.showExpandedView} currentIndex = {this.state.currentIndex} selectedStyle = {this.props.selectedStyle} images = {this.props.images}/>
          <RightArrow handleRightArrow = {this.handleRightArrow.bind(this)}/>
        </div>
        <Slider imageRange = {this.state.imageRange} handleLeftArrowSlider = {this.handleLeftArrowSlider.bind(this)} handleRightArrowSlider = {this.handleRightArrowSlider.bind(this)} currentIndex = {this.state.currentIndex} handleSliderThumbnailClick = {this.handleSliderThumbnailClick.bind(this)} selectedStyle = {this.props.selectedStyle} images = {this.props.images}/>
      </>
    );

  }

}
export default ImageGallery;


