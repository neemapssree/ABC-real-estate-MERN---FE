import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const timeOut = setTimeout(() => {
            navigate(-1);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeOut);
        };
    }, [navigate]);

  return (
    <div className="vh-100 mt-0 d-flex align-items-center" style={{ backgroundImage: 'url(/images/abc-real-estate-banner.webp)', backgroundSize:"cover", backgroundPosition:'top', backgroundRepeat:"no-repeat"}}>
        <div className="container text-center px-5 text-light padding-v-10" style={{backgroundColor: "#0B162890"}}>
            <h1 className="mb-3">✓ Submission Successful!</h1>
            <p className="lead">Thank you for getting in touch. We have received your message.</p>
            
            <div className="alert alert-info mt-4" role="alert">
                You will be automatically redirected back to the form in{' '}
                <strong className="text-dark">{countdown}</strong> seconds...
            </div>
            
            <button 
                onClick={() => navigate(-1)} 
                className="btn btn-outline-secondary mt-3 btn-sm"
            >
                Go back immediately
            </button>
        </div>      
    </div>
  )
}

export default Thankyou