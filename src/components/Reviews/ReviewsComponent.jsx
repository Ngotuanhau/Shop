import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Shop_GetListReviews } from '../../actions/reviews_product_action'

class ReviewsComponent extends Component {

  componentDidMount = () => {
    this.props.actions.Shop_GetListReviews()
  }

  render() {
    console.log(this.props.reviews)
    return (
      <h1>List Reviews</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  reviews: state.reviews.reviews
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetListReviews
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsComponent);