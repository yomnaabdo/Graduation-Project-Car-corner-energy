const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');


const {
    getUserValidator,
    //createUserValidator,
    //updateUserValidator,
    deleteUserValidator,
} = require('../validators/userValidator');

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deleteLoggedUserData,
    activeLoggedUserData
} = require('../services/userServices');

const authService = require('../services/authServices');

//Logged User routes
router.use(authService.protect);
router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);

router.put('/updateMe',updateLoggedUserData);

router.put('/updateMe',  updateLoggedUserData);

router.delete('/deleteMe', deleteLoggedUserData);
router.post('/activeMe', activeLoggedUserData);

// Admin routes
router.use(authService.allowedTo('admin', 'manager'));
router.route('/').post( createUser);
router.route('/').get(getUsers);

router.route('/:id').get( getUser);
router.route('/:id').put( updateUser);
router.route('/:id').delete(deleteUserValidator, deleteUser);


module.exports = router;