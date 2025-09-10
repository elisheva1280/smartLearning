import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [allHistory, setAllHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      // קבלת כל המשתמשים
      const usersResponse = await fetch('http://localhost:3001/api/users');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // קבלת כל הפרומפטים
      const historyResponse = await fetch('http://localhost:3001/api/prompts');
      const historyData = await historyResponse.json();
      setAllHistory(historyData);
    } catch (error) {
      console.error('שגיאה בטעינת נתונים:', error);
      setUsers([]);
      setAllHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = selectedUser 
    ? allHistory.filter(item => item.user_id?._id === selectedUser).reverse()
    : allHistory.slice().reverse();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div className="text-center text-white">
          <div className="spinner-border mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>טוען נתוני מנהל...</h4>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh"
    }}>
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-2xl" style={{
              borderRadius: "2rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)"
            }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="display-6 fw-bold mb-0" style={{ 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    <i className="bi bi-shield-check me-3"></i>
                    פאנל מנהל
                  </h1>
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => {
                      localStorage.removeItem('isAdmin');
                      navigate('/');
                    }}
                    style={{ borderRadius: "1rem" }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>יציאה
                  </button>
                </div>

                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card border-0" style={{ background: "rgba(102, 126, 234, 0.1)" }}>
                      <div className="card-body text-center">
                        <i className="bi bi-people text-primary" style={{ fontSize: "2rem" }}></i>
                        <h3 className="mt-2">{Array.isArray(users) ? users.length : 0}</h3>
                        <p className="mb-0">משתמשים רשומים</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0" style={{ background: "rgba(118, 75, 162, 0.1)" }}>
                      <div className="card-body text-center">
                        <i className="bi bi-chat-dots text-primary" style={{ fontSize: "2rem" }}></i>
                        <h3 className="mt-2">{Array.isArray(allHistory) ? allHistory.length : 0}</h3>
                        <p className="mb-0">שאלות בסך הכל</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0" style={{ background: "rgba(34, 197, 94, 0.1)" }}>
                      <div className="card-body text-center">
                        <i className="bi bi-person-check text-success" style={{ fontSize: "2rem" }}></i>
                        <h3 className="mt-2">{Array.isArray(allHistory) && allHistory.length > 0 ? new Set(allHistory.map(h => h.user_id?._id).filter(Boolean)).size : 0}</h3>
                        <p className="mb-0">משתמשים פעילים</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>היסטוריית שאלות</h4>
                    <select 
                      className="form-select w-auto"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      style={{ borderRadius: "1rem" }}
                    >
                      <option value="">כל המשתמשים</option>
                      {Array.isArray(allHistory) && allHistory.length > 0 && [...new Set(allHistory.map(h => h.user_id?._id).filter(Boolean))].map(userId => {
                        const historyItem = allHistory.find(h => h.user_id?._id === userId);
                        const userName = historyItem?.user_id?.name || 'משתמש לא ידוע';
                        return (
                          <option key={userId} value={userId}>
                            {userName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                    {!Array.isArray(filteredHistory) || filteredHistory.length === 0 ? (
                      <div className="text-center py-4">
                        <i className="bi bi-inbox text-muted" style={{ fontSize: "3rem" }}></i>
                        <p className="text-muted mt-2">אין היסטוריה</p>
                      </div>
                    ) : (
                      Array.isArray(filteredHistory) && filteredHistory.map((item, index) => (
                        <div key={item._id} className="card mb-3 border-0" style={{
                          background: "rgba(102, 126, 234, 0.05)",
                          borderRadius: "1rem"
                        }}>
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h6 className="mb-1 fw-bold text-primary">
                                  {item.user_id?.name || 'משתמש לא ידוע'} - {item.user_id?.phone || 'טלפון לא ידוע'}
                                </h6>
                                <small className="text-muted">
                                  {(() => {
                                    if (item.category && item.subcategory) {
                                      return `${item.category} • ${item.subcategory}`;
                                    }
                                    const response = item.response || '';
                                    const subcategoryMatch = response.match(/על ([^ב]+) בתחום/);
                                    const categoryMatch = response.match(/בתחום ([^.]+)/);
                                    const subcategory = subcategoryMatch?.[1]?.trim() || 'תת-קטגוריה';
                                    const category = categoryMatch?.[1]?.trim() || 'קטגוריה';
                                    return `${category} • ${subcategory}`;
                                  })()} • 
                                  {item.create_at ? new Date(item.create_at).toLocaleString('he-IL', {
                                    year: 'numeric',
                                    month: '2-digit', 
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  }) : 'תאריך לא ידוע'}
                                </small>
                              </div>
                            </div>
                            <div className="mb-2">
                              <strong>שאלה:</strong> {String(item.prompt || '')}
                            </div>
                            <div>
                              <strong>תשובה:</strong> {String(item.response || '')}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;