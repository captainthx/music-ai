const express = require("express");

const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const topMediaApiKey = process.env.TOP_API_KEY;
const baseApi = process.env.BASE_API;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello Lalas-ai" });
});

// top medi

app.post("/generate-top", async (req, res) => {
  const { prompt, lyrics, title, instrumental } = req.body;
  const response = await fetch(`${baseApi}/v1/music`, {
    method: "POST",
    headers: {
      "x-api-key": topMediaApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_auto: 1,
      prompt,
      lyrics,
      title,
      instrumental,
    }),
  });
  const data = await response.json();
  res.json(data);
});

//web

app.get("/web", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
