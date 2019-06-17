import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import UncategoriesItem from './UncategoriesItem';
import { Pagination, Empty } from 'antd'

class ListUnCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Uncat_product: [],
      activePage: 1
    }
  }

  componentDidMount = () => {
    this.getListUnCategories(this.state.activePage)
  }

  getListUnCategories = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "15"
      }
    })
      .then(response => {
        // console.log(response)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListUnCategories(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            Uncat_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListUnCategories(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    return (
      <Container>
        <h1>List UnCategories</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Uncat_product.length === 0 ? (
                  <Empty />
                ) : (
                    this.state.Uncat_product.map((product) => {
                      return (
                        <UncategoriesItem
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

export default ListUnCategories;