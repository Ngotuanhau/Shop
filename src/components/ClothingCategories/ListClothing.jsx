import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import ClothingItem from './ClothingItem';
import { Pagination, Empty } from 'antd'

class ListClothing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Clothing_product: [],
      activePage: 1
    }
  }

  componentDidMount = () => {
    this.getListClothing(this.state.activePage)
  }

  getListClothing = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "20"
      }
    })
      .then(response => {
        // console.log(response.data)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListClothing(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            Clothing_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListClothing(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    // console.log(this.state.Clothing_product)
    return (
      <Container>
        <h1>List Clothing</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Clothing_product.length === 0 ? (
                  <Empty />
                ) : (
                    this.state.Clothing_product.map((product) => {
                      return (
                        <ClothingItem
                          key={product.id}
                          product={product}
                        />
                      )
                    })
                  )
              }
            </Row>
            <Pagination
              onChange={this.onChangePage}
              total={50}
              defaultCurrent={1}
              defaultPageSize={10}
              activePage={this.state.activePage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ListClothing;
