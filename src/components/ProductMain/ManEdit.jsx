import React, { Component } from 'react';
import { Checkbox, Upload, Icon, Modal, Button } from 'antd';
import { Container, Row, Col, Input } from 'reactstrap';
import { Shop_GetListCategories } from '../../actions/categories_action';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

class ManEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      short_description: '',
      regular_price: '',
      sku: '',
      categories: [],
      images: [],
      previewVisible: false,
      previewImage: '',
      fileList: [],
      defaultCheckList: [],
      imageProduct: []
    }
  }

  componentDidMount = () => {
    this.props.actions.Shop_GetListCategories();
    axios.get('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products/' + this.props.match.params.id)
      .then(response => {
        // console.log(response.data)
        const regex = /(<([^>]+)>)/ig;
        this.setState({
          name: response.data.name,
          description: response.data.description.replace(regex, ''),
          short_description: response.data.short_description.replace(regex, ''),
          regular_price: response.data.regular_price,
          sku: response.data.sku,
          defaultCheckList: response.data.categories.map((item) => (item.id)),
          fileList: response.data.images.map(item => ({
            uid: item.id,
            name: item.name,
            status: 'done',
            url: item.src
          })),
        })
        // console.log(this.state.defaultCheckList)
        // console.log(this.state.fileList)
      })
  };

  onChangeCheckBox = (checkedValues) => {
    // console.log('checked = ', checkedValues);
    let newObject = checkedValues.map((item) => ({ id: item }))
    // console.log('newObject', newObject)
    this.setState({
      defaultCheckList: [...checkedValues],
      categories: newObject,
    });
    // console.log(this.state.categories)
  };

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
      fileList,
    })
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  handleEditProduct = async (e) => {
    e.preventDefault();
    //console.log(this.state.fileList)
    const uploadPromise = [];
    const uploadcurrent = [];
    const fileList = this.state.fileList
    // console.log(fileList)
    fileList.forEach((image) => {
      // console.log('imageForeach', image)
      if (!image.url) {
        const formData = new FormData()
        formData.append('file', image.originFileObj);
        // console.log(formData)
        uploadPromise.push(axios.post('http://192.168.1.198/wordpress-demo/wp-json/wp/v2/media', formData))
        // console.log(uploadPromise)
      } else {
        uploadcurrent.push({ 'src': image.url })
        // console.log(uploadcurrent)
      }
    })

    const images = await Promise.all(uploadPromise)
    // console.log(images)
    const imagescurrent = await Promise.all(uploadcurrent)
    // console.log(imagescurrent)

    let newimages = []
    images.forEach(item => {
      // console.log(item.data)
      newimages.push({ 'src': item.data.source_url })
      // console.log(newimages)
    })

    const imageProduct = uploadcurrent.concat(newimages)
    // console.log(imageProduct)

    const newProduct = {
      name: this.state.name,
      description: this.state.description,
      short_description: this.state.short_description,
      regular_price: this.state.regular_price,
      sku: this.state.sku,
      categories: this.state.categories,
      images: imageProduct,
    }
    axios.post('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products/' + this.props.match.params.id, newProduct)
      .then(response => {
        // console.log(response, 'response')
      })
    this.props.history.push("/")
  }

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
            <h1 style={{ marginBottom: '20px' }}>Edit Product</h1>
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
                  {fileList.length >= 8 ? null : uploadButton}
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
                  value={this.state.defaultCheckList}
                  options=
                  {
                    this.props.categories.map((categories) => ({
                      label: categories.name,
                      value: categories.id
                    }))
                  }
                  onChange={this.onChangeCheckBox} />
              </div>
              <Button onClick={this.handleEditProduct} type="primary">
                Edit Product
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
    Shop_GetListCategories
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ManEdit);