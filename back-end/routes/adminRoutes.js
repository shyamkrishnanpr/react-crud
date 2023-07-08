const express = require('express')
const router = express()
const adminController = require('../controller/adminController')


router.post('/',adminController.Login)
router.get('/getUser',adminController.getUser)
router.post('/blockuser/:id',adminController.blockUser)
router.post('/unblockuser/:id',adminController.unBlockUser)
router.post('/edituser/:id',adminController.editUser)


module.exports = router