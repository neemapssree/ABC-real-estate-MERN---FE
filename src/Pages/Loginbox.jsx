import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../Toolkit/userSlice';
import AxiosInstance from '../Config/AxiosInstance';
import { useAuth } from '../Context/AuthContext';


const Loginbox = ({ setBoxName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, setUser } = useAuth();

  const [loginData, setLoginData] = useState(
    {
      email: '',
      password: '',
    }
  );

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      if (loginData.email && loginData.password) {
        console.log(loginData, "login data");
        AxiosInstance.post('/auth/login', loginData).then((res) => {
          if (res.data.message === "User not found") {
            toast.warning('User not found');
          }
          if (res.data.message === "Logged in successfully" && res.data.token) {
            toast.success('Logged in successfully');
            localStorage.setItem('token', res.data.token);
            const parsedToken = parseJwt(res.data.token);
            localStorage.setItem('user', JSON.stringify(parsedToken));
            dispatch(setUserDetails(parsedToken));  //passing the user details  from parsed token to dispatch
            setUser(parsedToken);
            console.log('parsed token', parsedToken);
            // if (parsedToken.role === 1) {
            //   navigate('/admin-dashboard');
            // } else {
            //   navigate('/home');
            // }
          }
          if (res.data.message === "Enter the correct password" && !res.data.token) {
            toast.error('Password incorrect');
          }
        });
      } else {
        toast.error('Credentials not filled');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const gotoSignup = () => {
    setBoxName('signup');
  };

  useEffect(() => {
    if (user) {
      if (user.role === 1) {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    }
  }, [user, navigate]);

  return (
    <div className='loginForm'>
      <form>
        <div className="form-group my-3">
          <label htmlFor="email" className='mb-3'>Email</label>
          <input type="email" className="form-control customInput" id="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={e => { setLoginData({ ...loginData, email: e.target.value }) }} />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password" className='mb-3'>Password</label>
          <input type="password" className="form-control customInput" id="password" name="password" placeholder="Password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
        </div>
        <button type="submit" className="btn primaryBtn my-3" onClick={handleLogin}>Sign in</button>
        <p>Don't have an account? <span onClick={gotoSignup} className='btn text-white' style={{ textDecoration: 'underline' }}>Register here.</span></p>
      </form>
      {/* <button onClick={updateUserRole}>value:{userDetails.name}, {userRole}</button> */}
    </div>
  )
}

export default Loginbox