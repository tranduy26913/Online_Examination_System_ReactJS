import { BrowserRouter } from 'react-router-dom';
import ConfigRoute from './ConfigRoute';
import './style/App.scss';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import BackgroundAnimation from 'components/BackgroundAnimation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CheckAuthentication from 'components/CheckAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from 'apis/axiosClient';
import { loginSuccess, logoutSuccess } from 'slices/authSlice';
function App() {
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  if (accessToken && refreshToken) {
    axiosInstance(accessToken,refreshToken, dispatch, loginSuccess, logoutSuccess);
  }
  return (
    <BrowserRouter>
      <CheckAuthentication>

        <GoogleOAuthProvider clientId={process.env.REACT_APP_GoogleClientID}>
          <Header />
          <BackgroundAnimation />
          <ConfigRoute />
          <ToastContainer
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover={false}
          />
        </GoogleOAuthProvider>
      </CheckAuthentication>
    </BrowserRouter>


  );
}

export default App;
