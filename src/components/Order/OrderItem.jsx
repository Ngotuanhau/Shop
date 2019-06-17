import React, { Component } from 'react';
import { Card, CardText, CardTitle, Col } from 'reactstrap';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class OrderItem extends Component {

  render() {
    return (
      <Col sm="6">
        <Card body>
          <CardTitle>Bill: {this.props.order.id}</CardTitle>
          <CardText>Name Bill: {this.props.order.billing.first_name}</CardText>
          <Button type="primary">
            <Link to={"/orders/" + this.props.order.id}>
              Order Detail
            </Link>
          </Button>
          <Button
            type="danger"
            onClick={() => {
              this.props.deleteHandel(this.props.order.id)
            }}>
            Delete
          </Button>
        </Card>
      </Col>
    );
  }
}

export default OrderItem;