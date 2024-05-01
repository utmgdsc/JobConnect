const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');

const analyzeResume = async (req, res) => {
  console.log("working");
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(dataBuffer);
      console.log(req.file.path);

      const textContent = data.text; // Extracted text content from the PDF
      console.log(textContent);
      // Construct the payload for the OpenAI Chat API with gpt-3.5-turbo model
      const payload = {
        model: "gpt-3.5-turbo", // Specify the model
        messages: [
          {
            role: "system",
            content: "Analyze the text given as a resume coach, and provide feedback on the content"
          },
          {
            role: "user",
            content: textContent // Send the extracted text as a user message
          }
        ],
      };

      // Make the request to the OpenAI Chat API
      console.log("hello");
      const openAIResponse = await axios.post('https://api.openai.com/v1/chat/completion', payload, {
        headers: {
            'Authorization': 'Bearer ',
            'Content-Type': 'application/json',
        },
      });
      console.log(openAIResponse.data.choices[0].message.content)

      // Process the OpenAI response and send back the relevant information
      return res.json({ analysisResult: openAIResponse.data.choices[0].message.content });
    } else {
      return res.status(400).send('Unsupported file type.');
    }
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return res.status(500).send('Error processing resume.');
  }
};

module.exports = { analyzeResume };
