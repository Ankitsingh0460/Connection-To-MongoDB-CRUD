const express = require("express");
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
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));


app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});
app.
  route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "newLastname" })
    return res.json({ status: "sucess" })
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" })
  }


  );


app.post("/api/users", async (req, res) => {
  const body = req.body;
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    Job_tital: body.Job_tital,
  })
  return res.status(201).json({ msg: "success" })

})
app.listen(port, () => {
  console.log(`server is listening ${port}`);
});
