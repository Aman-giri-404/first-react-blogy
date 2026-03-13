import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bRoutes from "./routes/bRoutes.js";
import dns from "dns"
import path from "path";
import upload from "./middleware/upload.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
dns.setServers(["8.8.8.8", "8.8.4.4"]);
connectDB();


app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/blog", bRoutes);

app.post("/api/upload", upload.single("image"), (req, res) => {

  const filePath = `/uploads/${req.file.filename}`;

  res.json({
    message: "File uploaded successfully",
    path: filePath
  });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
