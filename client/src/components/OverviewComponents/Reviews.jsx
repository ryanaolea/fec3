import React from 'react';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {

    return (
      <div>
        {this.props.numberOfReviews ? <a href = '#Ratings' id = "reviews-overview">Read all {this.props.numberOfReviews} reviews</a> : '' }
      </div>
    );
  }
}

export default Reviews;