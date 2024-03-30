const router = require("express").Router();
const { prisma } = require("../db");
const { authenticateToken } = require("../middlewares/auth");

router.post('/add' , authenticateToken,async (req,res) => {
    const { orderArr, totalAmount } = req.body;
    //console.log('from backend post add',req.user)

    try {

        // get user address 
        const oldUser = await prisma.user.findFirst({
            where: {
                id: req.user.id
            }
        })

        const newOrder = await prisma.orders.create({
            data: {
                orderDetails: orderArr,
                orderAmount: totalAmount,
                address: oldUser.address,
                customerId: oldUser.id
            },
            select: {
                orderId: true,
                orderDetails: true,
                orderAmount: true,
                address: true
            }
        }
        
        )
        res.json({message: "ok created"})
    } catch (error) {
        console.log('error in creating order',error)
    }
})

router.get('/allorders', async (req,res) => {
    try {
        const orders = await prisma.orders.findMany({})
        res.json(orders)
    } catch (error) {
        console.log('error in getting all order',error)
    }
})

router.get('/userorders', authenticateToken,async (req,res) => {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                customerId: req.user.id
            }
        })
        res.json(orders)
    } catch (error) {
        console.log('error in getting all order',error)
    }
})

module.exports = router;














