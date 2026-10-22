import React from 'react'
import ContactForm from '../Components/ContactForm'

const Contact = () => {
  return (
    <div className='container py-5'>
      <div className="row py-5">
        <div className="col-sm-3">
          <h1 className="fs-3">Contact Us</h1>          
        </div>
        <div className="col-sm-6">
          <p className="fs-2">We would love to hear from you! Please fill out the form and we will get back to you as soon as possible.</p>
          <div className="p-3 bg-white shadow-lg rounded-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Contact