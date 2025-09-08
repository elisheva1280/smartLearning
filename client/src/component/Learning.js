import React, { useState } from "react";

function Learning() {
  const categories = [
    { 
      name: "Language", 
      options: ["French", "Spanish", "Hebrew"] 
    },
    { 
      name: "Science", 
      options: ["Physics", "Biology", "Chemistry"] 
    },
    { 
      name: "Math", 
      options: ["Algebra", "Geometry", "Calculus"] 
    }
  ];
  const [promptText, setPromptText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedOption("");
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

  const options = categories.find(cat => cat.name === selectedCategory)?.options || [];

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: 500, width: "100%", borderRadius: "1.5rem", background: "rgba(255,255,255,0.95)" }}>
        <div className="text-center mb-4">
          <div className="mb-2">
            <i className="bi bi-robot" style={{ fontSize: "2.5rem", color: "#0d6efd" }}></i>
          </div>
          <h1 className="fw-bold" style={{ letterSpacing: "2px" }}>AI Learning Center</h1>
          <p className="text-muted mt-2 mb-0" style={{ fontSize: "1.1rem" }}>
            Choose the topic you want to study and get instant AI help!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-semibold">Category</label>
            <select
              id="category"
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="option" className="form-label fw-semibold">Choose material</label>
            <select
              id="option"
              className="form-select"
              value={selectedOption}
              onChange={handleOptionChange}
              required
              disabled={!selectedCategory}
              style={{
                backgroundColor: !selectedCategory ? "#f0f0f0" : "",
                color: !selectedCategory ? "#888" : ""
              }}
            >
              <option value="">Select option</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </form>
        {selectedCategory && selectedOption && (
          <form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Prompt sent: ${promptText}`);
            }}
          >
            <div className="mb-3">
              <label htmlFor="prompt" className="form-label fw-semibold">Enter your prompt</label>
              <input
                id="prompt"
                type="text"
                className="form-control"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                required
                placeholder="Type your prompt here..."
                style={{ borderRadius: "0.75rem" }}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg" disabled={!promptText.trim()} style={{ borderRadius: "2rem" }}>
                <i className="bi bi-send me-2"></i>Send Prompt
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Learning;