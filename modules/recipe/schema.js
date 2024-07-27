const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  cuisine: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cuisine"
  },

  description: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true
  },

  cookingTime: {
    type: String,
    required: true
  },

  instructions: {
    type: Array,
    required: true
  },

  ingredients : {
    type: Array,
    required: true
  },


  image: {
    type: String, 
    required: true
  },













 
  
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },

  
});

module.exports = mongoose.model("Recipe", recipeSchema);
