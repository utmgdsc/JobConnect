import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navbar from "./Navbar";

const ResumeFeedback = () => {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const AnalysisResult = ({ text }) => {
    // Function to transform markdown-style bold syntax to HTML subheadings
    const transformText = (text) => {
      const segments = text.split(/\*\*(.*?)\*\*/g);

      return segments.map((segment, index) => {
        if (index % 2 === 0) {
          // Split regular text by new lines to create separate paragraphs
          return segment.split(/\n/g).map((line, lineIndex) => {
            if (/^\d+\./.test(line.trim())) {
              return <p key={`line-${lineIndex}`} className="mb-0">{line.trim()}</p>;
            } else {
              return <span key={`line-${lineIndex}`}>{line}</span>;
            }
          });
        } else {
          // Return a heading element for bold text
          return <h3 key={`b-${index}`} className="mt-3 mb-1">{segment}</h3>;
        }
      });
    };

    return (
      <div className="analysis-container p-4 my-4 text-white" style={{ backgroundColor: '#007bff' }}>
        {transformText(text)}
      </div>
    );
  };

  const analyzeImageWithGPT4 = async () => {
    if (!image) {
      alert('Please upload an image or PDF first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('resume', image);
  
    try {
      const response = await fetch('http://localhost:8000/api/analyze-resume', {
        method: 'POST',
        body: formData, // FormData will set the appropriate 'Content-Type' header
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to analyze resume: ${response.status} ${errorText}`);
      }
  
      const data = await response.json();
      setAnalysisResult(data.analysisResult);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume: " + error.message);
    }
  };
  

  return (
    <div className="container mt-5">
      <Navbar/>


      {/* Header Section */}
      <header className="bg-dark text-white text-center p-5 mb-4">
        <h1>Refine Your Resume, Refine Your Future</h1>
        <p className="lead">
        Unlock the potential of your resume with our innovative AI-powered feedback feature. 
        Our job portal is committed to empowering individuals from all backgrounds by providing 
        tailored advice to enhance your resume. Join us in creating a future where equal opportunity 
        is not just a promise but a reality. Let's shape a career that reflects your unique talents 
        and aspirations.
        </p>
        <button className="btn btn-primary btn-lg">Try it Below!</button>
      </header>

      {/* File Upload Section */}
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">Upload Resume Image</label>
        <input className="form-control" type="file" id="imageUpload" onChange={handleImageChange} />
      </div>

      {/* Analyze Button */}
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={analyzeImageWithGPT4}>Analyze Image</button>
      </div>

      {/* Analysis Result Section */}
      {analysisResult && (
        <AnalysisResult text={analysisResult} />
      )}

      {/* Footer Placeholder - replace with actual Footer component */}
      {/* Footer */}
      <footer className="p-5 bg-dark text-white text-center position-relative">
        <div className="container">
          <p className="lead">Copyright &copy; 2024 JobConnect</p>

          <a href="#" className="position-absolute bottom-0 end-0 p-5">
            <i className="bi bi-arrow-up-circle h1"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};


export default ResumeFeedback;

