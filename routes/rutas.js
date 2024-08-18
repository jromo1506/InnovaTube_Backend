const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');

router.post('/addUser',userController.addUser);
router.post('/authUser',userController.authUser);
router.post('/getUser',userController.getUserById);

router.post('/forgotPasswordEmail',userController.forgotPasswordEmail);
router.get('/resetPassword/:token',userController.resetPassword);
router.post('/resetPassword',userController.resetPassword);

router.post('/likeVideo',videoController.likeVideo);
router.post('/dislikeVideo',videoController.dislikeVideo);
router.get('/getVideos/:userId',videoController.getLikedVideos);



module.exports = router;