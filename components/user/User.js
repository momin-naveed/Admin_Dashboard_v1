import React, { useEffect, useState } from 'react';
import Navbar from '../nav/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './users.scss';
import { Button } from 'antd';
import { getUsers } from '../../requests/auth';

const User = () => {
  const [users, setUsers] = useState([]);

  const getALlUsers = async () => {
    try {
      const accessTokentoken = JSON.parse(localStorage.getItem('token'));
      const refreshTokentoken = JSON.parse(
        localStorage.getItem('refreshToken')
      );

      const result = await getUsers(accessTokentoken, refreshTokentoken);
      console.log('====================>', result);
      setUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getALlUsers();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">User ID</TableCell>
                  <TableCell className="tableCell">User Name</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">Order</TableCell>
                  <TableCell className="tableCell">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 &&
                  users.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="user"
                        className="tableCell"
                      >
                        {user._id}
                      </TableCell>
                      <TableCell className="tableCell">
                        <div className="productWrapper">
                          <img
                            src={user.image}
                            alt="product iamge"
                            className="image"
                          />
                          {user.firstName}
                          {user.lastName}
                        </div>
                      </TableCell>

                      <TableCell className="tableCell">{user.email}</TableCell>
                      <TableCell className="tableCell">{user.order}</TableCell>
                      <TableCell className="tableCell">
                        <Button type="primary" danger>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default User;
