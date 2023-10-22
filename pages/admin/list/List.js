import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/nav/Navbar';
import './list.scss';

import { toast } from 'react-toastify';
import axios from 'axios';
import AdminProducts from '../../../components/AdminProducts';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const ProductsItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const LoadAllProducts = async () => {
    try {
      const accessTokentoken = JSON.parse(localStorage.getItem('token'));
      const refreshTokentoken = JSON.parse(
        localStorage.getItem('refreshToken')
      );
      setLoading(true);
      const REACT_APP_API_REQUEST_PRODUCT_SERV =
        'https://shopproduct.dev/api/v1/products';

      const res = await axios.get(
        `${REACT_APP_API_REQUEST_PRODUCT_SERV}/get-product`,
        {
          headers: {
            authorization: `Bearer ${accessTokentoken}`,
            xrefresh: refreshTokentoken,
          },
        }
      );
      setProducts(res.data.products);
      setLoading(false);
      console.log(products);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  useEffect(() => {
    LoadAllProducts();
  }, []);

  const handleRemoveProduct = async (slug) => {
    console.log(slug);
    if (window.confirm('delete')) {
      setLoading(true);

      try {
        const accessTokentoken = JSON.parse(localStorage.getItem('token'));
        const refreshTokentoken = JSON.parse(
          localStorage.getItem('refreshToken')
        );
        setLoading(true);
        const REACT_APP_API_REQUEST_PRODUCT_SERV =
          'https://shopproduct.dev/api/v1/products';

        const res = await axios.delete(
          `${REACT_APP_API_REQUEST_PRODUCT_SERV}/product/${slug}`,
          {
            headers: {
              authorization: `Bearer ${accessTokentoken}`,
              xrefresh: refreshTokentoken,
            },
          }
        );
        LoadAllProducts();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          {/* <div className="d-flex"> */}
          <div className="continer-fluid m-3">
            <div className="row">
              <div className="col">
                {loading ? (
                  <h4 className="text-danger">Loading Products ...</h4>
                ) : (
                  <h2>Products </h2>
                )}
                <div className="row">
                  {products.length > 0 &&
                    products.map((product) => (
                      <div key={product._id} className="col-md-4">
                        <Card
                          hoverable
                          cover={
                            <img
                              alt="product"
                              src={
                                product.images && product.images.length
                                  ? product.images[0]
                                  : ''
                              }
                              style={{
                                height: '150px',
                                objectFit: 'cover',
                                with: '100%',
                              }}
                              className="p-1"
                            />
                          }
                          actions={[
                            <Link to={`/update/${product.slug}`}>
                              <i className="fa fa-pencil text-primary btn"></i>
                            </Link>,
                            <i
                              onClick={() => handleRemoveProduct(product.slug)}
                              className="fa fa-trash-o text-danger btn"
                            ></i>,
                          ]}
                        >
                          <Meta
                            title={product.title}
                            description={`${
                              product.description &&
                              product.description.substring(0, 50)
                            }...`}
                          />
                        </Card>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ProductsItem;
