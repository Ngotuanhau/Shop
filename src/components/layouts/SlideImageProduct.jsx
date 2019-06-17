import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

class SlideImageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      Images: this.props.product.data.images
    }
  }

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.Images.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.Images.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const slides = this.state.Images.map((image, index) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={index} style={{ height: '400px' }}>
          <img src={image.src} alt={image.alt} style={{ height: '400px', width: '100%' }} />
        </CarouselItem>
      );
    });

    return (
      <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
        <CarouselIndicators items={this.state.Images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product
});

export default connect(mapStateToProps)(SlideImageProduct);