import React, { Component } from 'react';
import { Button } from 'antd';
import '../Home.scss'

class ButtonUpTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      hasScrolled: false
    }
  }

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <Button
        title='Back to top'
        className='scroll'
        type="dashed"
        shape="circle"
        icon="arrow-up"
        id="buttonTop"
        onClick={() => { this.scrollToTop() }}>
      </Button>

    );
  }
}

export default ButtonUpTop;