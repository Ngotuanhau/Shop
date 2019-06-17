import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Shop_GetListProducts } from '../actions/products_action';
import axios from 'axios';
import { Pagination, Empty } from 'antd';
import swal from 'sweetalert';

import ManItems from '../components/ProductMain/ManItems';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      activePage: 1,
      products: [],
    }
  }

  componentDidMount = () => {
    this.getListProducts(this.state.activePage)
  }

  getListProducts = (pageNumber) => {
    axios.get(`http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products?page=${pageNumber}`)
      .then(response => {
        // console.log(response.data)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          this.getListProducts(nextPage);
          // console.log(nextPage)
          this.setState({
            activePage: nextPage,
          })
        }
        else {
          this.setState({
            products: response.data
          });
          // console.log(this.state.products)
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListProducts(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  deleteproduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want delete Item",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products/' + id)
            .then(response => {
              swal("Poof! Your Item has been deleted!", {
                icon: "success",
              });
              let del_products = [...this.state.products]
              let item = del_products.find(item => item.id === id)
              // console.log(item, 'item')
              // xác định vị trí item cần xóa
              let index = del_products.indexOf(item)
              // console.log(index)
              if (index !== -1) {
                del_products.splice(index, 1);
              } else {
              }
              this.getListProducts(this.state.activePage)
            })
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  render() {
    const products = this.state.products
    return (
      <Container>
        <h1>WELCOME SHOP</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                products && products.length === 0 ? (
                  <Empty />
                ) : (
                    this.state.products.map((product) => {
                      return (
                        <ManItems
                          key={product.id}
                          product={product}
                          deleteHandel={this.deleteproduct}
                        />
                      )
                    })
                  )
              }
            </Row>
            <Pagination
              onChange={this.onChangePage}
              total={100}
              activePage={this.state.activePage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetListProducts
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
