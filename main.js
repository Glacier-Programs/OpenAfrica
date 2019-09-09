const express = require('express');
const cors = require('cors');
const tjdb = require('tjdb');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
const Pages = require('./submit.js');

const activePages = new tjdb('./activePages.tjdb');
const queuedPages = new tjdb('./queuedPages.tjdb');

activePages.createTable("pages", ["id", "title", "head", "body", "foot"]);
queuedPages.createTable("pages", ["id", "title", "head", "body", "foot", "author"]);

app.use(cors());
app.use(bodyParser.json());
app.use("/pages", Pages);

app.get("/", async (req, res) => {
  let page = `<p>${JSON.stringify(activePages.getAll())}</p>`;
  
  res.status(200).send(page);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
