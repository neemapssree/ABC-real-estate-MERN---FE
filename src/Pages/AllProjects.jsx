import React, { useEffect, useState } from 'react';
import PropsCard from '../Components/PropsCard';
import AxiosInstance from '../Config/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const AllProjects = () => {

    const [propData, setPropData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const getAllProjects = async () => {
            try {

                const response = await AxiosInstance.get(
                    'user/getAllProperties'
                );

                console.log('GET ALL PROJECTS:', response.data);

                setPropData(response.data);

            } catch (err) {

                console.error(
                    'GET PROJECTS ERROR:',
                    err.response?.data || err.message
                );

                if (
                    err.response?.data?.message === 'unauthorized user'
                ) {
                    localStorage.clear();
                    navigate('/login');
                }
            }
        };

        getAllProjects();

    }, [navigate]);

    return (
        <div className='mt-5'>
            <div className="container pt-5">
                <div className="row pt-5">
                    {propData.length > 0 ? (
                        propData.map((prop) => (
                            <PropsCard key={prop._id} data={prop} isDark ="true" />
                        ))
                        
                    ) : (
                        <p>No properties found.</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AllProjects;