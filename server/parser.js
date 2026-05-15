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
                        model: "llama-3.3-70b-versatile", // Free and powerful model
                        messages: [
                            { role: "system", content: "Extract resume data into JSON. Fields: name, email, skills[], projects[title, desc], experience[role, company]." },
                            { role: "user", content: rawText }
                        ],
                        response_format: { type: "json_object" }
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                            'Content-Type': 'application/json'
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