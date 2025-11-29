import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AxiosInstance from '../Config/AxiosInstance';


const SignupBox = ({setBoxName}) => {

  const [signUpData,setSignUpData] = useState(
    {
    name:'',
    email:'',
    phone:'',
    country:'',
    gender:'',
    password:'',
    confirmpassword:'',
    }
  );

  const [errors, setErrors] = useState({});

  function validatePhoneNumber(phoneNumber, minPhoneLength, maxPhoneLength) {
    const phoneRegex = new RegExp(`^[0-9]{${minPhoneLength},${maxPhoneLength}}$`);  
    return phoneRegex.test(phoneNumber);
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const validationErrors ={}

    if(!signUpData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if(!signUpData.email.trim()) {
      validationErrors.email = "Email Id is required";
    } else if(!/\S+@\S+\.\S+/.test(signUpData.email)) {
      validationErrors.email = "Enter a valid Email";
    }

    if(!signUpData.gender.trim()) {
      validationErrors.gender = "Gender is required";
    }
    if(!signUpData.country.trim()) {
      validationErrors.country = "Country is required";
    }
    if(!signUpData.password.trim()) {
      validationErrors.password = "Password is required";
    }else if (signUpData.password.length < 5) {
      validationErrors.password = "Password should be at least 5 character";
    }

    if(signUpData.password !== signUpData.confirmpassword) {
      validationErrors.confirmpassword = "Passwords are not matching";
    }
    if(signUpData.phone.trim() !== '') {
      const isValidPhone = validatePhoneNumber(signUpData.phone,4,15); //4 and 15 are min and max length of phone.
      if (!isValidPhone) {
        validationErrors.phone = 'Phone number is invalid';
      }
    } 

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0) {
      try{      
        AxiosInstance.post('/auth/sign-up',signUpData).then((res)=>{
          console.log(res);
          if(res.data.message==="signup successfull"){
            toast.success('Sign up successfull');
            setBoxName('login');
          }
          if(res.data.message==="email already exist"){
            toast.error('Email already exist');
          }
        });
      } catch(err) {
        console.log(err);
      }
    }    
  };  

//  useEffect(() =>{
//   console.log("inside useeffect", signUpData);
//  }, [signUpData]);

  const gotologin = () => {
    setBoxName('login');
  };

  return (
      <div className='signupForm text-start'>
        <h1 className='text-center mb-5'>Register Now</h1>
        <form>
          <div className="form-group my-3">          
            <input type="text" className="form-control customInput" id="name" name="name" placeholder="Enter Name" value={signUpData.name} onChange={e=>{setSignUpData({...signUpData,name:e.target.value})}} />
            {errors.name && <span className='errors'>{errors.name}</span>}                    
          </div>
          <div className="form-group my-3">            
            <input type="email" className="form-control customInput" id="email" name="email" placeholder="Enter Email" value={signUpData.email} onChange={e=>{setSignUpData({...signUpData,email:e.target.value})}} />
            {errors.email && <span className='errors'>{errors.email}</span>}                     
          </div>
          <div className="form-group my-3">            
            <input type="phone" className="form-control customInput" id="phone" name="phone" placeholder="Enter Phone Number" value={signUpData.phone} onChange={e=>{setSignUpData({...signUpData,phone:e.target.value})}} />  
            {errors.phone && <span className='errors'>{errors.phone}</span>}                   
          </div>
          <div className="form-group my-3">  
            <select name="country" className="form-control  customInput" id="country" value={signUpData.country} onChange={e=>{setSignUpData({...signUpData,country:e.target.value})}} >
              <option value="">Select Country</option>
              <option value="india">India</option>
              <option value="united arab emirates">United Arab Emirates</option>  
              <option value="united states">United States</option>
              <option value="germany">Germany</option>
            </select>    
            {errors.country && <span className='errors'>{errors.country}</span>}         
          </div>
          <div className="form-group my-3">
            <p className='mb-3'>Select your Gender</p>
            <input type="radio" name="gender" id="male" value="male" checked={signUpData.gender==='male'} onChange={e=>{setSignUpData({...signUpData,gender:e.target.value})}} /><label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" checked={signUpData.gender === 'female'} onChange={e=>{setSignUpData({...signUpData,gender:e.target.value})}} /><label htmlFor="male">Female</label>
            <input type="radio" name="gender" id="other" value="other" checked={signUpData.gender === 'other'} onChange={e=>{setSignUpData({...signUpData,gender:e.target.value})}} /><label htmlFor="male">Other</label>   
            {errors.gender && <div className='errors'>{errors.gender}</div>}                  
          </div>
          <div className="form-group my-3">            
            <input type="password" className="form-control customInput" id="password" name="password" placeholder="Password" value={signUpData.password} onChange={e=>{setSignUpData({...signUpData,password:e.target.value})}} />
            {errors.password && <span className='errors'>{errors.password}</span>} 
          </div>
          <div className="form-group my-3">            
            <input type="password" className="form-control customInput" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" value={signUpData.confirmpassword} onChange={e=>{setSignUpData({...signUpData,confirmpassword:e.target.value})}} />
            {errors.confirmpassword && <span className='errors'>{errors.confirmpassword}</span>} 
          </div>            
          <button type="submit" className="btn primaryBtn my-3" onClick={handleSignUp}>Submit</button>
        </form>
        <p>Already have an account? <span onClick={gotologin} className='btn text-white' style={{textDecoration: 'underline'}}>Sign in here.</span></p>
      </div>
          
  )
}

export default SignupBox