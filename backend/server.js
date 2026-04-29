import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes.js";
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes);

const PORT = Number(process.env.PORT) || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (error) => {
      if (error.syscall !== "listen") {
        console.error("Server error:", error);
        process.exit(1);
      }

      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Please stop the process using that port or set a different PORT in your environment.`);
      } else {
        console.error("Server listen error:", error);
      }
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });