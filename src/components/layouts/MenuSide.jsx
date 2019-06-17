import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import './MenuSide.scss';

const { Sider } = Layout;

class MenuSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} className="ant-layout-sider">
        <Link className="logo" to="/">
          <Icon type="medium" />
          <span className="text-logo">SHOP</span>
        </Link>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" className="style-limenu">
            <Icon type="home" />
            <span>Home</span>
            <Link className="nav-link" to="/" ></Link>
          </Menu.Item>
          <Menu.Item key="2" className="style-limenu">
            <Icon type="book" />
            <span>Album</span>
            <Link className="nav-link" to="/albums" data-hover="Albums" active="true"></Link>
          </Menu.Item>
          <Menu.Item key="3" className="style-limenu">
            <Icon type="camera" />
            <span>Clothing</span>
            <Link className="nav-link" to="/clothing" data-hover="Clothing"></Link>
          </Menu.Item>
          <Menu.Item key="4" className="style-limenu">
            <Icon type="instagram" />
            <span>Hoodies</span>
            <Link className="nav-link" to="/hoodies" data-hover="Hoodies"></Link>
          </Menu.Item>
          <Menu.Item key="5" className="style-limenu">
            <Icon type="fire" />
            <span>Music</span>
            <Link className="nav-link" to="/music" data-hover="Music"></Link>
          </Menu.Item>
          <Menu.Item key="6" className="style-limenu">
            <Icon type="crown" />
            <span>Porters</span>
            <Link className="nav-link" to="/posters" data-hover="Porters"></Link>
          </Menu.Item>
          <Menu.Item key="7" className="style-limenu">
            <Icon type="star" />
            <span>Single</span>
            <Link className="nav-link" to="/single" data-hover="Single"></Link>
          </Menu.Item>
          <Menu.Item key="8" className="style-limenu">
            <Icon type="skin" />
            <span>T-shirt</span>
            <Link className="nav-link" to="/t_shirt" data-hover="T-shirt"></Link>
          </Menu.Item>
          <Menu.Item key="9" className="style-limenu">
            <Icon type="trophy" />
            <span>UnCategorized</span>
            <Link className="nav-link" to="/uncategories" data-hover="UnCategorized"></Link>
          </Menu.Item>
          <Menu.Item key="10" className="style-limenu">
            <Icon type="container" />
            <span>List Reviews</span>
            <Link className="nav-link" to="/reviews" data-hover="Reviews"></Link>
          </Menu.Item>
        </Menu>
      </Sider >
    );
  }
}

export default MenuSide;



