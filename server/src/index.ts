import express, { Express } from "express";
import GitHubRouter from "./routes/githubAPI";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;
const password = "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";

app.use(express.json());
app.use(cors());

app.use("/", GitHubRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
