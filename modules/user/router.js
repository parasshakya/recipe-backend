const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path")

const controller = require("./controller");
const { verifyUser } = require("../authentication/auth.middleware");
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: "uploads",
      filename: (req, file, cb) => {
          cb(null, file.originalname.split('.')[0] + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});


const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 


router.get("/saved-recipes", verifyUser,controller.getSavedRecipesByUser);

router.get("", controller.getAll);
router.get("/:id", controller.getById);
router.post("", imageUpload.single("image") , controller.create);
router.delete("/:id", controller.deleteOne);
router.put("/:id", controller.updateOne);
router.post("/saved-recipes", verifyUser, controller.createSavedRecipe);
router.post("/remove-saved-recipe", verifyUser, controller.removeSavedRecipe);





module.exports = router;
