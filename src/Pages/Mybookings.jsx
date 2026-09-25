import React, { useEffect, useState } from 'react'
import AxiosInstance from '../Config/AxiosInstance'
import MainNavbar from '../Components/Navbar';
import MyBookingCard from '../Components/MyBookingCard';
import Footer from '../Components/Footer';

const Mybookings = () => {
    const [bookings,setBookings] = useState([]);

    useEffect(() => {
        getMyBookingsData()
    }, [])
    const getMyBookingsData = () => {
        AxiosInstance.get('/user/getMyBookingsData').then((res)=>{
            setBookings(res.data);            
        }).catch((error)=>{
            console.log(error);
        })
    }
  return (
    <>

    
        <div className='container my-5'>
            <div className='row'>
                <h1 className='mb-4'>My Bookings</h1>
                {bookings.map((booking) => <MyBookingCard bookingdata={booking} />)}
            </div>
        </div>

    </>
  )
}

export default Mybookings