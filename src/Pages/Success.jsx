import { useEffect, useState } from 'react'

const Success = () => {
    const [orderId,setOrderId] = useState(null);
    const [slotDate,setSlotDate] = useState(null);
    const [slotTime,setSlotTime] = useState(null);
    const [prop,setProp] = useState(null);

    useEffect(()=> {
        function getQueryParam(name) {
            const urlSearchParams = new URLSearchParams(window.location.search);
            return urlSearchParams.get(name);                        //function to search for the param name orderId
        };
        // Get orderId from the query parameters
        const orderIdFromUrl = getQueryParam('orderId');        
        setOrderId(orderIdFromUrl);
        const slotDateFromUrl = getQueryParam('slotDate');        
        setSlotDate(slotDateFromUrl);
        const slotTimeFromUrl = getQueryParam('slotTime');        
        setSlotTime(slotTimeFromUrl);
        const propFromUrl = getQueryParam('prop');        
        setProp(propFromUrl); 
    }, []);    

    // useEffect(()=> {
    //     const timer = setTimeout(() => {
    //         navigate(-3);
    //     }, 2000)
    //     return () => clearTimeout(timer);
    // },[navigate])

    return (
        <div className='container-fluid w-100 bg-success text-center' style={{height:"100vh"}}>
            <div className='row align-content-center h-100'>
                <h1 className='text-light text-center'>Payment Successfull</h1>
                {orderId ? (<p><strong>Order id:</strong> {orderId}</p>) : (<p>Order id not found</p>) }
                {slotDate ? (<p><strong>Booked Date:</strong> {slotDate}</p>) : (<p>Booked Date not found</p>) }
                {slotTime ? (<p><strong>Time:</strong> {slotTime}</p>) : (<p>Booked Time not found</p>) }                
                {prop ? (<p><strong>Property booked:</strong> {prop}</p>) : (<p>Booked property not found</p>) }
                <p className='text-light my-4'>Check your email for more details</p>
                <a href='/home' className='btn secondBtn w-auto mx-auto'>Go to Home</a>
            </div>            
        </div>
    )
}

export default Success