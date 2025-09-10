
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Learning from './component/Learning';
import AIResponse from './component/AIResponse';
import Try from './component/Try';
import AdminPanel from './component/AdminPanel';
import UserList from './component/UserList';
import HistoryPage from './component/HistoryPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Learning" element={<Learning />} />
          <Route path="/ai-response" element={<AIResponse />} />
          <Route path="/try" element={<Try />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
