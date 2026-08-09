
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("MOHAMMED MOBILE STORE WORKS ✅");
});

export default app;
