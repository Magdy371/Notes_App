import express from "express";
import path from "path";
import dotenv from "dotenv";
import notesRoute from "./routes/notes";   // keep relative clean
import connectDB from "./config/db";

dotenv.config(); //must be before connectDB()

const server = express();
const PORT = process.env.PORT || 5000;

// Middleware
server.use(express.static(path.join(__dirname, "public"))); // serve frontend
server.use(express.json());

// Routes
server.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

server.use("/api", notesRoute);

// Connect to DB, then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
