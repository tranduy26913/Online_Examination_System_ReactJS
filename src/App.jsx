import { BrowserRouter } from 'react-router-dom';
import ConfigRoute from './ConfigRoute';
import './style/App.scss';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import BackgroundAnimation from 'components/BackgroundAnimation';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  console.log(process.env.REACT_APP_GoogleClientID);
  return (
    
    <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GoogleClientID}>
      <Header />
      <BackgroundAnimation/>
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
    </BrowserRouter>


  );
}

export default App;
