const user = require("./users");
const posts = require("./posts");

module.exports = (app) => {
  app.use("/api/v1/users", user);
  app.use("/api/v1/posts", posts);
};
