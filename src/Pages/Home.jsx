import React, { useCallback, useEffect, useState } from 'react';
import '../main.scss';
import HomeBanner from '../Components/HomeBanner';
import AxiosInstance from '../Config/AxiosInstance';
import PropsCard from '../Components/PropsCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {  
  const [propData,setPropData] = useState([]);
  const navigate = useNavigate();

const getAllProperties = useCallback(() => {
    AxiosInstance.get('/user/getAllProperties')
      .then((response) => {
        setPropData(response.data);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.message === 'unauthorized user'
        ) {
          localStorage.clear();
          navigate('/login');
        }
      });
  }, [navigate]);

  useEffect (() => {
    getAllProperties();
  },[getAllProperties]);

   return (
    <>
      <HomeBanner />

      <div className="container my-5">
        <h2 className="my-4">Latest Projects</h2>

        <div className="row">
          {propData.map((prop) => (
            <PropsCard key={prop._id} data={prop} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home