import React, { Component } from 'react';
import { Shop_Create_Order } from '../../actions/orders_action';
import { Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billing_first_name: '',
      billing_last_name: '',
      billing_address_1: '',
      billing_address_2: '',
      billing_city: '',
      billing_state: '',
      billing_postcode: '',
      billing_country: '',
      billing_email: '',
      billing_phone: '',
      shipping_first_name: '',
      shipping_last_name: '',
      shipping_address_1: '',
      shipping_address_2: '',
      shipping_city: '',
      shipping_state: '',
      shipping_postcode: '',
      shipping_country: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const order = {
      billing: {
        first_name: this.state.billing_first_name,
        last_name: this.state.billing_last_name,
        address_1: this.state.billing_address_1,
        address_2: this.state.billing_address_2,
        city: this.state.billing_city,
        state: this.state.billing_state,
        postcode: this.state.billing_postcode,
        country: this.state.billing_country,
        email: this.state.billing_email,
        phone: this.state.billing_phone,
      },
      shipping: {
        first_name: this.state.shipping_first_name,
        last_name: this.state.shipping_last_name,
        address_1: this.state.shipping_address_1,
        address_2: this.state.shipping_address_2,
        city: this.state.shipping_city,
        state: this.state.shipping_state,
        postcode: this.state.shipping_postcode,
        country: this.state.shipping_country,
      }
    }
    this.props.actions.Shop_Create_Order(order);
    this.reset();
  }

  reset = () => {
    this.setState({
      billing_first_name: '',
      billing_last_name: '',
      billing_address_1: '',
      billing_address_2: '',
      billing_city: '',
      billing_state: '',
      billing_postcode: '',
      billing_country: '',
      billing_email: '',
      billing_phone: '',
      shipping_first_name: '',
      shipping_last_name: '',
      shipping_address_1: '',
      shipping_address_2: '',
      shipping_city: '',
      shipping_state: '',
      shipping_postcode: '',
      shipping_country: ''
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ marginBottom: '20px' }}>Create Your Order</h1>
            <form onSubmit={this.onSubmit}>
              <h2 style={{ fontSize: '20px', textAlign: 'center' }}>Billing</h2>
              <div className="form-group">
                <label>First name: </label>
                <input
                  type="text"
                  className="form-control"
                  name="billing_first_name"
                  value={this.state.billing_first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Last name: </label>
                <input type="text"
                  className="form-control"
                  name="billing_last_name"
                  value={this.state.billing_last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Address 1: </label>
                <input type="text"
                  className="form-control"
                  name="billing_address_1"
                  value={this.state.billing_address_1}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Address 2: </label>
                <input type="text"
                  className="form-control"
                  name="billing_address_2"
                  value={this.state.billing_address_2}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>City: </label>
                <input type="text"
                  className="form-control"
                  name="billing_city"
                  value={this.state.billing_city}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>State: </label>
                <input type="text"
                  className="form-control"
                  name="billing_state"
                  value={this.state.billing_state}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Postcode: </label>
                <input type="number"
                  className="form-control"
                  name="billing_postcode"
                  value={this.state.billing_postcode}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Country: </label>
                <input type="text"
                  className="form-control"
                  name="billing_country"
                  value={this.state.billing_country}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input type="email"
                  className="form-control"
                  name="billing_email"
                  value={this.state.billing_email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Phone: </label>
                <input type="tel"
                  className="form-control"
                  name="billing_phone"
                  value={this.state.billing_phone}
                  onChange={this.onChange}
                />
              </div>

              <p style={{ textAlign: 'center' }}>-----------------------------------------------------------</p>

              <h2 style={{ fontSize: '20px', textAlign: 'center' }}>Shipping</h2>
              <div className="form-group">
                <label>First name: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_first_name"
                  value={this.state.shipping_first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Last name: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_last_name"
                  value={this.state.shipping_last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Address 1: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_address_1"
                  value={this.state.shipping_address_1}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Address 2: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_address_2"
                  value={this.state.shipping_address_2}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>City: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_city"
                  value={this.state.shipping_city}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>State: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_state"
                  value={this.state.shipping_state}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Postcode: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_postcode"
                  value={this.state.shipping_postcode}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Country: </label>
                <input
                  type="text"
                  className="form-control"
                  name="shipping_country"
                  value={this.state.shipping_country}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Create Order" className="btn btn-primary" />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_Create_Order
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(OrderForm);