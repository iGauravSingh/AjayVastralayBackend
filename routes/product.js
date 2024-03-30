const router = require("express").Router();
const { prisma } = require("../db");
const { authenticateToken } = require("../middlewares/auth");

router.get('/getall' , async (req,res) => {
    

    try {

        const allProduct = await prisma.product.findMany({})
        res.json(allProduct)
    } catch (error) {
        console.log('error in creating order',error)
    }
})

router.post('/addproduct' , async (req,res) => {
    // {id: 1, productName: 'dino', productImage: bsProduct3, price: 12 , discount: 16, stars: 4, category: 'baby',quantity: 10, sales: 20, featured: true, discription: 'Lorem ipsum dolor sit,  iste?'},
    const { productName,productImage,price,discount,stars,category,quantity,featured,discription } = req.body

    const newPrice = parseInt(price)
    const newStar = parseInt(star)
    const newquantity = parseInt(quantity)
    const newdiscount = parseInt(discount)
    

    try {

        const newProduct = await prisma.product.create({
            data: {
                productName,
                productImage,
                price: newPrice,
                discount: newdiscount,
                stars: newStar,
                category,
                quantity: newquantity,
                sales,
                featured,
                discription
            }
        }
        
        )
        res.json({message: "ok created"})
    } catch (error) {
        console.log('error in creating order',error)
    }
})

router.delete('/deleteproduct/:id' , async (req,res) => {
    //{id: 1, name: 'BERRILUM',Image: one, price: 10, stars: 5 },
    const id = parseInt(req.params.id, 10)
    console.log('from delete product',id)

    try {

        const newProduct = await prisma.product.delete({
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

















