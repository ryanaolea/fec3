import React from 'react';
import ReactDom from 'react-dom';
import LeftArrowExpanded from './LeftArrowExpanded.jsx';
import RightArrowExpanded from './RightArrowExpanded.jsx';
import Circles from './Circles.jsx';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      zoomView: null,
      imageURL: null
    };
  }

  // componentWillUpdate() {

  //   if (this.props.images) {
  //     this.setState({imageURL: this.props.images[Number(this.props.selectedStyle)][this.state.currentIndex].url});
  //   }


  // }

  // componentWillUpdate() {

  //   if (this.props.images) {
  //     this.setState({imageURL: this.props.images[Number(this.props.selectedStyle)][this.state.currentIndex].url});
  //   }


  // }



  handleLeftArrowExpanded() {
    var length = this.props.images[Number(this.props.selectedStyle)].length;
    if (this.state.currentIndex === 0) {
      this.setState({currentIndex: length - 1});
    } else {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }
  }

  handleRightArrowExpanded() {
    var length = this.props.images[Number(this.props.selectedStyle)].length;
    if (this.state.currentIndex === length - 1) {
      this.setState({currentIndex: 0});
    } else {
      this.setState({currentIndex: this.state.currentIndex + 1});
    }
  }

  handleCircleClick(e) {
    this.setState({currentIndex: Number(e.target.getAttribute('id'))});
  }

  handleExpandedImageClick() {
    if (this.state.zoomView) {
      this.setState({zoomView: null});
    } else {
      this.setState({zoomView: true});
    }
  }



  render () {



    return ReactDom.createPortal(
      <>
        {this.props.expandedView ?
          <div className = 'modal display-block'>

            <div className= ".modal-main">
              <div className = 'expanded-view-container'>
                <div id = 'expanded-image-container'>
                  <Circles currentIndex = {this.state.currentIndex} handleCircleClick = {this.handleCircleClick.bind(this)} images = {this.props.images[Number(this.props.selectedStyle)]}/>
                  <LeftArrowExpanded handleLeftArrowExpanded = {this.handleLeftArrowExpanded.bind(this)} />
                  <img className = {this.state.zoomView ? 'expanded-image zoom-view' : 'expanded-image'} onClick = {this.handleExpandedImageClick.bind(this)} src = {this.props.images ? this.props.images[Number(this.props.selectedStyle)][this.state.currentIndex].url : ''}
                  />
                  <i onClick = {this.props.handleExpandedImageClose} className="fas fa-times fa-2x"></i>
                  <RightArrowExpanded handleRightArrowExpanded = {this.handleRightArrowExpanded.bind(this)}/>
                </div>
              </div>
            </div>

          </div> :
          <div className = '.modal display-none'>

            <div className= ".modal-main">
              <img id = 'expanded-image' src = {this.props.images ? this.props.images[Number(this.props.selectedStyle)][0].url : ''}/>
            </div>

          </div> }
      </>,
      document.getElementById('thumbnail-portal')

    );

  }

}
export default ExpandedView;