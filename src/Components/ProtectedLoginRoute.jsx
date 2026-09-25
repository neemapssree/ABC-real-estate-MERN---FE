import { isAuthenticated } from '../Authorization/Authorization'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLoginRoute = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />
}

export default ProtectedLoginRoute