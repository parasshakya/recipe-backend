const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs")
const path = require("path")

const app = express();
app.use(express.json());

// const transactionRouter = require("./modules/transaction/router");
const categoryRouter = require("./modules/category/router");
const cuisineRouter = require("./modules/cuisine/router");
const userRouter = require("./modules/user/router");
const authRouter = require("./modules/authentication/router");
const recipeRouter = require("./modules/recipe/router")


app.use(cors());
// app.use("/transactions", transactionRouter);
app.use("/recipes", recipeRouter)

app.use("/categories", categoryRouter);
app.use("/cuisines", cuisineRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);


// app.get("/image/:filename", (req,res) =>{
//   const filePath = path.join(__dirname, `images/${req.params.filename}`)
//   console.log(filePath)
//  fs.readFile(filePath, (err, data) =>{
//   if(err){
//       res.status(500).send("Error Reading Image")

//   }
//   res.send(data)
//  })

// } )

// app.get("/accountImage/:filename", (req,res) =>{
//   const filePath = path.join(__dirname, `accountImages/${req.params.filename}`)
//   console.log(filePath)
//  fs.readFile(filePath, (err, data) =>{
//   if(err){
//       res.status(500).send("Error Reading Image")

//   }
//   res.send(data)
//  })

// } )

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(3002, (req, res) => {
  console.log("Backend is running on port 3002 ");

  try {
    mongoose.connect("mongodb://localhost:27017/recipe");
    console.log("Database connected");
  } catch (error) {
    console.log("Error found", error);
  }
});
