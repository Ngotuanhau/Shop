import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import MusicItem from './MusicItem';
import { Pagination, Empty } from 'antd';

class ListMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Music_product: [],
      activePage: 1
    }
  }

  componentDidMount = () => {
    this.getListMusic(this.state.activePage)
  }

  getListMusic = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "16"
      }
    })
      .then(response => {
        // console.log(response.data)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListMusic(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            Music_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListMusic(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    return (
      <Container>
        <h1>List Music</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Music_product.length === 0 ? (
                  // <p className="not-found">No product found</p>
                  <Empty />
                ) : (
                    this.state.Music_product.map((product) => {
                      return (
                        <MusicItem
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

export default ListMusic;