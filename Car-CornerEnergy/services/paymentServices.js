const { StatusCodes } = require('http-status-codes');
const ApiError = require('../Middleware/ApiError');
const VisaInfo = require('../models/visaModel');
const User = require('../models/userModel');

exports.choosePaymentMethod = async (req, res, next) => {
    const { nameOnCard, creditCardNumber, expiration, cvv } = req.body;

    // Check if credit card details are provided
    const isCreditCardPayment = nameOnCard && creditCardNumber && expiration && cvv;

    try {
        let paymentMethod;

        if (isCreditCardPayment) {
            // Create or update VisaInfo document for the user
            const visaInfo = await VisaInfo.findOneAndUpdate(
                { userId: req.body.userId }, // Assuming userId is provided in the request body
                { $set: { nameOnCard, creditCardNumber, expiration, cvv } },
                { upsert: true, new: true }
            );

            if (!visaInfo) {
                throw new ApiError('Failed to update Visa information', StatusCodes.INTERNAL_SERVER_ERROR);
            }

            paymentMethod = 'visa';
        } else {
            // Handle other payment methods (e.g., cash)
            const user = await User.findByIdAndUpdate(
                req.body.userId, // Assuming userId is provided in the request body
                { $set: { paymentMethod: 'cash' } }, // Set the default payment method here
                { new: true }
            );

            // if (!user) {
            //     throw new ApiError('User not found', StatusCodes.NOT_FOUND);
            // }

            paymentMethod = 'cash';
        }

        res.status(StatusCodes.OK).json({ message: 'Payment method chosen successfully', paymentMethod, userId: req.body.userId });
    } catch (error) {
        console.error('Error updating user data:', error);
        return next(new ApiError('Database error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
