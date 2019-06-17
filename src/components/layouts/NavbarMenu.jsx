import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, Nav } from 'reactstrap';
import { Avatar } from 'antd'
import './NavbarMenu.scss'

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import icon_orders from '../../icon_image/cart.svg'
// import ListCategories from '../ListCategories'

class NavbarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto" style={{ alignItems: 'center' }}>
        <li >
          <Link className="nav-link" to="/orders" data-hover="Orders">Orders
            <img alt="icon_orders" src={icon_orders} style={{ marginLeft: '5px', paddingBottom: '4px' }} />
          </Link>
        </li>
        <Avatar size="small" icon="user" style={{ marginLeft: '28px' }} />
        <Link to="/" className="nav-link" onClick={this.onLogout}>
          <img
            src={user.avatar}
            alt={user.username}
            title={user.username}
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }} />Logout
        </Link>
      </ul>
    )
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <NavItem>
          <Link className="nav-link" to="/register">Sign Up</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/login">Sign In</Link>
        </NavItem>
      </ul>
    )
    return (
      <Navbar className="navbar" light expand="md" style={{ backgroundColor: '#4db6ac' }}>
        <Link className="nav-link current" to="/" style={{ color: '#424242', textTransform: 'uppercase', fontWeight: '700' }}>Clother Shop</Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto menu" navbar>
            <li >
              <Link className="nav-link" to="/albums" data-hover="Albums" active="true">Albums</Link>
            </li>
            <li>
              <Link className="nav-link" to="/clothing" data-hover="Clothing">Clothing</Link>
            </li>
            <li>
              <Link className="nav-link" to="/hoodies" data-hover="Hoodies">Hoodies</Link>
            </li>
            <li>
              <Link className="nav-link" to="/music" data-hover="Music">Music</Link>
            </li>
            <li>
              <Link className="nav-link" to="/posters" data-hover="Porters">Porters</Link>
            </li>
            <li>
              <Link className="nav-link" to="/single" data-hover="Single">Single</Link>
            </li>
            <li>
              <Link className="nav-link" to="/t_shirt" data-hover="T-shirt">T-shirt</Link>
            </li>
            <li>
              <Link className="nav-link" to="/uncategories" data-hover="UnCategorized">UnCategorized</Link>
            </li>
            <li >
              <Link className="nav-link" to="/createproduct" data-hover="Create SP" active="true">Create SP</Link>
            </li>
            {/* <li >
              <Link className="nav-link" to="/images" data-hover="Images" active="true">Images</Link>
            </li> */}

          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </Collapse>
      </Navbar>
    );
  }
}

NavbarMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(NavbarMenu));