const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { parseResume } = require('./parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Memory storage for file upload
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload a PDF file." });
        }

        const data = await parseResume(req.file.buffer);
        res.json(data);
    } catch (error) {
        console.error("Route Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));