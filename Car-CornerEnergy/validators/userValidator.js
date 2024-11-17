const bcrypt = require('bcryptjs');    //for incrybt password
const { check, body } = require('express-validator');
const validatorMiddleware = require('../Middleware/validatorMiddleware');
const User = require("../models/userModel");

exports.createUserValidator = [

    check('name')
    .notEmpty().withMessage('User required'),

    check('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Invalid email address')
    .custom((val) =>
    user.findOne({ email: val }).then((user) => {
        if (user) {
        return Promise.reject(new Error('E-mail already in user'));
        }
    })
    ),

    check('password')
    .notEmpty().withMessage('Password required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((password, { req }) => {
    if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');               //Password Confirmation
    }
    return true;
    }),

    //Password Confirmation is required**
    check('passwordConfirm')
    .notEmpty().withMessage('Password confirmation required'),

    check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA']).withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

    check('make')
    .notEmpty().withMessage('carmake required'),
    check('model')
    .notEmpty().withMessage('carmodel required'),

    check('role').optional(),

    validatorMiddleware,                         // To catch Errors
];

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];

exports.updateUserValidator = [
    //check('id').isMongoId().withMessage('Invalid User id format'),
    body('name')
    .optional()
    .custom((val, { req }) => {
    return true;
    }),

    // check('email')
    // .notEmpty().withMessage('Email required')
    // .isEmail().withMessage('Invalid email address')
    // .custom((val) =>
    // User.findOne({ email: val }).then((user) => {
    //     if (user) {
    //         return Promise.reject(new Error('E-mail already in user'));
    //     }
    // })
    // ),

    check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

    check('make')
    .notEmpty().withMessage('carmake required'),
    check('model')
    .notEmpty().withMessage('carmodel required'),

    check('role').optional(),
    validatorMiddleware,
];

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];