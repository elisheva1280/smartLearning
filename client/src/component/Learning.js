import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Add custom CSS to force dropdown direction
const customStyle = `
  select.force-dropdown-down option {
    direction: ltr;
  }
  
  select.force-dropdown-down {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }
`;

// Inject the style
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customStyle;
  document.head.appendChild(styleElement);
}

const Learning = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userKey = localStorage.getItem('userKey');
    if (!userKey) {
      navigate('/');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/Categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('שגיאה בטעינת הקטגוריות:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const userName = localStorage.getItem('userName');
  const userKey = localStorage.getItem('userKey');

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        setSubcategoriesLoading(true);
        try {
          console.log('Fetching subcategories for:', selectedCategory);
          const response = await fetch(`http://localhost:3001/api/subcategories/category/${selectedCategory}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Subcategories received:', data);
          setSubcategories(data);
        } catch (error) {
          console.error('שגיאה בטעינת התת-קטגוריות:', error);
          setSubcategories([]);
        } finally {
          setSubcategoriesLoading(false);
        }
      } else {
        setSubcategories([]);
        setSubcategoriesLoading(false);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div className="text-center text-white">
          <div className="spinner-border mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading your learning experience...</h4>
        </div>
      </div>
    );
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedOption("");
    setSubcategories([]);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory && selectedOption) {
      alert(`Category: ${selectedCategory}\nOption: ${selectedOption}`);
    }
  };

  const options = subcategories.length > 0 ? subcategories.map(sub => sub.name) : categories.find(cat => cat.name === selectedCategory)?.options || [];
  console.log('Options to display:', options);

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh",
      paddingBottom: "20rem"
    }}>
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "30rem" }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card border-0 shadow-2xl" style={{
              borderRadius: "2rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)"
            }}>
              <div className="card-body p-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="text-muted">
                    <i className="bi bi-person-circle me-2"></i>
                    שלום {userName}
                  </div>
                  <button 
                    className="btn btn-outline-primary btn-lg fw-bold"
                    onClick={() => navigate('/history')}
                    style={{
                      borderRadius: "1rem",
                      border: "2px solid #667eea",
                      padding: "0.75rem 1.5rem"
                    }}
                  >
                    <i className="bi bi-clock-history me-2"></i>ההיסטוריה שלי
                  </button>
                </div>
                
                <div className="text-center mb-5">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
                  }}>
                    <i className="bi bi-brain text-white" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h1 className="display-5 fw-bold mb-3" style={{ 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em"
                  }}>AI Learning Hub</h1>
                  <p className="lead text-muted mb-0">Unlock your potential with personalized AI-powered learning</p>
                </div>

                <div className="row g-4">
                  <div className="col-12">
                    <div className="form-floating">
                      <select
                        id="category"
                        className="form-select form-select-lg"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        required
                        style={{
                          borderRadius: "1rem",
                          border: "2px solid #e9ecef",
                          fontSize: "1.1rem"
                        }}
                      >
                        <option value="" disabled>Choose your learning path</option>
                        {categories.map((cat) => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                      <label htmlFor="category" className="fw-semibold text-muted">
                        <i className="bi bi-collection me-2"></i>Learning Category
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <select
                        id="option"
                        className="form-select form-select-lg force-dropdown-down"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        required
                        disabled={!selectedCategory || subcategoriesLoading}
                        style={{
                          borderRadius: "1rem",
                          border: "2px solid #e9ecef",
                          fontSize: "1.1rem",
                          backgroundColor: !selectedCategory ? "#f8f9fa" : "",
                          position: "relative",
                          zIndex: 1
                        }}
                      >
                        <option value="">
                          {subcategoriesLoading ? 'Loading topics...' : 'Select your focus area'}
                        </option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <label htmlFor="option" className="fw-semibold text-muted">
                        <i className="bi bi-bookmark me-2"></i>Study Material
                      </label>
                    </div>
                  </div>

                  {selectedCategory && selectedOption && (
                    <div className="col-12">
                      <div className="card border-0" style={{
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                        borderRadius: "1.5rem"
                      }}>
                        <div className="card-body p-4">
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            if (selectedCategory && selectedOption && promptText.trim()) {
                              navigate('/ai-response', {
                                state: {
                                  category: selectedCategory,
                                  subcategory: selectedOption,
                                  prompt: promptText
                                }
                              });
                            }
                          }}>
                            <div className="form-floating mb-4">
                              <textarea
                                id="prompt"
                                className="form-control"
                                value={promptText}
                                onChange={(e) => setPromptText(e.target.value)}
                                required
                                placeholder="What would you like to learn about?"
                                style={{
                                  borderRadius: "1rem",
                                  border: "2px solid #e9ecef",
                                  minHeight: "120px",
                                  fontSize: "1.1rem"
                                }}
                              />
                              <label htmlFor="prompt" className="fw-semibold text-muted">
                                <i className="bi bi-chat-dots me-2"></i>Your Learning Question
                              </label>
                            </div>
                            <div className="d-grid">
                              <div className="row g-3">
                                <div className="col-12">
                                  <button 
                                    type="submit" 
                                    className="btn btn-lg fw-bold text-white w-100" 
                                    disabled={!promptText.trim()}
                                    style={{
                                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                      border: "none",
                                      borderRadius: "1rem",
                                      padding: "1rem 2rem",
                                      fontSize: "1.1rem",
                                      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                                      transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.transform = "translateY(-2px)";
                                      e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.transform = "translateY(0)";
                                      e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                                    }}
                                  >
                                    <i className="bi bi-rocket-takeoff me-2"></i>
                                    Start Learning
                                  </button>
                                </div>

                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!selectedCategory && (
                  <div className="text-center mt-4">
                    <div className="row g-3">
                      <div className="col-4">
                        <div className="p-3 rounded-3" style={{ background: "rgba(102, 126, 234, 0.1)" }}>
                          <i className="bi bi-lightbulb text-primary" style={{ fontSize: "1.5rem" }}></i>
                          <div className="small fw-semibold mt-2">Smart</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3 rounded-3" style={{ background: "rgba(118, 75, 162, 0.1)" }}>
                          <i className="bi bi-person-check text-primary" style={{ fontSize: "1.5rem" }}></i>
                          <div className="small fw-semibold mt-2">Personal</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3 rounded-3" style={{ background: "rgba(102, 126, 234, 0.1)" }}>
                          <i className="bi bi-graph-up text-primary" style={{ fontSize: "1.5rem" }}></i>
                          <div className="small fw-semibold mt-2">Effective</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learning;
