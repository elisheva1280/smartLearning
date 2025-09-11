import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        navigate('/');
      } else {
        setError(data.error || 'שגיאה ברישום');
      }
    } catch (error) {
      setError('שגיאה בחיבור לשרת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: "10%",
        right: "10%",
        width: "200px",
        height: "200px",
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "float 7s ease-in-out infinite"
      }}></div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      <div className="card border-0" style={{
        borderRadius: "2.5rem",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(25px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        width: "100%",
        maxWidth: "450px"
      }}>
        <div className="card-body p-4">
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 15px 35px rgba(102, 126, 234, 0.3)",
              border: "2px solid rgba(255, 255, 255, 0.3)"
            }}>
              <i className="bi bi-person-plus text-white" style={{ fontSize: "2rem" }}></i>
            </div>
            <h2 className="fw-bold mb-2" style={{ 
              color: "white",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              fontSize: "2rem"
            }}>
              הרשמה
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>צור חשבון חדש!</p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="form-label" style={{ color: "white", fontWeight: "500", marginBottom: "0.8rem", textAlign: "right", display: "block" }}>שם מלא</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ 
                  borderRadius: "1.2rem",
                  padding: "1rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontSize: "1.1rem",
                  direction: "rtl",
                  textAlign: "right"
                }}
                placeholder="הכנס שם מלא"
              />
            </div>



            <div className="mb-4">
              <label className="form-label" style={{ color: "white", fontWeight: "500", marginBottom: "0.8rem", textAlign: "right", display: "block" }}>מספר טלפון</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{ 
                  borderRadius: "1.2rem",
                  padding: "1rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontSize: "1.1rem",
                  direction: "rtl",
                  textAlign: "right"
                }}
                placeholder="הכנס מספר טלפון"
              />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ color: "white", fontWeight: "500", marginBottom: "0.8rem", textAlign: "right", display: "block" }}>סיסמה</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="4"
                  style={{ 
                    borderRadius: "1.2rem", 
                    padding: "1rem 3.5rem 1rem 1.5rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "white",
                    fontSize: "1.1rem",
                    direction: "rtl",
                    textAlign: "right"
                  }}
                  placeholder="הכנס סיסמה"
                />
                <button
                  type="button"
                  className="btn position-absolute"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    padding: "8px",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "1.2rem",
                    zIndex: 10
                  }}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ color: "white", fontWeight: "500", marginBottom: "0.8rem", textAlign: "right", display: "block" }}>אימות סיסמה</label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ 
                    borderRadius: "1.2rem", 
                    padding: "1rem 3.5rem 1rem 1.5rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "white",
                    fontSize: "1.1rem",
                    direction: "rtl",
                    textAlign: "right"
                  }}
                  placeholder="אמת סיסמה"
                />
                <button
                  type="button"
                  className="btn position-absolute"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    padding: "8px",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "1.2rem",
                    zIndex: 10
                  }}
                >
                  <i className={`bi ${showConfirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
              style={{ borderRadius: "1rem" }}
            >
              {loading ? 'נרשם...' : 'הירשם'}
            </button>
          </form>

          <div className="text-center">
            <button
              className="btn btn-link"
              onClick={() => navigate('/login')}
            >
              יש לך חשבון? התחבר כאן
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;