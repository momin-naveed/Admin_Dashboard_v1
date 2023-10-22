import axios from 'axios';

const REACT_APP_API_REQUEST_PRODUCT_SERV =
  'https://shopproduct.dev/api/v1/products';

export const getCategories = async (token, refreshtoken) => {
  const user = await axios.get(
    `${REACT_APP_API_REQUEST_PRODUCT_SERV}/categories`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        xrefresh: refreshtoken,
      },
    }
  );
  return user;
};

export const createProduct = async (values, token, refreshtoken) => {
  console.log('__________________________________', values);
  const user = await axios.post(
    `${REACT_APP_API_REQUEST_PRODUCT_SERV}/product`,
    {
      ...values,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        xrefresh: refreshtoken,
      },
    }
  );
  return user;
};
