const Schema = require("./schema");

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
  const data = await Schema.find();

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};




const create = async (req, res) => {
  try {
    const data = await Schema.create(req.body);
    res.send({
      status: 200,
      message: "Data created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating data");
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
  create,
  deleteOne,
  updateOne,
};

// catgory: id, title
// account: id, title, amount
