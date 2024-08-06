const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs")
const path = require("path")

const app = express();
app.use(express.json());

const categoryRouter = require("./modules/category/router");
const cuisineRouter = require("./modules/cuisine/router");
const userRouter = require("./modules/user/router");
const authRouter = require("./modules/authentication/router");
const recipeRouter = require("./modules/recipe/router")
const blogRouter = require("./modules/blog/router")

app.use(cors(
 
));
app.use("/recipes", recipeRouter)


app.use("/categories", categoryRouter);
app.use("/cuisines", cuisineRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/blogs", blogRouter );

app.get("/uploads/:filename", (req,res) =>{
  const filePath = path.join(__dirname, `uploads/${req.params.filename}`)
 fs.readFile(filePath, (err, data) =>{
  if(err){
      res.status(500).send("Error Reading Image")

  }
  res.status(200).send(data)
 })

} )



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
