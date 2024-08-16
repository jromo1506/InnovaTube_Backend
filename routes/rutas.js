const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');

router.post('/addUser',userController.addUser);
router.get('/authUser',userController.authUser);



module.exports = router;