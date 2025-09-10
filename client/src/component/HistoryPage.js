import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const userName = localStorage.getItem('userName');
        const userPhone = localStorage.getItem('userPhone');
        console.log('מחפש היסטוריה עבור:', userName, userPhone);
        
        if (!userName || !userPhone) {
          console.log('אין נתוני משתמש');
          navigate('/');
          return;
        }
        
        // קבלת כל הפרומפטים וסינון בצד הקליינט
        const [usersResponse, promptsResponse, userCheckResponse] = await Promise.all([
          fetch('http://localhost:3001/api/users'),
          fetch('http://localhost:3001/api/prompts'),
          fetch('http://localhost:3001/api/users/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName, phone: userPhone })
          })
        ]);
        
        const users = await usersResponse.json();
        const allPrompts = await promptsResponse.json();
        const userData = await userCheckResponse.json();
        
        console.log('נתונים:', { users, allPrompts, userData });
        
        if (userData.exists) {
          console.log('משתמש קיים, מחפש פרומפטים עבור:', userName, userPhone);
          // חיפוש המשתמש במערך המשתמשים
          const currentUser = users.find(u => u.name === userName && u.phone === userPhone);
          console.log('משתמש נמצא במערך:', currentUser);
          
          if (currentUser) {
            // סינון פרומפטים של המשתמש הנוכחי
            const userPrompts = allPrompts.filter(prompt => {
              const promptUserId = prompt.user_id?._id || prompt.user_id;
              console.log('משווה:', promptUserId, 'עם', currentUser._id);
              return promptUserId === currentUser._id;
            });
            console.log('פרומפטים של המשתמש:', userPrompts);
            setPrompts(userPrompts.reverse());
          } else {
            console.log('משתמש לא נמצא במערך');
          }
        } else {
          console.log('משתמש לא קיים');
        }
      } catch (error) {
        console.error('שגיאה בטעינת ההיסטוריה:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div className="text-center text-white">
          <div className="spinner-border mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>טוען היסטוריה...</h4>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh",
      paddingBottom: "2rem"
    }}>
      <div className="container" style={{ paddingTop: "2rem" }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-2xl" style={{
              borderRadius: "2rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)"
            }}>
              <div className="card-body p-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div>
                    <h1 className="display-6 fw-bold mb-2" style={{ 
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      <i className="bi bi-clock-history me-3"></i>
                      היסטוריית למידה
                    </h1>
                    <p className="text-muted mb-0">כל השאלות והתשובות שלך</p>
                  </div>
                  <button 
                    className="btn btn-outline-primary btn-lg"
                    onClick={() => navigate('/learning')}
                    style={{
                      borderRadius: "1rem",
                      padding: "0.75rem 1.5rem"
                    }}
                  >
                    <i className="bi bi-arrow-right me-2"></i>
                    חזרה ללמידה
                  </button>
                </div>

                {prompts.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="mb-4">
                      <i className="bi bi-journal-x text-muted" style={{ fontSize: "4rem" }}></i>
                    </div>
                    <h3 className="text-muted mb-3">אין היסטוריה עדיין</h3>
                    <p className="text-muted mb-4">התחל ללמוד כדי לראות את ההיסטוריה שלך כאן</p>
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={() => navigate('/learning')}
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "1rem",
                        padding: "1rem 2rem"
                      }}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      התחל ללמוד
                    </button>
                  </div>
                ) : (
                  <div className="row g-4">
                    {prompts.map((prompt, index) => (
                      <div key={prompt._id} className="col-12">
                        <div className="card border-0 shadow-sm" style={{
                          borderRadius: "1.5rem",
                          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)"
                        }}>
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div className="d-flex align-items-center">
                                <div className="rounded-circle me-3 d-flex align-items-center justify-content-center" style={{
                                  width: "40px",
                                  height: "40px",
                                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                }}>
                                  <span className="text-white fw-bold">{index + 1}</span>
                                </div>
                                <div>
                                  <h5 className="mb-1 fw-bold">
{(() => {
                                      if (prompt.category && prompt.subcategory) {
                                        return `${prompt.category} - ${prompt.subcategory}`;
                                      }
                                      const response = prompt.response || '';
                                      const subcategoryMatch = response.match(/על ([^ב]+) בתחום/);
                                      const categoryMatch = response.match(/בתחום ([^.]+)/);
                                      const subcategory = subcategoryMatch?.[1]?.trim() || 'תת-קטגוריה';
                                      const category = categoryMatch?.[1]?.trim() || 'קטגוריה';
                                      return `${category} - ${subcategory}`;
                                    })()}
                                  </h5>
                                  <small className="text-muted">
                                    <i className="bi bi-calendar me-1"></i>
                                    {new Date(prompt.create_at).toLocaleString('he-IL', {
                                      year: 'numeric',
                                      month: '2-digit', 
                                      day: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </small>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <h6 className="text-primary mb-2">
                                <i className="bi bi-question-circle me-2"></i>
                                השאלה שלך:
                              </h6>
                              <p className="mb-0 p-3 rounded-3" style={{ 
                                background: "rgba(102, 126, 234, 0.1)",
                                border: "1px solid rgba(102, 126, 234, 0.2)"
                              }}>
                                {prompt.prompt}
                              </p>
                            </div>
                            
                            <div>
                              <h6 className="text-success mb-2">
                                <i className="bi bi-lightbulb me-2"></i>
                                התשובה:
                              </h6>
                              <p className="mb-0 p-3 rounded-3" style={{ 
                                background: "rgba(118, 75, 162, 0.1)",
                                border: "1px solid rgba(118, 75, 162, 0.2)"
                              }}>
                                {prompt.response}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;