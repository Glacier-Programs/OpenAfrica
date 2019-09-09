const Pages = require('express').Router();
const tjdb = require("tjdb");

const activePages = new tjdb('./activePages.tjdb');
const queuedPages = new tjdb('./queuedPages.tjdb');

//Data Dumps Avaliable
Pages.get("/dump", async (req, res) => {
  let data = {
    active: activePages.getAll(),
    queued: queuedPages.getAll()
  };
  
  res.status(200).send(data);
});

Pages.get("/dump/active", async (req, res) => {
  res.status(200).send(activePages.getAll());
});

Pages.get("/dump/queued", async (req, res) => {
  res.status(200).send(queuedPages.getAll());
});

Pages.get("/dump/:id", async (req, res) => {
  //TODO, Add functionality
});

Pages.post("/submit", async (req, res) => {
  let data = req.body;
  
  queuedPages.insertSingle("pages", [data.id, data.title, data.head, data.body, data.foot, data.author]);
  
  res.status(200).send("OK");
});

module.exports = Pages;
