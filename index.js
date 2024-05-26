const express = require("express");
const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const port = 4000;

//connection

mongoose.connect("mongodb://127.0.0.1:27017/demoApp")
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log("error", err))

//schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Job_tital: {
    type: String,
  },
  gender: {
    type: String,
  }
});

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));


app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.
  route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = req.params.id;
    data[id].checked = !data[id].checked;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), "utf-8",
      res.json({ status: "sucess" }))
  })

  .delete(async (req, res) => {
    const response = await fetch("/delete/:id", users);
    if (response.status != 204) {
      throw Error("Cannot delete your item from list");
    }
    return res.json({
      status: "pending"
    })
  });


app.post("/api/users", async (req, res) => {
  const body = req.body;
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    Job_tital: body.Job_tital,
  })
  console.log(result)
  return res.status(201).json({ msg: "success" })

})
app.listen(port, () => {
  console.log(`server is listening ${port}`);
});
