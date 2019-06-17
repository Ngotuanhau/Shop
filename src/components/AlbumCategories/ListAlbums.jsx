import React, { Component } from 'react';
import axios from 'axios';
import AlbumsItem from './AlbumsItem';
import { Container, Row, Col } from 'reactstrap';
import { Pagination, Empty } from 'antd'

class ListAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums_product: [],
      activePage: 1,
    }
  }

  componentDidMount = () => {
    this.getListAlbums(this.state.activePage)
  }

  getListAlbums = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "18"
      }
    })
      .then(response => {
        // console.log(response.data)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListAlbums(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            albums_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListAlbums(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    // console.log(this.state.albums_product)
    return (
      <Container>
        <h1>List Albums</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.albums_product.length === 0 ? (
                  <Empty />
                ) : (
                    this.state.albums_product.map((product) => {
                      return (
                        <AlbumsItem
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

export default ListAlbums
