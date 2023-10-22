import axios from 'axios';
const BASE_URI_AUTH = 'https://shopproduct.dev/api/v1/users';

export const loginUser = async (userName, password) => {
  const user = await axios.post(`${BASE_URI_AUTH}/signin`, {
    email: userName,
    password,
  });

  return user;
};

export const getUsers = async (token, refreshtoken) => {
  const user = await axios.get(`${BASE_URI_AUTH}/get-users`, {
    headers: {
      authorization: `Bearer ${token}`,
      xrefresh: refreshtoken,
    },
  });
  return user;
};

export const currentAdmin = async (token, refreshtoken) => {
  const user = await axios.get(`${BASE_URI_AUTH}/current-user`, {
    headers: {
      authorization: `Bearer ${token}`,
      xrefresh: refreshtoken,
    },
  });
  return user;
};
