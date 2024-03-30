const router = require("express").Router();
const { prisma } = require("../db");
const { authenticateToken } = require("../middlewares/auth");

router.get('/getall' , async (req,res) => {
    

    try {

        const allProduct = await prisma.category.findMany({})
        res.json(allProduct)
    } catch (error) {
        console.log('error in creating order',error)
    }
})

router.post('/addcategory' , async (req,res) => {
    // {id: 1, categoryName: 'For Baby', categoryIdentity: 'baby' ,categoryImage: cat1},
    const { categoryName, categoryIdentity, categoryImage } = req.body

    

    try {

        const newProduct = await prisma.category.create({
            data: {
                categoryName,
                categoryIdentity,
                categoryImage
            }
        }
        
        )
        res.json({message: "ok created"})
    } catch (error) {
        console.log('error in creating order',error)
    }
})

router.delete('/deletecategory/:id' , async (req,res) => {
    //{id: 1, name: 'BERRILUM',Image: one, price: 10, stars: 5 },
    const id = parseInt(req.params.id, 10)
    console.log('from delete product',id)

    try {

        const newProduct = await prisma.category.delete({
            where: {
                id: id
            }
        }
        
        )
        res.json({message: "ok deleted"})
    } catch (error) {
        console.log('error in creating order',error)
    }
})


module.exports = router;

















