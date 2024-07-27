const Schema = require("./schema")


const create  = async (req, res) => {
try{
    

    

    const data = await Schema.create({
        ...req.body, image: req.file.filename
    })

    res.send({
        status: 200,
        message: "Blog created successfully",
        data: data
    })
}catch(e){
    console.log(e);
    res.status(500).send("Failed to create blog")
}




}

const getAllBlogs = async(req, res) =>{
    try{

        const data = await Schema.find({})
        res.send({
            status:200,
            message:"Blogs retrieved successfully",
            data: data
        })

    }catch(e){
        res.status(500).send("Failed to retrieve blogs")

    }
}


module.exports = {
    create,
    getAllBlogs
}