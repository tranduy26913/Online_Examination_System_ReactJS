import { BrowserRouter } from 'react-router-dom';
import ConfigRoute from './ConfigRoute';
import './style/App.scss';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ConfigRoute />
      <ToastContainer
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover={false}
      />
    </BrowserRouter>


  );
}

export default App;
