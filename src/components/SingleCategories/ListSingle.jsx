import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import SingleItem from './SingleItem';
import { Pagination, Empty } from 'antd'

class ListSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Single_product: [],
      activePage: 1
    }
  }

  componentDidMount = () => {
    this.getListSingle(this.state.activePage)
  }

  getListSingle = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "18"
      }
    })
      .then(response => {
        // console.log(response)
        // this.setState({
        //   Single_product: response.data
        // })
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListSingle(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            Single_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListSingle(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    return (
      <Container>
        <h1>List Single</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Single_product.length === 0 ? (
                  <Empty />
                ) : (
                    this.state.Single_product.map((product) => {
                      return (
                        <SingleItem
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

export default ListSingle;