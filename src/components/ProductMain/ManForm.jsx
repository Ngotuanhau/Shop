import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
// import { Shop_CreateProduct } from '../../actions/products_action';
import { Shop_GetListCategories } from '../../actions/categories_action';
import { Checkbox, Upload, Icon, Modal, Button } from 'antd';
import './Main.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

class ManForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      short_description: '',
      regular_price: '',
      sku: '',
      categories: [],
      images: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      selectedCategories: []
    }
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false
    })
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
    // console.log('123')
  };

  handleChangeUpload = ({ fileList }) => {
    // console.log(fileList)
    this.setState({
      fileList
    })
  };

  handleSubmitImage = async (e) => {
    e.preventDefault();
    // console.log(this.state.fileList)
    const uploadPromise = [];
    const fileList = this.state.fileList
    // console.log(fileList)
    fileList.forEach(image => {
      // console.log(image)
      const formData = new FormData()
      formData.append('file', image.originFileObj);
      uploadPromise.push(axios.post('http://192.168.1.198/wordpress-demo/wp-json/wp/v2/media', formData))
    })
    // console.log(uploadPromise)
    const images = await Promise.all(uploadPromise)
    // console.log(images)
    let newimages = []
    images.forEach(item => {
      // console.log(item.data)
      newimages.push({ 'src': item.data.source_url })
      // console.log(newimages)
    })

    const product = {
      name: this.state.name,
      description: this.state.description,
      short_description: this.state.short_description,
      regular_price: this.state.regular_price,
      categories: this.state.categories,
      sku: this.state.sku,
      images: newimages
    }
    axios.post('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products', product)
      .then(response => {
        // console.log(response)
        this.setState({
          name: '',
          description: '',
          short_description: '',
          regular_price: '',
          sku: '',
          categories: [],
          images: '',
          fileList: [],
          selectedCategories: []
        })
      })
  };

  componentDidMount = () => {
    this.props.actions.Shop_GetListCategories()
  };

  onChangeCheckBox = (checkedValues) => {
    // console.log('checked = ', checkedValues);
    let newObject = checkedValues.map((item) => ({ id: item }))
    // console.log(newObject)
    this.setState({
      categories: newObject,
      selectedCategories: checkedValues
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Container>
        <Row>
          <Col md='12'>
            <h1 style={{ marginBottom: '20px' }}>Create Product</h1>
            <form onSubmit={this.onSubmit} encType="multipart/form-data" required >

              <div className="form-group" style={{ display: 'flex' }}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChangeUpload}
                  beforeUpload={() => false}
                  multiple={true}
                >
                  {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
              </div>

              <div className="form-group">
                <label>Name: </label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <Input
                  type="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Short description</label>
                <Input
                  type="textarea"
                  name="short_description"
                  value={this.state.short_description}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Price: </label>
                <input type="number"
                  className="form-control"
                  name="regular_price"
                  value={this.state.regular_price}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Sku: </label>
                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  value={this.state.sku}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label style={{ marginRight: '40px' }}>Categories </label>
                <Checkbox.Group
                  value={this.state.selectedCategories}
                  options=
                  {
                    this.props.categories.map((categories) => ({
                      label: categories.name,
                      value: categories.id
                    }))
                  }
                  onChange={this.onChangeCheckBox} />
              </div>

              {/* <div className="form-group" style={{ marginTop: '20px' }}>
                <input type="submit" value="Create Product" className="btn btn-primary" />
              </div> */}
              <Button onClick={this.handleSubmitImage} type="primary">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container >
    );
  }
}


const mapStateToProps = (state) => ({
  categories: state.categories.categories
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    // Shop_CreateProduct,
    Shop_GetListCategories
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ManForm);