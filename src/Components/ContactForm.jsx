import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../Schemas/ContactSchema';
import AxiosInstance from '../Config/AxiosInstance';
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css"; 
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState,
        reset
    } = useForm({   
        resolver: zodResolver(contactSchema),
        mode: "onTouched", // ⚡ Run validation dynamically when the user leaves a field
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        }
    });

    const { errors } = formState;

    const submitForm = async (data) => {
        try {
            const res = await AxiosInstance.post('/api/leads', data);
            console.log('Form submitted successfully:', res.data);
            reset();
            navigate('/thankyou');
        } catch (error) {
            console.error('Error submitting form to server:', error);
        }
    }

    const onInvalidSubmit = (validationErrors) => {
        console.warn("Form validation rejected by Zod:", validationErrors);
    }

  return (
    <div className='container my-5'>
        {/* Pass onInvalidSubmit as the second argument to handleSubmit */}
        <form className="row gx-3 gy-3 align-items-center contact-form" onSubmit={handleSubmit(submitForm, onInvalidSubmit)}>
            <div className="col-sm-6">                
                <label htmlFor='firstName' className="d-none sr-only">First Name</label>
                <input type='text' {...register('firstName')} className='form-control' placeholder='First Name' />
                {errors.firstName && <span className='text-danger d-block mt-1 small'> {errors.firstName.message}</span>}
            </div>
            <div className="col-sm-6">                
                <label htmlFor='lastName' className="d-none sr-only">Last Name</label>
                <input type='text' {...register('lastName')} className='form-control'  placeholder='Last Name' />
                {errors.lastName && <span className='text-danger d-block mt-1 small'> {errors.lastName.message}</span>}
            </div>
            <div className="col-sm-6"> 
                <label htmlFor='email' className="d-none sr-only">Email</label>
                <input type='email' {...register('email')} className='form-control' placeholder='Email' />
                {errors.email && <span className='text-danger d-block mt-1 small'> {errors.email.message}</span>}
            </div>
            <div className="col-sm-6">
                <label htmlFor='phone' className="d-none sr-only">Phone</label>
                <Controller 
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value } }) => ( 
                    <PhoneInput
                      international
                      withCountryCallingCode
                      defaultCountry="AE"
                      placeholder="Enter phone number"
                      value={value}
                      onChange={onChange}
                      id="phone-input"
                      className="form-control d-flex align-items-center gap-2" 
                    />
                  )} 
                />
                {errors.phone && <span className='text-danger d-block mt-1 small'> {errors.phone.message}</span>}
            </div>
            <div className="col-12">
                <label htmlFor='message' className="d-none sr-only">Message</label>
                <textarea id='message' {...register('message')} className='form-control' rows='5' placeholder='Enter Your Message'></textarea>
                {errors.message && <span className='text-danger d-block mt-1 small'> {errors.message.message}</span>}
            </div>
            <div className="col-12">
                <button type='submit' className='btn btn-primary w-100 mt-2'>Submit Application</button>
            </div>
        </form>
    </div>
  )
}

export default ContactForm