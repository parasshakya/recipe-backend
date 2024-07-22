const CategorySchema = require("./schema");

const getById = async (req, res) => {
  console.log(req.params);

  const data = await CategorySchema.findById(req.params.id);

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getAll = async (req, res) => {
  const data = await CategorySchema.find();

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getByCategory = async (req, res) => {
  const data = await CategorySchema.find({
    name: req.params.name,
  });

  console.log(req.params);
  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};




const createCategory = async (req, res) => {
  try {
    // const data = await CategorySchema.create({
    //   ...req.body, 
    //   image: req.file.filename
    // }); for image upload

    const data = await CategorySchema.create({
      ...req.body, 
    });

    res.send({
      status: 200,
      message: "Category created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating data");
  }
};

const deleteOne = async (req, res) => {
await CategorySchema.findByIdAndDelete(req.params.id);
  res.send({
    status: 200,
    message: "Category deleted successfully",
  });
};

const updateOne = async (req, res) => {
  let data = await CategorySchema.findByIdAndUpdate(req.params.id, req.body, {
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
   createCategory,
  deleteOne,
  updateOne,
};
