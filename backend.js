const express = require("express");

//import express from "express";

const app = express();

const PORT = 8000;

app.get("/write", (req, res) => {
  var fs = require("node:fs"); //this asks to make use of the Node File System module

  var content = req.query["text"];
  var fileNames = req.query["fileName"];

  try {
    fs.writeFile(fileNames, content, function (err) {
      if (err) throw err;
      console.log("Wrote to a file on the server.");
    });
  } catch (err) {
    console.error(err);
  }

  //finally, send a response that all is well to the front end
  res.setHeader("Access-Control-Allow-Origin", "*"); //Allows browser to load return values
  res.json({
    output: "Wrote to a file on the server.",
  });
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});