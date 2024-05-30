import express, { Request, Response } from "express";
import { Octokit } from "@octokit/rest";

const router = express.Router();
require("dotenv").config({ path: ".env.local" });
const query = {};
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });
// router.get("/getRepos/:username", async (req: Request, res: Response) => {
//   try {
//     // const username = "seantomburke";
//     // console.log(username);
//     const username = req.params.username;
//     const response = await octokit
//       .paginate(`GET /repos/${username}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             `${GITHUB_USERNAME}:${GITHUB_TOKEN}`
//           ).toString("base64")}`,
//           Accept: "application/vnd.github.v3+json",
//         },
//       })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         res.status(200).send(data);
//       });
//     // console.log(repos);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/getRepos/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const response = await octokit.repos.listForUser({
      username: username,
      per_page: 100,
    });
    res.status(200).send(response.data);
  } catch (err) {
    console.error("Error fetching repositories:", err);
    res.status(500).send(err);
  }
});
export default router;
