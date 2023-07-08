const  express = require('express')
const router = express()
const userController = require('../controller/userController')
const {upload }= require('../multer/multer')

router.post('/signup',userController.Signup)
router.post('/login',userController.Login)
router.post('/uploadImage',upload.single('image'),userController.uploadImage)

module.exports = router