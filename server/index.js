import express from "express"; 
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import Message from "./models/Message.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ai-chat")
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GET API is working successfully"
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
      message: "User list fetched successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing username or email" 
    });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    const newUser = new User({ username, email });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const { email } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (email) user.email = email;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/messages", async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({
      success: false,
      message: "userId and content are required"
    });
  }

  try {
    const message = new Message({
      content,
      sender: userId 
    });

    await message.save();

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: message
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender", "username email"); 

    res.status(200).json({
      success: true,
      messages
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
