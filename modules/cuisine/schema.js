const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CuisineSchema = new Schema({
  name: {
    type: "String", 
    required: true,
    unique: true
  },
 
})


module.exports = mongoose.model("Cuisine", CuisineSchema)

// const AccountSchema = new Schema({


//   accountNumber: { type: String, required: true, unique: true },
//   bankName: { type: String, required: true },
//   accountHolderName: { type: String, required: true },
//   balance: { type: Number, default: 0 },
//   image:{
//     type: String, 
//     required: true
//   }
 


// });

// module.exports = mongoose.model("Account", AccountSchema);
