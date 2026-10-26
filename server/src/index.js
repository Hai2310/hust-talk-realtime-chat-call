import express from "express";

const app = express();
app.get("/healthz", (req, res) => {
  res.json({ ok: true, service: "chat-api" });
});

app.listen(3001, () => console.log("API chạy ở http://localhost:3001"));