import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import OrderItem from './OrderItem';
import { Pagination, Empty } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

import { Shop_GetOrders } from '../../actions/orders_action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      orders: []
    }
  }
  componentDidMount = () => {
    // this.props.actions.Shop_GetOrders()
    this.getListOrders(this.state.activePage)
  }

  getListOrders = (pageNumber) => {
    axios.get(` http://192.168.1.198/wordpress-demo/wp-json/wc/v3/orders?page=${pageNumber}`)
      .then(response => {
        // console.log(response.data)
        if (pageNumber !== 1 && response.data.length === 0) {
          let nextPage = pageNumber - 1
          this.getListOrders(nextPage);
          this.setState({
            activePage: nextPage
          })
        }
        else {
          this.setState({
            orders: response.data
          });
        }
      })
  }

  onChangePage = (pageNumber) => {
    if (pageNumber !== this.state.activePage) {
      this.getListOrders(pageNumber);
      // console.log(`active page is ${pageNumber}`)
      this.setState({
        activePage: pageNumber
      });
    }
  }

  deleteOrder = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want delete Item",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/orders/' + id)
            .then(response => {
              swal("Poof! Your Item has been deleted!", {
                icon: "success",
              });
              let del_orders = [...this.state.orders]
              let item = del_orders.find(item => item.id === id)
              // console.log(item, 'item')
              // xác định vị trí item cần xóa
              let index = del_orders.indexOf(item)
              // console.log(index)
              if (index !== -1) {
                del_orders.splice(index, 1);
              } else {
              }
              this.getListOrders(this.state.activePage)
            })
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  render() {
    // console.log(this.state.orders)
    return (
      <Container>
        <h1>List Orders</h1>
        <Button color="success" style={{ marginBottom: '20px' }}>
          {
            <Link to="/createorder" style={{ color: 'white' }}>Create Order</Link>
          }
        </Button>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.orders.length === 0 ? (
                  <Empty />
                ) : (
                    this.state.orders.map((order) => {
                      return (
                        <OrderItem
                          key={order.id}
                          order={order}
                          deleteHandel={this.deleteOrder}
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

const mapStateToProps = (state) => ({
  orders: state.orders.orders
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetOrders
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent);