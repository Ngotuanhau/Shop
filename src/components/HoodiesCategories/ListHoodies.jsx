import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import HoodiesItem from './HoodiesItem';
import { Pagination, Empty } from 'antd'

class ListHoodies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hoodies_product: [],
      activePage: 1
    }
  }

  componentDidMount() {
    this.getListHoodies(this.state.activePage)
  }

  getListHoodies = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "21"
      }
    })
      .then(response => {
        // console.log(response)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListHoodies(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            Hoodies_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListHoodies(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    return (
      <Container>
        <h1>List Hoodies</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Hoodies_product.length === 0 ? (
                  // <p className="not-found">No product found</p>
                  <Empty />
                ) : (
                    this.state.Hoodies_product.map((product) => {
                      return (
                        <HoodiesItem
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

export default ListHoodies;