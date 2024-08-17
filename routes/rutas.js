const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');

router.post('/addUser',userController.addUser);
router.post('/authUser',userController.authUser);
router.post('/getUser',userController.getUserById);

router.post('/likeVideo',videoController.likeVideo);
router.post('/dislikeVideo',videoController.dislikeVideo);



module.exports = router;