const fs = require("fs");
const express = require("express");
const app = express();
var cors = require("cors");
const port = 5000;
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const urlencode = bodyParser.urlencoded({ extended: false });
app.use(urlencode);
app.use(jsonParser);
const gamejson = JSON.parse(fs.readFileSync("./data/games.json", "utf-8"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//GET
app.get("/games", (req, res) => {
  res.json(gamejson);
});
app.post("/add/round", (req, res) => {
  const newRound = req.body;
  console.log(newRound);
  gamejson[1].rounds.push(newRound);
  fs.writeFileSync("./data/games.json", JSON.stringify(gamejson));
  res.status(200).send({ sucess: true, mesage: "Thêm thành công" });
});
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
