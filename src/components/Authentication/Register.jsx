import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';
import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirm: '',
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

  submitRegister = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history);
    this.setState({
      username: '',
      password: '',
      password_confirm: '',
    })
    // console.log(user)
  }

  render() {
    const { errors } = this.state
    return (
      <Container>
        <Row>
          <Col>
            <form className="box" onSubmit={this.submitRegister}>
              <div className="form-group">
                <label className="label-login">Name</label>
                <input
                  type="text"
                  name="username"
                  aria-describedby="namelHelp"
                  className={classnames('form-control form-control-lg', {
                    invalid: errors.username
                  })}
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <span className="red-text">{errors.username}</span>
              </div>

              <div className="form-group">
                <label className="label-login">Password</label>
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    invalid: errors.password
                  })}
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="form-group">
                <label className="label-login">Password Confirm</label>
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    invalid: errors.password_confirm
                  })}
                  name="password_confirm"
                  value={this.state.password_confirm}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <span className="red-text">{errors.password_confirm}</span>
              </div>
              <button className="btn btn-outline-primary" type="submit">REGISTER</button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));