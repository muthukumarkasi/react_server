const express = require("express");
const cors = require("cors");
const users = require("./javascript.json");
const app = express();
app.use(express.json());
const port = 8080;
const fs = require("fs");


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "OPTIONS", "PUT", "DELETE"],
  })
);

app.get("/users", (req, res) => {
  return res.json(users);
});
//delete
app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let fillteredData = users.filter((user) => user.id !== id);
  fs.writeFile(
    "./javascript.json",
    JSON.stringify(fillteredData),
    (err, data) => {
      return res.json(fillteredData);
    }
  );
});
//add
app.post("/users", (req, res) => {
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ Message: "All fields are required" });
  }
  let id = Date.now();
  users.push({ id, name, age, city });
  fs.writeFile("./javascript.json", JSON.stringify(users), (err, data) => {
    return res.json({ Message: "User added successfully" });
  });
});

//edit
app.patch("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ Message: "All fields are required" });
  }
  let index = users.findIndex((user) => user.id == id);
  users[index] = { ...users[index], name, age, city };
  fs.writeFile("./javascript.json", JSON.stringify(users), (err, data) => {
    return res.json({ Message: "User added successfully" });
  });
});

app.listen(port, (err) => {
  console.log(`App is running on port ${port}`);
});
