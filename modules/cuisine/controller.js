const CuisineSchema = require("./schema");

const getById = async (req, res) => {
  console.log(req.params);

  const data = await CuisineSchema.findById(req.params.id);

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getAll = async (req, res) => {
  const data = await CuisineSchema.find();

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

// const getByBankName = async (req, res) => {
//   const data = await CuisineSchema.find({
//     name: req.params.name,
//   });

//   console.log(req.params);
//   res.send({
//     status: 200,
//     message: "Data retreived successfully",
//     data: data,
//   });
// };




const createCuisine = async (req, res) => {
  try {
    const data = await CuisineSchema.create({...req.body, image: req.file.filename});

    res.send({
      
      status: 200,
      message: "Cuisine created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating data");
  }
};

const deleteOne = async (req, res) => {
await CuisineSchema.findByIdAndDelete(req.params.id);
  res.send({
    status: 200,
    message: "Cuisine deleted successfully",
  });
};

const updateOne = async (req, res) => {
  let data = await CuisineSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send({
    status: 200,
    message: "Account updated successfully",
    data: data,
  });
};

module.exports = {
  getById,
  getAll,
   
   createCuisine,
  deleteOne,
  updateOne,
};
