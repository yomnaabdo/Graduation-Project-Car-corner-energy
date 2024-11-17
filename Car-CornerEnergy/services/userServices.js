const { StatusCodes } = require("http-status-codes");
const asyncHandler = require('express-async-handler');
const UserModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
// add user Admin
exports.createUser=asyncHandler( async(req,res)=>{
    const name =req.body.name;
    const email =req.body.email;
    const password =req.body.password;
    //const passwordConfirm =req.body.passwordConfirm;
    const phone =req.body.phone;
    const make =req.body.make;
    const model =req.body.model;

    const newUser= await UserModel.create(req.body);
    res.status(StatusCodes.OK).json({
        user : newUser
    });
}); 
// Get all users
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find({});
    res.status(StatusCodes.OK).json({ results: users.length, data: users });
});

// Get specific user by ID
exports.getUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No user for this id ${id}` });
    }
    res.status(StatusCodes.OK).json({ data: user });
});

// Update user by ID
// const mongoose = require('mongoose');

// exports.updateUser = asyncHandler(async (req, res) => {
//     console.log('Request Params:', req.params);
//     let { id } = req.params;

//     if (id === 'undefined') {
//         return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'ID parameter is missing or invalid' });
//     }

//     const userId = mongoose.Types.ObjectId(id);

//     const user = await UserModel.findOneAndUpdate(
//         { _id: userId },
//         { $set: req.body },
//         { new: true }
//     );

//     if (!user) {
//         return res.status(StatusCodes.NOT_FOUND).json({ msg: `No user for this id ${id}` });
//     }

//     res.status(StatusCodes.OK).json({ data: user });
// });

//update user by ID
// updateUser function in userServices.js

exports.updateUser = asyncHandler(async (req, res) => {
    const { isValidObjectId } = require('mongoose');
    const id = req.params.id; // Assuming the user id is passed as a parameter in the request

    if (!isValidObjectId(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid user id' });
    }

    const userId = String(id);

    const user = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: req.body },
        { new: true }
    );

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No user for this id ${id}` });
    }

    return res.status(StatusCodes.OK).json({ data: user });
});


// Delete user by ID
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No user found for this id: ${id}` });
    }
    res.status(StatusCodes.NO_CONTENT).send();
});


// Get logged user data
// Get logged user data
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
});

// Update logged user password
const createToken = require('../utils/createToken');
exports.updateLoggedUserPassword = asyncHandler(async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        },
        { new: true }
    );
    const token = createToken(user._id);
    res.status(StatusCodes.OK).json({ data: user, token });
});

// Update logged user data (without password, role)

exports.updateLoggedUserData = asyncHandler(async (req, res) => {
    const { name, email, phone, make, model } = req.body;

    try {
        console.log('Request Body:', req.body);  

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            { name, email, phone, make, model },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }

        return res.status(StatusCodes.OK).json({ data: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error during updating ,please try again" });
    }
});

// Deactivate logged user
exports.deleteLoggedUserData = asyncHandler(async (req, res) => {
    await UserModel.findByIdAndUpdate(req.user._id, { active: false });
    res.status(StatusCodes.NO_CONTENT).json({ status: 'Success' });
});

// Activate logged user
exports.activeLoggedUserData = asyncHandler(async (req, res) => {
    await UserModel.findByIdAndUpdate(req.user._id, { active: true });
    res.status(StatusCodes.NO_CONTENT).json({ status: 'Success' });
});
