import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button, CardImg, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class UncategoriesItem extends Component {

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
            <CardText>Price: {this.props.product.price} $</CardText>
            <Button outline color="success">
              <Link to={"/mandetail/" + this.props.product.id}>
                Detail Product
            </Link>
            </Button>
          </CardBody>
        </Card>
      </Col >
    );
  }
}

export default UncategoriesItem;
