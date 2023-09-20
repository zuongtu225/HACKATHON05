const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 9000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATA
const listUsers = JSON.parse(fs.readFileSync("./Data/users.json", "utf-8"));
const listPost = JSON.parse(fs.readFileSync("./Data/posts.json", "utf-8"));

//Midleware
const validateUser = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  if (id) {
    const find = listUsers.find((item) => item.id == id);
    if (!find) {
      return res.status(504).json({ sucess: false, message: "ID không đúng" });
    }
  }
  if (body) {
    const find = users.find((item) => item.email == body.email);
    if (find) {
      return res
        .status(504)
        .json({ sucess: false, message: "Email đã tồn tại" });
    }
  }
  next();
};
// HOME PAGE
app.get("/", (req, res) => {
  res.send(
    "<img width=100% src=https://rikkei.edu.vn/wp-content/uploads/2022/07/1bf78b8067d7a489fdc6.jpg>"
  );
});

// ---------USER----------
// GET ALL USER
app.get("/api/users", validateUser, (req, res) => {
  return res.status(200).json(listUsers);
});
// GET 1 USER
app.get("/api/users/detail/:id", validateUser, (req, res) => {
  const id = req.params.id;
  const find = listUsers.find((item) => item.id == id);
  if (!find) {
    return res
      .status(504)
      .json({ sucess: false, message: "Không tồn tại user" });
  }
  return res.status(200).json({ sucess: true, data: find });
});
// POST NEW USER
app.post("/api/users/create", validateUser, (req, res) => {
  const body = req.body;
  const findUser = listUsers.find((user) => user.email == body.email);
  if (findUser) {
    return res
      .status(504)
      .json({ sucess: false, message: "Email đã tồn tại " });
  }
  const newUser = {
    id: Math.random(),
    name: body.name,
    email: body.email,
  };
  const newDataUser = [...listUsers, newUser];
  fs.writeFileSync("./Data/users.json", JSON.stringify(newDataUser));
  return res.status(200).json({ sucess: true, message: "Thêm thành công" });
});
// PUT USER
app.put("/api/users/update/:id", validateUser, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const newDataUser = listUsers.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        email: body.email,
      };
    }
    return item;
  });
  fs.writeFileSync("./Data/users.json", JSON.stringify(newDataUser));
  return res.status(200).json({ sucess: true, message: "Thêm thành công" });
});
// DELETE USER
app.delete("/api/users/delete/:id", validateUser, (req, res) => {
  const id = req.params.id;
  const newDataUser = listUsers.filter((item) => item.id !== id);
  fs.writeFileSync("./Data/users.json", JSON.stringify(newDataUser));
  return res.status(200).json({ sucess: true, message: "Xóa thành công" });
});

// ---------POST----------
// GET ALL POST
app.get("/api/listpost", (req, res) => {
  return res.status(200).json(listPost);
});
// GET 1 POST
app.get("/api/post/detail/:id", (req, res) => {
  const id = req.params.id;
  const find = listPost.find((item) => item.id == id);
  if (!find) {
    return res
      .status(504)
      .json({ sucess: false, message: "Không tồn tại post" });
  }
  return res.status(200).json({ sucess: true, data: find });
});
// POST NEW POST
app.post("/api/post/create", (req, res) => {
  const body = req.body;
  const newPost = {
    id: Math.random(),
    userId: Math.random(),
    title: body.title,
    body: body.body,
  };
  const newDataPost = [...listUsers, newPost];
  fs.writeFileSync("./Data/posts.json", JSON.stringify(newDataPost));
  return res.status(200).json({ sucess: true, message: "Thêm thành công" });
});
// PUT
app.put("/api/post/update/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const find = listPost.find((item) => item.id == id);
  if (!find) {
    return res.status(504).json({ sucess: false, message: "ID không đúng" });
  }
  const newPostData = listUsers.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        body: body.body,
      };
    }
    return item;
  });
  fs.writeFileSync("./Data/posts.json", JSON.stringify(newPostData));
  return res.status(200).json({ sucess: true, message: "Sửa thành công" });
});
// DELETE POST
app.delete("/api/post/delete/:id", (req, res) => {
  const idP = req.params.id;
  if (!find) {
    return res.status(504).json({ sucess: false, message: "ID không đúng" });
  }

  const find = listPost.find((item) => item.id == idP);
  const newdata = listPost.filter((item) => item.id !== find.id); // special => find.id mới xóa được

  fs.writeFileSync("./Data/posts.json", JSON.stringify(newdata));
  return res.status(200).json({ sucess: true, message: "Xóa thành công" });
});

// listent
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
