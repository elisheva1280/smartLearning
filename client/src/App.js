
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Learning from './component/Learning';
import Admin from './component/Admin';
import MyComponent from './component/MyComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Learning" element={<Learning />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/MyComponent" element={<MyComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
