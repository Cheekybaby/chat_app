import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

import path from "path";

dotenv.config();

const app = express()

const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.listen(PORT, () => {
    console.log(`Server is running at server: ${PORT}`);
    connectDB();
});