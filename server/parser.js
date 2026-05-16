const axios = require("axios");
const PDFParser = require("pdf2json");
require("dotenv").config();

async function parseResume(buffer) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(null, 1);
        pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));
        
        pdfParser.on("pdfParser_dataReady", async () => {
            try {
                const rawText = pdfParser.getRawTextContent();
                if (!rawText || rawText.trim().length === 0) return reject(new Error("No text found"));

                // Groq API Call
                const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are an advanced ATS resume parser.

Extract ALL possible information from the resume text and return ONLY valid JSON.

Rules:
- Do not explain anything.
- Do not add markdown.
- Return only JSON object.
- If any field is missing, return null or [].
- Keep original wording from resume whenever possible.
- Extract as much structured information as possible.

JSON Schema:

{
  "personalInfo": {
    "fullName": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "website": ""
  },

  "summary": "",

  "skills": {
    "technical": [],
    "frontend": [],
    "backend": [],
    "languages": [],
    "tools": [],
    "databases": [],
    "cloud": [],
    "softSkills": []
  },

  "education": [
    {
      "degree": "",
      "field": "",
      "college": "",
      "university": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "cgpa": "",
      "percentage": ""
    }
  ],

  "experience": [
    {
      "jobTitle": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "currentlyWorking": false,
      "description": [],
      "technologies": []
    }
  ],

  "projects": [
    {
      "title": "",
      "description": "",
      "technologies": [],
      "github": "",
      "liveDemo": "",
      "startDate": "",
      "endDate": ""
    }
  ],

  "certifications": [
    {
      "name": "",
      "issuer": "",
      "date": "",
      "credentialId": ""
    }
  ],

  "achievements": [],

  "internships": [
    {
      "role": "",
      "company": "",
      "duration": "",
      "description": ""
    }
  ],

  "positionsOfResponsibility": [],

  "hackathons": [],

  "volunteerExperience": [],

  "publications": [],

  "languagesKnown": [],

  "interests": []
}
        `
      },
      {
        role: "user",
        content: rawText
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.2
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

                resolve(JSON.parse(response.data.choices[0].message.content));
            } catch (error) {
                console.error("Groq Error:", error.response ? error.response.data : error.message);
                reject(new Error("AI Parsing failed."));
            }
        });
        pdfParser.parseBuffer(buffer);
    });
}

module.exports = { parseResume };