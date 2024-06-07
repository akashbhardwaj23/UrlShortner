import express from "express"
import UrlModel from "../../model/urlschema";

const router = express.Router();   

router.get(":id", )


router.get(":id", async (req, res) => {
    const { id } = req.params;
  
    console.log(id);
    const data = await UrlModel.findOne({ shortCode: id });
    console.log(data);
  
    if (!data) {
      return res.status(404).send("Not FOUND");
    }
  
    res.redirect(data.originalUrl);
  });




  export default router;
  