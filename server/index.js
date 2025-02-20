import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import Post from './models/Posts.js';

const app = express();
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(cookieParser());

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        // res.json({ message: 'Login successful' });
        jwt.sign({ email, id: user._id}, 'secret', {}, (err, token) => {
            res.cookie("token", token).json({message: "Login succesful"})
        });
    } else {
        res.status(400).json({ message: 'Login failed' });
    }
});

app.get("/profile", (req, res) => {
    jwt.verify(req.cookies.token, 'secret', (err, data) => {
        if (err) {
            res.status(400).json({ message: 'Not authorized' });
        } else {
            res.json(data);
        }
    });
})

app.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });
});

app.post('/create', upload.single('file'), async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        file: req.file.filename,
    });
    await newPost.save();
    res.status(201).json({ message: 'Post created' });
});

mongoose.connect("mongodb+srv://Mzyxttt:hi1xAh7Q9IWP3Ytp@cluster0.3cz9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
        }
    );
    })