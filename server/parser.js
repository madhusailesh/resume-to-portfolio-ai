const { GoogleGenerativeAI } = require("@google/generative-ai");
const PDFParser = require("pdf2json");
require("dotenv").config();

// FORCE API VERSION TO V1
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function parseResume(buffer) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(null, 1);

        pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));
        
        pdfParser.on("pdfParser_dataReady", async () => {
            try {
                const rawText = pdfParser.getRawTextContent();
                if (!rawText || rawText.trim().length === 0) {
                    return reject(new Error("PDF se text nahi nikal paya."));
                }

                // Model name strictly 'gemini-1.5-flash'
                const model = genAI.getGenerativeModel({ 
                    model: "gemini-1.5-flash",
                    apiVersion: "v1"  // Explicitly setting API version to v1
                });

                const prompt = `Return strictly a JSON object from this resume text. 
                No conversational text. No markdown.
                Structure: { "name": "", "email": "", "skills": [], "projects": [], "experience": [] }
                Text: ${rawText}`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                let text = response.text().trim();

                // Advanced cleaning
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) text = jsonMatch[0];
                
                resolve(JSON.parse(text));
            } catch (error) {
                console.error("Gemini Error:", error.message);
                reject(error);
            }
        });

        pdfParser.parseBuffer(buffer);
    });
}

module.exports = { parseResume };