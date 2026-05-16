const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const { parseResume } = require('./parser');
const User = require('./models/User'); // Model import dhyan se check karna
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected Successfully! ✅"))
    .catch(err => console.log("DB Connection Error: ❌", err));

// Multer Setup (Memory Storage)
const upload = multer({ storage: multer.memoryStorage() });

// 2. Main Upload & Save Route
app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "File upload karo pehle!" });

        const parsedData = await parseResume(req.file.buffer);
        
        // Ek unique username email se generate kar rahe hain
        const username = parsedData.email ? parsedData.email.split('@')[0] + "_" + Math.floor(Math.random() * 100) : "user_" + Date.now();

        // Database mein parsedData ka poora ka poora "khandaan" save kar rahe hain
        const user = await User.findOneAndUpdate(
    { email: parsedData.email }, 
    { ...parsedData, username },
    { upsert: true, returnDocument: 'after' } // 'new: true' ki jagah 'returnDocument: after'
);

        res.json({ 
            message: "SAB DATA SAVE HO GAYA!  ", 
            username: user.username, 
            data: user 
        });

    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ error: "Kuch toh gadbad hai!" });
    }
});



app.get('/api/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Test Route (Optional - just to check if API is alive)
app.get('/', (req, res) => res.send("Resume API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));