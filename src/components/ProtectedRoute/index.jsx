
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
const { useSelector } = require("react-redux");

const ProtectedRoute = ({ children }) => {
   // const user = useSelector(state => state.user.info)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    if (!refreshToken) {
      toast.warning("Vui lòng đăng nhập để thực hiện thao tác này")
      return <Navigate to="/" replace />;
    }
  
    return children ? children : <Outlet />;
  };

export default ProtectedRoute