// ---------POST----------
const router = require("express").Router();
const fs = require("fs");
// GET ALL POST
router.get("/", (req, res) => {
  const listPost = JSON.parse(fs.readFileSync("./posts.json", "utf-8"));
  return res.status(200).json(listPost);
});
// GET 1 POST
router.get("/:id", (req, res) => {
  const listPost = JSON.parse(fs.readFileSync("./posts.json", "utf-8"));
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
router.post("/create", (req, res) => {
  const listPost = JSON.parse(fs.readFileSync("./posts.json", "utf-8"));
  const body = req.body;
  const newPost = {
    id: Math.random(),
    userId: Math.random(),
    title: body.title,
    body: body.body,
  };
  const newDataPost = [...listPost, newPost];
  fs.writeFileSync("./posts.json", JSON.stringify(newDataPost));
  return res.status(200).json({ sucess: true, message: "Thêm thành công" });
});
// PUT
router.put("/update/:id", (req, res) => {
  const listPost = JSON.parse(fs.readFileSync("./posts.json", "utf-8"));
  const id = req.params.id;
  const body = req.body;
  const find = listPost.find((item) => item.id == id);
  if (!find) {
    return res.status(504).json({ sucess: false, message: "ID không đúng" });
  }
  const newPostData = listPost.map((item) => {
    if (item.id == find.id) {
      return {
        ...item,
        body: body.body,
      };
    }
    return item;
  });
  fs.writeFileSync("./posts.json", JSON.stringify(newPostData));
  return res.status(200).json({ sucess: true, message: "Sửa thành công" });
});
// DELETE POST
router.delete("/delete/:id", (req, res) => {
  const listPost = JSON.parse(fs.readFileSync("./posts.json", "utf-8"));
  const idP = req.params.id;
  const find = listPost.find((item) => item.id == idP);
  if (!find) {
    return res.status(504).json({ sucess: false, message: "ID không đúng" });
  }
  const newdata = listPost.filter((item) => item.id !== find.id); // special => find.id mới xóa được
  fs.writeFileSync("./posts.json", JSON.stringify(newdata));
  return res.status(200).json({ sucess: true, message: "Xóa thành công" });
});

module.exports = router;
