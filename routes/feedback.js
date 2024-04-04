const router = require("express").Router();
const { prisma } = require("../db");


router.post("/add", async (req, res) => {
    
    const {
      name, message
    } = req.body;
    //console.log(req.body)
  
  
    try {
      const newFeedback = await prisma.feedback.create({
        data: {
          name,
          description: message
        },
      });
      res.json({ message: "ok created" });
    } catch (error) {
      console.log("error in creating order", error);
    }
  });

  module.exports = router;