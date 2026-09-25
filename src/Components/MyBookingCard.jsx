import React, { useState } from 'react'
import AxiosInstance from '../Config/AxiosInstance'

const MyBookingCard = ({bookingdata}) => {

    const[deletingSlot,setDeletingSlot]=useState();

    const cancelBooking = (bookingSelected) => {
        setDeletingSlot(bookingSelected);
        
        AxiosInstance.post('/user/cancelBooking', deletingSlot)
            .then((res) => {
                debugger;
            })
            .catch((err) => {
                console.log(err);
            });
    };
  
  // const imageUrl = `${BASE_URL}/properties/${decodeURIComponent(data.propImg)}`; 
  return (
    <div className='col-md-4 mb-3'>
      <div className="card">
        
        <div className="card-body">
          <h3 className="card-title mb-3">{bookingdata?.propData.propname}</h3>
          <p className='fw-bold'>{bookingdata?.propData.propaddress}</p>
          <p><span className='fw-bold'>Time:</span> {bookingdata?.slot.name}</p>
          <p><span className='fw-bold'>Date:</span> {bookingdata?.date.split('T')[0]}</p>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          <button className="btn primaryBtn" onClick={()=> cancelBooking(bookingdata)}>Cancel Booking</button>
        </div>
      </div>
    </div>
  )
}

export default MyBookingCard