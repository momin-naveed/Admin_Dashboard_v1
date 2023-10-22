import React from 'react';
import './login.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  LockOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Input, Tooltip, Button } from 'antd';
import loginImg from '../../../assets/login.jpg';
import { useState } from 'react';
import { loginUser } from '../../../requests/auth';

const Login = () => {
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('strong!Passsword123');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log(user);
      setEmail('');
      setPassword('');
      toast.success('Login successfull');
      localStorage.setItem('token', JSON.stringify(user.data.accessToken));
      localStorage.setItem(
        'refreshToken',
        JSON.stringify(user.data.refreshToken)
      );
      navigate('/dashboard');
    } catch (err) {
      console.log('=========>', err.response.data.errors[0].message);

      setError(err.response.data.errors[0].message);
      toast.error(error);
    }
  };

  return (
    <>
      <section className="container">
        <div className="box-1">
          <div className="img-cont">
            <img className="img" src={loginImg} alt="" />
          </div>
        </div>
        <div className="box-2">
          <form className="form">
            <h2>Log In</h2>
            <br />
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined
                    style={{
                      color: 'rgba(0,0,0,.45)',
                    }}
                  />
                </Tooltip>
              }
            />
            <br />
            <br />
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />

            <br />
            <br />

            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
