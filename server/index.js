import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

const users = [];

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GET API is working successfully"
  });
});


app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    users,
    message: "User list fetched successfully"
  });
});

app.post("/api/users", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing username or email" 
    });
  }

  const newUser = { username, email };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
