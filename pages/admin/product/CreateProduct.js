import React, { useEffect, useState } from 'react';
import {
  createProduct,
  getCategories,
} from '../../../components/requests/categories';
import Navbar from '../../../components/nav/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Avatar, Badge } from 'antd';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
// // import { Avatar, Badge } from '@mui/material';
import { Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
const { Option } = Select;
let imgs = [];

export const CreateProduct = () => {
  const [values, setValues] = useState({
    title: 'kasjd kj ksjrk gd;fkjnsskjn ;gker; j;er',
    description: 'k ,jerlietr hierh gilerier',
    richDescription: 'kerj htliweh rliyerh ;ither; ihe;roijh',
    price: 0,
    category: '64559c817f999e624c4f8f9a',
    categories: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'White', 'Silver', 'Grey', 'Blue'],
    brands: ['Apple', 'Samsung', 'Hp', 'Lenovo', 'Asus'],
    color: '',
    brand: '',
    warranty: 5,
  });
  const [cate, setCat] = useState('');
  const {
    title,
    description,
    richDescription,
    categories,
    subs,
    price,
    shipping,
    sold,
    quantity,
    warranty,
    images,
    colors,
    brands,
    brand,
    category,
    color,
  } = values;

  const [subOptions, setSubOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessTokentoken = JSON.parse(localStorage.getItem('token'));
    const refreshTokentoken = JSON.parse(localStorage.getItem('refreshToken'));

    const REACT_APP_API_REQUEST_PRODUCT_SERV =
      'https://shopproduct.dev/api/v1/products';

    try {
      const user = await axios.post(
        `${REACT_APP_API_REQUEST_PRODUCT_SERV}/product`,
        {
          title: values.title,
          description: values.description,
          richDescription: values.richDescription,
          images: imgs,
          price: values.price,
          quantity: values.quantity,
          shipping: values.shipping,
          colors: values.colors,
          warranty: values.warranty,
          category: cate,
        },
        {
          headers: {
            authorization: `Bearer ${accessTokentoken}`,
            xrefresh: refreshTokentoken,
          },
        }
      );
      window.alert(`Product is created`);
      window.location.reload();
      return user;
    } catch (err) {
      console.log('=====================>', err);
      //     //error Getting from backend
      toast.error(err.response.data.data);
    }
  };

  const handleChange = (e) => {
    // this is how to hanlde more field forms
    //for each value we will spread out the value
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadCategories = () => {
    const accessTokentoken = JSON.parse(localStorage.getItem('token'));
    const refreshTokentoken = JSON.parse(localStorage.getItem('refreshToken'));
    getCategories(accessTokentoken, refreshTokentoken)
      .then((res) => {
        console.log(res.data.categorys);
        setValues({ ...values, categories: res.data.categorys });
      })
      .catch((err) => {
        console.log('ERROROROOROOR', err);
      });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setCat(e.target.value);

    // setValues({ ...values, category: e.target.value });
    // console.log(values.category);
    // values.category = e.target.value;
    setShow(true);
    console.log(cate);
  };

  const handleFileResizeAndUpload = async (e) => {
    const accessTokentoken = JSON.parse(localStorage.getItem('token'));
    const refreshTokentoken = JSON.parse(localStorage.getItem('refreshToken'));

    let files = e.target.files; // multiple img upload ||e.target.files[0]  for single pic upload
    let allFiles = values.images;
    // console.log(allFiles);
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `https://shopproduct.dev/api/v1/products/uploadimage`,
                { image: uri },
                {
                  headers: {
                    authorization: `Bearer ${accessTokentoken}`,
                    xrefresh: refreshTokentoken,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                // console.log('IMAGES UPLOAD :   ', res);
                // console.log(res.data);
                allFiles.push(res.data);
                imgs.push(res.data.result.url);

                // console.log(
                //   '______________________________________',
                //   res.data.result.url
                // );

                console.log(imgs);
                setValues({ ...values, images: allFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('==============>', err);
              });
          },
          'base64'
        );
      }
    }
  };
  const handleBadgeClick = (public_id) => {
    const accessTokentoken = JSON.parse(localStorage.getItem('token'));
    const refreshTokentoken = JSON.parse(localStorage.getItem('refreshToken'));
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_REQUEST_PRODUCT_SERV}/removeimage`,
        { public_id },
        {
          headers: {
            authorization: `Bearer ${accessTokentoken}`,
            xrefresh: refreshTokentoken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const currentImages = values.images.filter((img) => {
          return img.public_id !== public_id;
        });

        setValues({ ...values, images: currentImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="home">
      {/* {JSON.stringify(values.images[0].result.url)} */}
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="col-md-10 mt-2">
          {loading ? (
            <LoadingOutlined
              className="text-danger"
              style={{ fontSize: '40px' }}
            />
          ) : (
            <h4>Create Product</h4>
          )}
          <hr />
          <div className="p-3">
            <div className="row">
              <label className="btn btn-raised btn-info">
                {' '}
                Choose File
                <input
                  type="file"
                  multiple
                  hidden
                  accept="images/*"
                  onChange={handleFileResizeAndUpload}
                />
              </label>
            </div>
            <div className="row">
              {values.images &&
                values.images.map((img) => (
                  <Badge
                    count="X"
                    key={img.result.public_id}
                    onClick={() => handleBadgeClick(img.result.public_id)}
                    style={{ cursor: 'pointer' }}
                    className="mt-2"
                  >
                    <Avatar src={img.result.url} size={100} className="m-2" />
                  </Badge>
                ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Rich Description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={richDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Colors</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Brands</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleCategoryChange}
              >
                <option disabled>Select any category</option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* {show ? subOptions.length : "number"} */}

            {/* {show && (
                    <div>
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={(value) =>
                          setValues({ ...values, subs: value })
                        }
                        value={subs}
                      >
                        {subOptions.map((sub) => (
                          <Option key={sub._id} value={sub._id}>
                            {sub.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  )} */}

            <button className="btn btn-outline-info mb-3">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};
