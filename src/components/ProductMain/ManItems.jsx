import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardImg, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'antd'

import './ManItems.scss';

class ManItems extends Component {

  renderImage = (images) => {
    if (images && images.length > 0) {
      let image = images[0]
      return (
        <CardImg
          src={image.src}
          alt="anh"
        />
      )
    }
  }

  render() {
    return (
      <Col md="5" >
        <Card>
          <CardBody>
            {this.renderImage(this.props.product.images)}
            <CardTitle style={{ fontWeight: '700' }}>{this.props.product.name}</CardTitle>
            {/* <CardSubtitle dangerouslySetInnerHTML={{ __html: this.props.product.short_description }} /> */}
            <CardText>Price: {this.props.product.price} $</CardText>
            <Button type="primary" style={{ marginRight: '20px' }}>
              <Link to={"/product/" + this.props.product.id}>
                Detail Product
              </Link>
            </Button>
            <Button
              type="danger"
              onClick={() => {
                this.props.deleteHandel(this.props.product.id)
              }}>
              Delete
            </Button>
          </CardBody>
        </Card>
      </Col >
    );
  }
}

export default ManItems;