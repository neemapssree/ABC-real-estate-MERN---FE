import './App.css';
import AddProperty from './Pages/AddProperty';
import PropUserView from './Pages/PropUserView';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './main.css';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from './Pages/Success';
import Mybookings from './Pages/Mybookings';
import { AdminAuth, LoginAuth, UserAuth } from './Authorization/Authorization';


function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <BrowserRouter>
        <Routes>          
          {/* <Route element={<LoginAuth />}>
            <Route path='/' element={<Login />} />
          </Route>       */}
          <Route
            path="/"
            element={token ?  <Home /> : <Login />
            }
          />

          {/* user routes */}
          <Route element={<UserAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path='/success' element={<Success />} />          
            <Route path='/view-prop/:id' element={<PropUserView />} />
            <Route path='/my-bookings' element={<Mybookings />} />
          </Route>

          {/* admin router */}
          <Route element={<AdminAuth />}>
            <Route path='/add-property' element={<AddProperty />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
