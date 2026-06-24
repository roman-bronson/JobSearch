import express from "express";
import cors from "cors";
import jobsRoutes from "./routes/jobs";

const app = express();

// Allow requests from the React frontend running on a different port
// (e.g. localhost:5173 -> localhost:3000)
app.use(cors());

// Parse incoming JSON request bodies and attach them to req.body
app.use(express.json());

// Simple health check endpoint used to verify the API is running.
// Useful when debugging frontend/backend connectivity issues.
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Job Tracker API is running!"
    });
});

// Mount all job-related routes under /jobs.
// Examples:
// GET    /jobs
// GET    /jobs/:id
// POST   /jobs
// PATCH  /jobs/:id
// DELETE /jobs/:id
app.use("/jobs", jobsRoutes);

// Start the API server and listen for incoming requests.
app.listen(3000, () => {
    console.log("Server running on port 3000");
});