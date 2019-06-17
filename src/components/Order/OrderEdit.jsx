import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

class OrderEdit extends Component {
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

  componentDidMount = () => {
    axios.get('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/orders/' + this.props.match.params.id)
      .then(response => {
        // console.log(response)
        this.setState({
          billing_first_name: response.data.billing.first_name,
          billing_last_name: response.data.billing.last_name,
          billing_address_1: response.data.billing.address_1,
          billing_address_2: response.data.billing.address_2,
          billing_city: response.data.billing.city,
          billing_state: response.data.billing.state,
          billing_postcode: response.data.billing.postcode,
          billing_country: response.data.billing.country,
          billing_email: response.data.billing.email,
          billing_phone: response.data.billing.phone,
          shipping_first_name: response.data.shipping.first_name,
          shipping_last_name: response.data.shipping.last_name,
          shipping_address_1: response.data.shipping.address_1,
          shipping_address_2: response.data.shipping.address_2,
          shipping_city: response.data.shipping.city,
          shipping_state: response.data.shipping.state,
          shipping_postcode: response.data.shipping.postcode,
          shipping_country: response.data.shipping.country,
        })
      })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      billing: {
        last_name: this.state.billing_last_name,
        first_name: this.state.billing_first_name,
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
        last_name: this.state.shipping_last_name,
        first_name: this.state.shipping_first_name,
        address_1: this.state.shipping_address_1,
        address_2: this.state.shipping_address_2,
        city: this.state.shipping_city,
        state: this.state.shipping_state,
        postcode: this.state.shipping_postcode,
        country: this.state.shipping_country,
        email: this.state.shipping_email,
        phone: this.state.shipping_phone,
      }
    }
    axios.post('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/orders/' + this.props.match.params.id, newOrder)
      .then(response => {
        // console.log(response.data)
      })
    this.props.history.push("/orders/");
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ marginBottom: '20px' }}>Edit Your Order</h1>
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
                <input type="submit" value="Edit Order" className="btn btn-primary" />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OrderEdit

