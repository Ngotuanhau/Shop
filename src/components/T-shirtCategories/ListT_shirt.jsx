import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import TShirtItem from './T_shirtItem';
import { Pagination, Empty } from 'antd'

class ListT_shirt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tshirt_product: [],
      activePage: 1
    }
  }

  componentDidMount = () => {
    this.getListT_shirt(this.state.activePage)
  }

  getListT_shirt = (pageNumber) => {
    const apiUrl = `http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`;
    axios.get(apiUrl, {
      params: {
        category: "22"
      }
    })
      .then(response => {
        // console.log(response)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          // console.log(nextPage)
          this.getListT_shirt(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            Tshirt_product: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListT_shirt(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  render() {
    return (
      <Container>
        <h1>List T_shirt</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Tshirt_product.length === 0 ? (
                  // <p className="not-found">No product found</p>
                  <Empty />
                ) : (
                    this.state.Tshirt_product.map((product) => {
                      return (
                        <TShirtItem
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

export default ListT_shirt;