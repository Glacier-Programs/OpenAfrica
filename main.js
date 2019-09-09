const express = require('express');
const cors = require('cors');
const tjdb = require('tjdb');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

const activePages = new tjdb('./activePages.tjdb');
const queuedPages = new tjdb('./queuedPages.tjdb');

app.use(cors());
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
  let data = req.body;
  console.log(JSON.stringify(data));
  
  queuedPages.insertSingle("pages", [data.title, data.head, data.body, data.foot, data.author]);
  console.log(JSON.stringify(queuedPages.getAll()));
  
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  let page = "<h1>Test</h1>";
  
  res.status(200).send(page);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
