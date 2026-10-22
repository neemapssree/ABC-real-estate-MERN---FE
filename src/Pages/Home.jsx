import React, { useCallback, useEffect, useState } from 'react';
import '../main.scss';
import HomeBanner from '../Components/HomeBanner';
import AxiosInstance from '../Config/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import FeaturedProjects from '../Components/FeaturedProjects';

const Home = () => {  
  const [propData,setPropData] = useState([]);
  const navigate = useNavigate();

const getFeaturedProperties = useCallback(() => {
    AxiosInstance.get('/user/getFeaturedProperties')
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
    getFeaturedProperties();
  },[getFeaturedProperties]);

   return (
    <div className='home-page' style={{backgroundColor: '#0B1628'}}>
      <HomeBanner /> 
      <div className="container">
        <hr className='my-5' style={{borderTop: "1px solid #1E3248"}} />

        <FeaturedProjects data={propData} />
      </div>
    </div>
  );
}

export default Home