import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configstore';
import jwt_decode from 'jwt-decode';
import setAuthToken from './token/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { Cookies } from 'react-cookie';
import { Layout, Breadcrumb } from 'antd';
import HeaderLayout from './components/layouts/Header'

// import NavbarMenu from './components/layouts/NavbarMenu';
// import ImagesProduct from './components/ListImages/ImagesProduct';
import { Login, Register } from './components/Authentication';
import Home from './components/Home';
import { ManDetail, ManForm, ManEdit } from './components/ProductMain';
import Albums from './components/AlbumCategories/ListAlbums'
import Clothing from './components/ClothingCategories/ListClothing';
import Hoodies from './components/HoodiesCategories/ListHoodies';
import Music from './components/MusicCategories/ListMusic';
import Posters from './components/PostersCategories/ListPosters';
import Single from './components/SingleCategories/ListSingle'
import T_shirt from './components/T-shirtCategories/ListT_shirt';
import UnCategories from './components/UnCategorized/ListUnCategories';
import { OrderComponent, OrderForm, OrderDetail, OrderEdit } from './components/Order'
import MenuSide from './components/layouts/MenuSide';
import ButtonUpTop from './components/layouts/ButtonUpTop'
import ReviewsComponent from './components/Reviews/ReviewsComponent';
import CustomersComponent from './components/Customers/CustomersComponent';

const cookies = new Cookies();
const token = cookies.get('jwtToken');

if (token) {
  // Set auth token header auth
  const newtoken = token;
  setAuthToken(newtoken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(newtoken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

const { Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <MenuSide />
            <Layout>
              <HeaderLayout />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', height: '100%' }}>

                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />

                  <Route exact path="/" component={Home} />

                  <Route exact path="/orders" component={OrderComponent} />
                  <Route exact path="/createorder" component={OrderForm} />
                  <Route exact path="/orders/:id" component={OrderDetail} />
                  <Route exact path="/orders/edit/:id" component={OrderEdit} />

                  <Route exact path="/reviews" component={ReviewsComponent} />

                  <Route exact path="/customers" component={CustomersComponent} />

                  <Route exact path="/createproduct" component={ManForm} />
                  <Route exact path="/product/:id" component={ManDetail} />
                  <Route exact path="/product/edit/:id" component={ManEdit} />

                  <Route exact path="/albums" component={Albums} />
                  <Route exact path="/clothing" component={Clothing} />
                  <Route exact path="/hoodies" component={Hoodies} />
                  <Route exact path="/music" component={Music} />
                  <Route exact path="/posters" component={Posters} />
                  <Route exact path="/single" component={Single} />
                  <Route exact path="/t_shirt" component={T_shirt} />
                  <Route exact path="/uncategories" component={UnCategories} />

                  <ButtonUpTop scrollStepInPx="50" delayInMs="16.66" />

                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Mshop ©2018 Created by HMP</Footer>
            </Layout>
          </Layout>

        </Router >
      </Provider >
    )
  }
}

export default App;
