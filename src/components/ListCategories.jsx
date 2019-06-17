import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Shop_GetListCategories } from '../actions/categories_action';

class ListCategories extends Component {

  componentDidMount = () => {
    this.props.actions.Shop_GetListCategories()
  }

  render() {
    const list_Categories = this.props.categories
    // console.log(list_Categories)
    return (
      <Nav className="ml-auto" navbar>
        {
          list_Categories.map((categories) => {
            return (
              <NavItem key={categories.id}>
                <Link className="nav-link" to="/">{categories.name}</Link>
              </NavItem>
            )
          })
        }
      </Nav>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetListCategories
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);