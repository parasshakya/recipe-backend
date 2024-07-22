const Schema = require("./schema");
const AccountSchema = require("../cuisine/schema")

const getById = async (req, res) => {
  console.log(req.params);



  const data = await Schema.findById(req.params.id).populate("categoryId accountId");

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getAll = async (req, res) => {




  const data = await Schema.find({
  });



  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};


const getByUser = async (req, res) =>{
try{
  const data = await Schema.find({userId: req.user._id})
  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });

}catch(e){
  res.status(500).send("Data retreived failed")
}
}



const getByCategory = async (req, res) => {
  const data = await Schema.find({
    category: req.params.id,
  }).populate("categoryId accountId ");

  console.log(req.params);
  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getByAccount = async (req, res) => {
  const data = await Schema.find(
     {
      accountId: req.params.id
     }
  ).populate("categoryId accountId ");

  console.log(req.params);
  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getGreaterThan = async(req, res) => {
  const data = await Schema.find();
  console.log(req.params);
  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data.filter((item) => item.amount > parseInt(req.params.amount)),
  });
};

const getLessThan = async (req, res) => {
  const data = await Schema.find();
  console.log(req.params);
  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data.filter((item) => item.amount < parseInt(req.params.amount)),
  });
};

//

const create = async (req, res) => {
  
  try {
//     console.log(req.user._id);

//     const accountId = req.body.accountId;

//     const amount = req.body.amount;

//     if(!accountId || !amount){
//       res.status(400).send("AccountId and Amount are required");
//       return;
//     }

//     const accountData = await AccountSchema.findById(accountId);

//     if(!accountData){
//       res.status(404).send("Account not found");
//       return;
//     }
    

// if(    accountData.balance < amount){

//   res.status(400).send('Insufficient Balance in Bank Account, Failed to create Transaction');
//   return;
// }

// accountData.balance -= amount;

// await accountData.save();

const data = await Schema.create({...req.body, userId: req.user._id});



    res.send({
      status: 200,
      message: "Recipe created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Transaction");
  }
};

const deleteOne = async (req, res) => {
  const data = await Schema.findByIdAndDelete(req.params.id);
  res.send({
    status: 200,
    message: "Data deleted successfully",
  });
};

const updateOne = async (req, res) => {
  let data = await Schema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send({
    status: 200,
    message: "Data updated successfully",
    data: data,
  });
};

module.exports = {
  getById,
  getAll,
  getByCategory,
  getByAccount,
  getGreaterThan,
  getLessThan,
  create,
  deleteOne,
  updateOne,
  getByUser
};

// catgory: id, title
// account: id, title, amount
