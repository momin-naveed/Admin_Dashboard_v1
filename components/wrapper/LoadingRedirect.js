import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  useEffect(() => {
    navigate('/');
    // const intervel = setInterval(() => {
    //   setCount((currentCount) => --currentCount);
    // }, 1000);
    // //redirect user
    // count === 0 && history.push('/');
    // return () => clearInterval(intervel);
  }, [navigate]);
  return (
    <>
      <div className="container p-5 text-center">
        <p>you will be redirect in {count} </p>
      </div>
    </>
  );
};

export default LoadingRedirect;
