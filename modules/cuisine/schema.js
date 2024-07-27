const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CuisineSchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  },
  image:{
    type: String,
    required: true
  }
 
})


module.exports = mongoose.model("Cuisine", CuisineSchema)

