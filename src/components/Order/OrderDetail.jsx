import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Shop_GetOrder_By_ID } from '../../actions/orders_action';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Order.scss';

class OrderDetail extends Component {

  componentDidMount = () => {
    this.props.actions.Shop_GetOrder_By_ID(this.props.match.params.id)
  }

  render() {
    // console.log(this.props.order)
    return (
      <Container>
        <h1 style={{ margin: '20px 0' }}>Order Detail</h1>
        <Row>
          <Col>
            {
              this.props.order && (
                <Fragment>
                  <Table borderless style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>
                          < Button outline color="primary">
                            <Link to={"/orders/edit/" + this.props.order.id}>
                              Edit
                          </Link>
                          </Button>
                        </th>
                      </tr>
                      <tr>
                        <th>Billing</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">First name</th>
                        <td>{this.props.order.billing.first_name}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Last name</th>
                        <td>{this.props.order.billing.last_name}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Address 1</th>
                        <td>{this.props.order.billing.address_1}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Address 2</th>
                        <td>{this.props.order.billing.address_2}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">City</th>
                        <td>{this.props.order.billing.city}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">State</th>
                        <td>{this.props.order.billing.State}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Postcode</th>
                        <td>{this.props.order.billing.postcode}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Email</th>
                        <td>{this.props.order.billing.email}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Phone</th>
                        <td>{this.props.order.billing.phone}</td>
                      </tr>
                    </tbody>

                    <thead>
                      <tr>
                        <th>Shipping</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">First name</th>
                        <td>{this.props.order.shipping.first_name}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Last name</th>
                        <td>{this.props.order.shipping.last_name}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Address 1</th>
                        <td>{this.props.order.shipping.address_1}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Address 2</th>
                        <td>{this.props.order.shipping.address_2}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">City</th>
                        <td>{this.props.order.shipping.city}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">State</th>
                        <td>{this.props.order.shipping.State}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th scope="row" className="title">Postcode</th>
                        <td>{this.props.order.shipping.postcode}</td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* <LineItemDetail /> */}
                </Fragment>
              )
            }


          </Col>
        </Row>
      </Container >
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.orders.order
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetOrder_By_ID
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
