import { Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { currentAdmin } from '../../requests/auth';
import LoadingRedirect from './LoadingRedirect';

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const isAdmin = async () => {
    const accessTokentoken = JSON.parse(localStorage.getItem('token'));
    const refreshTokentoken = JSON.parse(localStorage.getItem('refreshToken'));

    if (accessTokentoken && refreshTokentoken) {
      setOk(true);
      console.log('======================================>', ok);
    }
  };

  // const checkAdmin = () => {
  //   if (accessTokentoken && refreshTokentoken) {
  //     currentAdmin(accessTokentoken, refreshTokentoken)
  //       .then((res) => {
  //         setOk(true);
  //         console.log(res.data);
  //         console.log('CURRENT ADMIN', res);
  //         console.log('======================================>', ok);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setOk(false);
  //       });
  //   }
  // };

  useEffect(() => {
    isAdmin();
  }, [ok]);
  return <>{children}</>;

  // if (!ok) {
  //   return <>{children}</>;
  // } else {
  //   return <LoadingRedirect />;
  // }
};

export default AdminRoute;
