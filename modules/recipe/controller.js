const Schema = require("./schema");

const getById = async (req, res) => {



  const data = await Schema.findById(req.params.id).populate("user category cuisine").populate("likes", "username").populate("comments.user","username image");

  res.send({
    status: 200,
    message: "Data retreived successfully",
    data: data,
  });
};

const getAll = async (req, res) => {




  const data = await Schema.find({ 
  }).populate("user category cuisine").populate("likes", "username").populate("comments.user","username image");




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


const likeRecipe = async (req, res) => {
  try {
    const recipe = await Schema.findById(req.params.id);
    if (!recipe) return res.status(404).send({ message: 'Recipe not found' });

    if (recipe.likes.includes(req.user._id)) {
      recipe.likes.pull(req.user._id);
    } else {
      recipe.likes.push(req.user._id);
    }

    await recipe.save();
    res.send({
      status: 200,
      message: "Recipe Liked Succesfully",
      data: recipe
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}



// Comment on a recipe


const commentRecipe = async (req, res) => {
  try {
    const recipe = await Schema.findById(req.params.id);
    if (!recipe) return res.status(404).send({ message: 'Recipe not found' });

    const newComment = {
      user: req.user._id,
      text: req.body.text,
    };

    recipe.comments.push(newComment);
    await recipe.save();
    res.send({
      status: 200,
       message: "Comment created Succesfully",
       data: recipe
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
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
 likeRecipe,
 commentRecipe,
  create,
  deleteOne,
  updateOne,
  getByUser
};

