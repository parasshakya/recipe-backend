const Schema = require("./schema");

const getById = async (req, res) => {

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
    const data = await Schema.create({
      ...req.body, image: req.file.filename
    });
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

const createSavedRecipe = async (req, res) => {
  try {


    const userId = req.user._id;


    const { recipeId } = req.body;


    // Find the user and add the recipe to the saved list
    const user = await Schema.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Check if the recipe is already saved
    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }

    res.status(200).send({
      message: "Saved Recipe Created",
      data: user.savedRecipes
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
}

const removeSavedRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const {recipeId } = req.body;

    // Find the user and remove the recipe from the saved list
    const user = await Schema.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
    await user.save();

    res.status(200).send({
      message: "Removed Saved Recipe",
      data: user.savedRecipes

    }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const getSavedRecipesByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Schema.findById(userId).populate('savedRecipes');

    if (!user) return res.status(404).send('User not found');

    res.send({
      status : 200,
      message: "Data retrieved successfully",
      data: user.savedRecipes
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getById,
  getAll,
  create,
  deleteOne,
  updateOne,
  createSavedRecipe,
  removeSavedRecipe,
getSavedRecipesByUser
};

