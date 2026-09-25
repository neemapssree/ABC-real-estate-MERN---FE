import React, { useEffect, useState } from 'react';
import '../main.scss';
import HomeBanner from '../Components/HomeBanner';
import AxiosInstance from '../Config/AxiosInstance';
import PropsCard from '../Components/PropsCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {  
  const [propData,setPropData] = useState([]);
  const navigate = useNavigate();

  useEffect (() => {
    getAllProperties();
  },[]);

const getAllProperties =()=> {
    AxiosInstance.get('/user/getAllProperties').then((response) => {
        setPropData(response.data);
    }).catch((err) => {      
        if(err.response && err.response.data.message === "unauthorized user"){         
          localStorage.clear();
          navigate('/login');
        }
    })
}
  return ( 
    <>
    <HomeBanner />
    <div className='container my-5'>
      <h2 className='my-4'>Latest Projects</h2>   
      <div className='row'>
        {propData.map((prop)=> <PropsCard data={prop} />) }
      </div>
    </div> 
    </>
    
  )
}

export default Home