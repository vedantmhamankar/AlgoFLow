import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONG_url = "mongodb://localhost:27017/AlgoFlow";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONG_url);
const db = mongoose.connection;
db.on('error', (err) => {
    console.error("MongoDB connection error", err);
});
db.once('open', () => {
    console.log("MongoDB is connected");
});

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Register route 
// Register route 
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email" });
        }

        // 2. Hash password
        const hashpassword = await bcryptjs.hash(password, 10);

        // 3. Save new user
        const newUser = new User({
            name,
            email,
            password: hashpassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (error) {
        console.error("Error during registration", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // 2. Compare password with hash
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // 3. Success response (later you can send JWT token here)
        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Quiz schema
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const Question = mongoose.model("Question", questionSchema, "Questions");

// Quiz route
app.get("/quiz", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20; // default 20 questions
    const questions = await Question.aggregate([
      { $sample: { size: limit } } // random sampling
    ]);
    res.json(questions);
  } catch (err) {
    console.error("Failed to fetch questions", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Move listen here at the very bottom
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
