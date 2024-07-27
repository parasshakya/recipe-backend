const Schema = require("./schema");
const AccountSchema = require("../cuisine/schema")

const getById = async (req, res) => {
  console.log(req.params);



  const data = await Schema.findById(req.params.id);

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getAll = async (req, res) => {




  const data = await Schema.find({ 
  }).populate("user");




  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};


const getByUser = async (req, res) =>{
try{
  const data = await Schema.find({user: req.user._id})
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





const create = async (req, res) => {
  
  try {


const data = await Schema.create({...req.body, user: req.user._id, image: req.file.filename});



    res.send({
      status: 200,
      message: "Recipe created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Recipe");
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
 
  create,
  deleteOne,
  updateOne,
  getByUser
};

