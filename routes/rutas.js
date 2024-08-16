const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');

router.post('/addUser',userController.addUser);
router.post('/authUser',userController.authUser);
router.post('/getUser',userController.getUserById);



module.exports = router;