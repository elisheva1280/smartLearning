import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AIResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const savedRef = useRef(false);
  
  const { category, subcategory, prompt } = location.state || {};

  useEffect(() => {
    if (!category || !subcategory || !prompt) {
      navigate('/learning');
      return;
    }

    

    const generateResponse = async () => {
      try {
        // יצירת תשובה מדומה
        const responseText = `זוהי תשובה מדומה לשאלה שלך על ${subcategory} בתחום ${category}. התשובה נשמרת במסד הנתונים.`;
        setAiResponse(responseText);
        
        // שמירה עם המשתמש הנוכחי
        const userName = sessionStorage.getItem('userName');
        const userPhone = sessionStorage.getItem('userPhone');
        
        if (userName && userPhone && !savedRef.current) {
          savedRef.current = true;
          try {
            console.log('מחפש משתמש:', userName, userPhone);
            
            // חיפוש המשתמש הנוכחי
            const userCheckResponse = await fetch('http://localhost:3001/api/users/check', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: userName, phone: userPhone })
            });
            const userData = await userCheckResponse.json();
            const currentUser = userData.exists ? userData.user : null;
            
            console.log('משתמש נמצא:', currentUser);
            
            if (currentUser) {
              const promptData = {
                user_id: currentUser.id,
                prompt: prompt,
                response: responseText,
                category: category,
                subcategory: subcategory
              };
              
              console.log('שולח נתונים:', promptData);
              
              const saveResponse = await fetch('http://localhost:3001/api/prompts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(promptData)
              });
              
              const saveResult = await saveResponse.json();
              console.log('תוצאת שמירה:', saveResult);
              
              if (saveResponse.ok) {
                console.log('פרומפט נשמר בהצלחה!');
              } else {
                console.error('שגיאה בשמירה:', saveResult);
              }
            } else {
              console.log('משתמש לא נמצא');
            }
          } catch (saveError) {
            console.error('שגיאה בשמירת פרומפט:', saveError);
          }
        }
        
      } catch (error) {
        console.error('שגיאה בשליחת הפרומפט:', error);
        const errorMessage = 'מצטער, אירעה שגיאה. נסה שוב.';
        setAiResponse(errorMessage);
        
      } finally {
        setIsGenerating(false);
      }
    };

    generateResponse();
  }, [category, subcategory, prompt, navigate]);

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh"
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card border-0 shadow-2xl" style={{
              borderRadius: "2rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)"
            }}>
              <div className="card-body p-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle me-3" style={{
                      width: "50px",
                      height: "50px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    }}>
                      <i className="bi bi-robot text-white" style={{ fontSize: "1.5rem" }}></i>
                    </div>
                    <div>
                      <h4 className="mb-0 fw-bold">AI Learning Assistant</h4>
                      <small className="text-muted">{category} • {subcategory}</small>
                    </div>
                  </div>
                  <div>
                    <button 
                      className="btn btn-outline-secondary me-2"
                      onClick={() => navigate('/history')}
                      style={{ borderRadius: "1rem" }}
                    >
                      <i className="bi bi-clock-history me-2"></i>History
                    </button>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => navigate('/learning')}
                      style={{ borderRadius: "1rem" }}
                    >
                      <i className="bi bi-arrow-left me-2"></i>Back
                    </button>
                  </div>
                </div>

                <div className="card mb-4" style={{
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                  borderRadius: "1.5rem",
                  border: "2px solid rgba(102, 126, 234, 0.2)"
                }}>
                  <div className="card-body p-4">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-question-circle me-2"></i>Your Question:
                    </h6>
                    <p className="mb-0" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                      {prompt}
                    </p>
                  </div>
                </div>

                <div className="card" style={{
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                  borderRadius: "1.5rem",
                  border: "2px solid rgba(34, 197, 94, 0.2)"
                }}>
                  <div className="card-body p-4">
                    <h6 className="fw-bold mb-3 text-success">
                      <i className="bi bi-lightbulb me-2"></i>AI Response:
                    </h6>
                    {isGenerating ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <h5>Generating your personalized learning content...</h5>
                        <p className="text-muted">This may take a few moments</p>
                      </div>
                    ) : (
                      <div className="p-3 rounded-3" style={{ background: "rgba(255, 255, 255, 0.7)" }}>
                        <p className="mb-0" style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", fontSize: "1.1rem" }}>
                          {aiResponse}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {!isGenerating && (
                  <div className="text-center mt-4">
                    <button 
                      className="btn btn-lg fw-bold text-white me-3"
                      onClick={() => navigate('/learning')}
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "1rem",
                        padding: "0.75rem 2rem"
                      }}
                    >
                      <i className="bi bi-plus-circle me-2"></i>Ask Another Question
                    </button>
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

export default AIResponse;

