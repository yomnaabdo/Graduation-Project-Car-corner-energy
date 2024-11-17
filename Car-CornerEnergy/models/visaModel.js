const mongoose = require('mongoose');

const visaInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    nameOnCard: {
        type: String,
        required: true,
    },
    creditCardNumber: {
        type: String,
        required: true,
    },
    expiration: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
});

const VisaInfo = mongoose.model('VisaInfo', visaInfoSchema);

module.exports = VisaInfo;
