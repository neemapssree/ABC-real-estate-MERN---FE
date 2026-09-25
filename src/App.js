import './App.css';
import AddProperty from './Pages/AddProperty';
import PropUserView from './Pages/PropUserView';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './main.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Success from './Pages/Success';
import Mybookings from './Pages/Mybookings';
import { AdminAuth, UserAuth } from './Authorization/Authorization';
import AdminDashboard from './Pages/AdminDashboard';
import AdminHome from './Components/AdminComponents/AdminHome';
import PropertiesView from './Components/AdminComponents/Properties View/PropertiesView';
import ProtectedLoginRoute from './Components/ProtectedLoginRoute';

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
    <Routes>
        {/* <Route element={<LoginAuth />}>
            <Route path='/' element={<Login />} />
          </Route>       */}
        <Route
          path="/"
          element=
          {token ? (
            user.role === 1 ? (
              <Navigate to="/admin-dashboard" replace />
            ) : (
              <Navigate to="/home" replace />
            )
          ) : (
            <Navigate to="/home" replace />
          )}
        />

      <Route path="/home" element={<Home />} />
      <Route path='/view-prop/:id' element={<PropUserView />} />

      <Route element={<ProtectedLoginRoute />}>
          <Route path="/login" element={<Login />} />
      </Route>
      
        {/* user routes */}
        <Route element={<UserAuth />}>          
          <Route path='/success' element={<Success />} />          
          <Route path='/my-bookings' element={<Mybookings />} />
        </Route>

        {/* admin router */}
        <Route element={<AdminAuth />}>
          <Route path='/admin-dashboard' element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path='add-property' element={<AddProperty />} />
            <Route path='properties' element={<PropertiesView />} />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>     
    </>
  );
}

export default App;
