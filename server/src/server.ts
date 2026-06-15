import express from "express";
import jobsRoutes from "./routes/jobs"

const port = 8000;

const app = express();
app.use("/jobs", jobsRoutes)

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});