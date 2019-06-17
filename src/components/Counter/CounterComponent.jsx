import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import { counter_increase, counter_decrease } from '../../actions/counter_action';
import { bindActionCreators } from 'redux'

class CounterComponent extends Component {

  render() {
    return (
      <div className="group-button" style={{ display: 'flex', marginBottom: '20px', minWidth: '130px' }}>
        <Button
          outline color="info"
          onClick={() => { this.props.actions.counter_increase(1) }}
          style={{ width: '30px', height: '30px', borderRadius: '100%', display: 'flex', justifyContent: 'center', padding: '0' }}
        >
          +
        </Button>
        <div style={{ margin: '0 20px', fontSize: '20px' }}>{this.props.count}</div>
        <Button
          outline color="info"
          onClick={() => { this.props.actions.counter_decrease(1) }}
          style={{ width: '30px', height: '30px', borderRadius: '100%', display: 'flex', justifyContent: 'center', padding: '0' }}
        >
          -
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.count.count
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    counter_increase,
    counter_decrease
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);