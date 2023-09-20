// ---------USER----------
const router = require("express").Router();
const fs = require("fs");
// GET ALL USER
router.get("/", (req, res) => {
  const listUsers = JSON.parse(fs.readFileSync("./users.json"), "utf8");
  return res.status(200).json(listUsers);
});
// GET 1 USER
router.get("/detail/:id", (req, res) => {
  const listUsers = JSON.parse(fs.readFileSync("./users.json"), "utf8");
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
router.post("/create", (req, res) => {
  const listUsers = JSON.parse(fs.readFileSync("./users.json"), "utf8");

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
  fs.writeFileSync("./users.json", JSON.stringify(newDataUser));
  return res.status(200).json({ sucess: true, message: "Thêm thành công" });
});
// PUT USER
router.put("/update/:id", (req, res) => {
  const listUsers = JSON.parse(fs.readFileSync("./users.json"), "utf8");
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
  fs.writeFileSync("./users.json", JSON.stringify(newDataUser));
  return res.status(200).json({ sucess: true, message: "Thêm thành công" });
});
// DELETE USER
router.delete("/delete/:id", (req, res) => {
  const listUsers = JSON.parse(fs.readFileSync("./users.json"), "utf8");
  const id = req.params.id;
  const find = listUsers.find((item) => item.id == id);
  if (!find) {
    return res
      .status(504)
      .json({ sucess: false, message: "Không tồn tại user" });
  }
  const newDataUser = listUsers.filter((item) => item.id !== find.id);
  fs.writeFileSync("./users.json", JSON.stringify(newDataUser));
  return res.status(200).json({ sucess: true, message: "Xóa thành công" });
});

module.exports = router;
