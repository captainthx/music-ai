const express = require("express");

const cors = require("cors");
const path = require("path");
const app = express();

const baseUrl = "https://api.lalals.com/api/public/v1";
const apiKey =
  "qhyuHKq5LWgpsFLgL8CymG2zMOnXFr5y8P-ZVELhjqDCZ1YoohrPC397LtnpbRDSkXqz6Cu3TlLF1DuUo8Kklw";

const topMediaApiKey = "6aa892bbaec14da78c66970faa901e16";
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello Lalas-ai" });
});

app.post("/generate-music", async (req, res) => {
  const { music_style, lyrics, prompt } = req.body;

  const response = await fetch(`${baseUrl}+'/MusicAI`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      music_style,
      prompt,
      lyrics,
      webhook_url: "https://wbmzv68r-3000.asse.devtunnels.ms/webhook",
    }),
  });

  const data = await response.json();
  res.json(data);
});

app.get("/tasks", async (req, res) => {
  const { taskId } = req.query;
  const response = await fetch(
    `https://api.loveaiapi.com/music/suno/task?task_id=${taskId}`,
    {
      headers: {
        Authorization: " Bearer sk-919c702e-9b94-434d-b456-c3e8ba492bfd",
      },
    }
  );

  const data = await response.json();
  res.json(data);
});

app.all("/webhook", (req, res) => {
  console.log(res);
  res.send("Webhook received");
});

app.post("/generate-top", async (req, res) => {
  const { prompt, lyrics, title, instrumental } = req.body;
  const response = await fetch("https://api.topmediai.com/v1/music", {
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
