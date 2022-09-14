import { BrowserRouter } from 'react-router-dom';
import ConfigRoute from './ConfigRoute';
import './style/App.scss';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <ConfigRoute/>
    </BrowserRouter>
    

  );
}

export default App;
