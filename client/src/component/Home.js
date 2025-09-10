import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showUserNotFound, setShowUserNotFound] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name.trim() || !phone.trim()) {
      alert('יש למלא שם וטלפון');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3001/api/users/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.exists) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userPhone', phone);
        localStorage.setItem('userKey', `${name}_${phone}`);
        if (data.isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        }
        navigate('/Learning');
      } else {
        setShowUserNotFound(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('fetch')) {
        alert('לא ניתן להתחבר לשרת. בדוק שהשרת פועל.');
      } else {
        alert(`שגיאה: ${error.message}`);
      }
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!privacyAccepted) {
      alert('יש לאשר את מדיניות הפרטיות');
      return;
    }
    
    try {
      // Save user to database
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone })
      });
      
      if (response.ok) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userPhone', phone);
        localStorage.setItem('userKey', `${name}_${phone}`);
        navigate('/Learning');
      } else {
        alert('שגיאה ברישום. נסה שוב.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('שגיאה ברישום. נסה שוב.');
    }
  };

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh"
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="card border-0 shadow-2xl" style={{
              borderRadius: "2rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)"
            }}>
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
                  }}>
                    <i className="bi bi-mortarboard text-white" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h1 className="display-5 fw-bold mb-3" style={{ 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em"
                  }}>SMART LEARNING</h1>
                  <p className="lead text-muted mb-0">Your AI-powered learning companion</p>
                </div>

                {!isNewUser ? (
                  <>
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="השם שלך"
                          style={{ borderRadius: "1rem", fontSize: "1.1rem" }}
                        />
                        <label htmlFor="name" className="fw-semibold">
                          <i className="bi bi-person me-2"></i>שם מלא
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="tel"
                          id="phone"
                          className="form-control form-control-lg"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder="מספר הטלפון שלך"
                          style={{ borderRadius: "1rem", fontSize: "1.1rem" }}
                        />
                        <label htmlFor="phone" className="fw-semibold">
                          <i className="bi bi-telephone me-2"></i>מספר טלפון
                        </label>
                      </div>
                    </div>

                    {showUserNotFound && (
                      <div className="alert alert-warning mb-4" style={{ borderRadius: "1rem" }}>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        משתמש לא קיים במערכת
                      </div>
                    )}

                    <div className="d-grid gap-3">
                      <button 
                        type="button"
                        onClick={handleLogin}
                        className="btn btn-lg fw-bold text-white"
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          borderRadius: "1rem",
                          padding: "1rem",
                          fontSize: "1.1rem"
                        }}
                      >
                        כניסה
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => {
                          setIsNewUser(true);
                          setShowUserNotFound(false);
                        }}
                        className="btn btn-outline-primary btn-lg fw-bold"
                        style={{
                          borderRadius: "1rem",
                          padding: "1rem",
                          fontSize: "1.1rem"
                        }}
                      >
                        משתמש חדש
                      </button>
                      
                      <button 
                        type="button"
                        onClick={async () => {
                          if (!name.trim() || !phone.trim()) {
                            alert('יש למלא שם וטלפון');
                            return;
                          }
                          
                          try {
                            const response = await fetch('http://localhost:3001/api/users/check', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ name, phone })
                            });
                            const data = await response.json();
                            console.log('Server response:', data);
                            
                            if (data.exists && data.isAdmin === true) {
                              localStorage.setItem('isAdmin', 'true');
                              localStorage.setItem('userName', name);
                              localStorage.setItem('userPhone', phone);
                              localStorage.setItem('userKey', `${name}_${phone}`);
                              navigate('/admin');
                            } else if (data.exists && data.isAdmin === false) {
                              alert('משתמש קיים אבל לא מנהל');
                            } else if (data.exists) {
                              alert('משתמש קיים אבל לא מנהל (undefined)');
                            } else {
                              alert('משתמש לא קיים במערכת');
                            }
                          } catch (error) {
                            alert('שגיאה בבדיקת מנהל');
                          }
                        }}
                        className="btn btn-outline-secondary btn-lg fw-bold"
                        style={{
                          borderRadius: "1rem",
                          padding: "1rem",
                          fontSize: "1.1rem"
                        }}
                      >
                        <i className="bi bi-shield-lock me-2"></i>
                        כניסת מנהל
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleRegistration}>
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="newName"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="השם שלך"
                          style={{ borderRadius: "1rem", fontSize: "1.1rem" }}
                        />
                        <label htmlFor="newName" className="fw-semibold">
                          <i className="bi bi-person me-2"></i>שם מלא
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="form-floating">
                        <input
                          type="tel"
                          id="newPhone"
                          className="form-control form-control-lg"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder="מספר הטלפון שלך"
                          style={{ borderRadius: "1rem", fontSize: "1.1rem" }}
                        />
                        <label htmlFor="newPhone" className="fw-semibold">
                          <i className="bi bi-telephone me-2"></i>מספר טלפון
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="form-check d-flex align-items-center p-3 rounded-3" style={{ background: "rgba(102, 126, 234, 0.1)" }}>
                        <input
                          type="checkbox"
                          id="privacy"
                          className="form-check-input me-3"
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          required
                          style={{ transform: "scale(1.2)" }}
                        />
                        <label htmlFor="privacy" className="form-check-label fw-semibold">
                          <i className="bi bi-shield-check me-2 text-success"></i>
                          אשר את מדיניות הפרטיות שלנו
                        </label>
                      </div>
                    </div>

                    <div className="d-grid gap-3">
                      <button 
                        type="submit"
                        className="btn btn-lg fw-bold text-white"
                        disabled={!privacyAccepted}
                        style={{
                          background: privacyAccepted ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#ccc",
                          border: "none",
                          borderRadius: "1rem",
                          padding: "1rem",
                          fontSize: "1.1rem"
                        }}
                      >
                        להרשמה
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => setIsNewUser(false)}
                        className="btn btn-link text-muted"
                      >
                        חזור
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
