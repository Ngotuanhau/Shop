import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import PostersItem from './PostersItem';
import { Pagination, Empty } from 'antd'

class ListPosters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Posters_product: [],
      activePage: 1
    }
  }

  componentDidMount = () => {
    this.getListPosters(this.state.activePage)
  }

  getListPosters = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "19"
      }
    })
      .then(response => {
        // console.log(response)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListPosters(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            Posters_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListPosters(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    return (
      <Container>
        <h1>List Posters</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Posters_product.length === 0 ? (
                  // <p className="not-found">No product found</p>
                  <Empty />
                ) : (
                    this.state.Posters_product.map((product) => {
                      return (
                        <PostersItem
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

export default ListPosters;