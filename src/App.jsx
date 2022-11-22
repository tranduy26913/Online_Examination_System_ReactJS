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
import StateActivity from 'components/StateActivity';
import ErrorBoundary from 'components/ErrorPage/ErrorBoundary';
import ScrollToTop from 'components/ScrollToTop';
import moment from 'moment'
import 'moment/locale/vi';

function App() {
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  try {
    moment.updateLocale('vi', {
      weekdays: 'Chủ nhật_Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy'.split('_'),
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        //LLLL : 'dddd D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm:ss'
      },
      relativeTime: {
        ss: '%d giây',
        mm: "%dm",
        hh: "%dh",
      }
    })
  } catch (err) {

  }
  if (accessToken && refreshToken) {

    axiosInstance(accessToken, refreshToken, dispatch, loginSuccess, logoutSuccess);
  }
  return (
    <BrowserRouter>
      <Header />
      <ErrorBoundary>
        <ScrollToTop />

        <CheckAuthentication>

          <GoogleOAuthProvider clientId={process.env.REACT_APP_GoogleClientID}>

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
            <StateActivity />
          </GoogleOAuthProvider>
        </CheckAuthentication>
      </ErrorBoundary>
    </BrowserRouter>


  );
}

export default App;
