import React, { Component } from 'react';
import { Avatar, Layout } from 'antd';
import './Header.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
const { Header } = Layout

class HeaderLayout extends Component {

  onLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <ul className="authLinks" style={{ alignItems: 'center' }}>
        <Link className="nav-link" to="/customers" >
          <span>Customers</span>
        </Link>
        <Link className="nav-link" to="/createproduct" >
          <span>Create SP</span>
        </Link>
        <Link className="nav-link" to="/orders">
          <span>Orders</span>
        </Link>
        <Link className="nav-link" to="/">
          <Avatar size="small" icon="user" />
        </Link>
        <Link to="/" className="nav-link" onClick={this.onLogout}>
          <span>Logout</span>
        </Link>
      </ul>
    )
    const guestLinks = (
      <ul className="guestLinks">
        <Link className="nav-link" to="/register">Sign Up</Link>
        <Link className="nav-link" to="/login">Sign In</Link>
      </ul>
    )
    return (
      <Header>
        {isAuthenticated ? authLinks : guestLinks}
      </Header>
    );
  }
}

HeaderLayout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

// export default Header;
export default connect(mapStateToProps, { logoutUser })(withRouter(HeaderLayout));