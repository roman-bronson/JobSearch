import express from "express";
import cors from "cors";
import jobsRoutes from "./routes/jobs";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobsRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});