import { BrowserRouter } from 'react-router-dom';
import ConfigRoute from './ConfigRoute';
import './style/App.scss';

function App() {
  return (
    <BrowserRouter>
    <ConfigRoute/>
    </BrowserRouter>
    

  );
}

export default App;
