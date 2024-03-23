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
      alert('Please upload an image first.');
      return;
    }


    const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Remove the data URL prefix
      reader.onerror = (error) => reject(error);
    });

    toBase64(image).then(async (base64Image) => {
      const payload = {
        model: "gpt-4-vision-preview", // Ensure you have access to this model
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "As a resume coach, your task is to review the resume in the provided image. Offer constructive feedback focusing on layout, clarity, professionalism, and actionable suggestions for improvement. Consider that the resume belongs to someone who may have gaps in their employment or might be early in their career. Highlight strengths and provide encouragement and tips for areas that need enhancement. Don't be afraid to be harsh, be brutally honest where required."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ]
      };
      
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorBody = await response.text(); // Try to read the error message from the response
          throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
        }

        const data = await response.json();
        setAnalysisResult(data.choices[0].message.content); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Error analyzing image with GPT-4:", error);
        alert("Failed to analyze image: " + error.message);
      }
    }).catch((error) => {
      console.error("Error converting image to Base64:", error);
      alert("Failed to convert image: " + error.message);
    });
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
