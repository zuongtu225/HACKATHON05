const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 9000;
const router = require("./Router");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HOME PAGE
app.get("/", (req, res) => {
  res.send(
    "<img width=100% src=https://rikkei.edu.vn/wp-content/uploads/2022/07/1bf78b8067d7a489fdc6.jpg>"
  );
});

router(app);

// listent
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
