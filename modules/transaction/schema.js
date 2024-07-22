const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
 
  amount: {
    type: "Number",
    default: 0,
  },

  title:{
    type: "String",
    required: true

  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },

  accountId: {
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account"
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
