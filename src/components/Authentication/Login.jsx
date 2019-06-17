import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitLogin = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.loginUser(user);
    // console.log(user)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form className="box" onSubmit={this.submitLogin}>

              <div className="form-group">
                <label className="label-login">User name</label>
                <input
                  type="username"
                  className="form-control form-control-lg"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label className="label-login">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>

              <button className="btn btn-outline-primary" type="submit">LOGIN</button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);