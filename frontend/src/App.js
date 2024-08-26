import logo from './logo.svg';
import './App.css';
import {Route , Router  ,Routes} from 'react-router-dom'
import {Login} from "./pages/Login";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
