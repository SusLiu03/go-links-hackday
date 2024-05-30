import express, { Request, Response } from "express";

const router = express.Router();
require("dotenv").config({ path: ".env.local" });
const query = {};
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
router.get("/getRepos/:username", async (req: Request, res: Response) => {
  try {
    // const username = "seantomburke";
    // console.log(username);
    const username = req.params.username;
    const repos = fetch(`http://api.github.com/users/${username}/repos`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${GITHUB_USERNAME}:${GITHUB_TOKEN}`
        ).toString("base64")}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        res.status(200).send(data);
      });
    // console.log(repos);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
