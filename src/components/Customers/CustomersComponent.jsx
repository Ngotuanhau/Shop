import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Shop_GetListCustomers } from '../../actions/customers_action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class CustomersComponent extends Component {

  componentDidMount = () => {
    this.props.actions.Shop_GetListCustomers()
  }

  render() {
    // console.log(this.props.customers)
    return (
      <Container>
        <Row>
          <Col>
            <h1>List Customers</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.customers.customers
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetListCustomers
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomersComponent);