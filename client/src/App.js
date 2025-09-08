
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Learning from './component/Learning';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Learning" element={<Learning />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
