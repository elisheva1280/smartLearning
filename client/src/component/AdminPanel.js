import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [allHistory, setAllHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
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

  const filteredHistory = (() => {
    let filtered = allHistory;
    
    if (selectedUser) {
      filtered = filtered.filter(item => item.user_id?._id === selectedUser);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const userName = item.user_id?.name || '';
        const userPhone = item.user_id?.phone || '';
        return userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
               userPhone.includes(searchTerm);
      });
    }
    
    return filtered.slice().reverse();
  })();

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
                  <div className="d-flex gap-3 mb-4">
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowUsers(!showUsers)}
                      style={{ borderRadius: "1rem" }}
                    >
                      <i className="bi bi-people me-2"></i>
                      {showUsers ? 'היסטורית שאלות' : 'משתמשים'}
                    </button>
                  </div>

                  {showUsers && (
                    <div className="mb-4">
                      <h4 className="mb-3">רשימת משתמשים</h4>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="חיפוש משתמש לפי שם או טלפון..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          style={{ borderRadius: "1rem" }}
                        />
                      </div>
                      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {Array.isArray(users) && users.filter(user => {
                          if (!userSearchTerm) return true;
                          return user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                                 user.phone.includes(userSearchTerm);
                        }).map(user => (
                          <div key={user._id} className="card mb-2 border-0" style={{
                            background: "rgba(34, 197, 94, 0.05)",
                            borderRadius: "1rem"
                          }}>
                            <div className="card-body p-3">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-1 fw-bold">{user.name} - {user.phone}</h6>
                                  <small className="text-muted">
                                    {user.isAdmin ? 'מנהל' : 'משתמש רגיל'}
                                  </small>
                                </div>
                                <button 
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => {
                                    setSelectedUser(user._id);
                                    setShowUsers(false);
                                  }}
                                  style={{ borderRadius: "0.5rem" }}
                                >
                                  היסטוריית משתמש
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>היסטוריית שאלות</h4>
                      {selectedUser && (
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            setSelectedUser('');
                            setShowUsers(true);
                          }}
                          style={{ borderRadius: "0.5rem" }}
                        >
                          <i className="bi bi-arrow-left me-2"></i>
                          חזרה למשתמשים
                        </button>
                      )}
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
                          const userPhone = historyItem?.user_id?.phone || 'טלפון לא ידוע';
                          return (
                            <option key={userId} value={userId}>
                              {userName} - {userPhone}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="חיפוש לפי שם או טלפון..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ borderRadius: "1rem" }}
                      />
                    </div>
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