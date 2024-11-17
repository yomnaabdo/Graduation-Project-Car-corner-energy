const mongoose = require('mongoose');

const stationsSchema2 = new mongoose.Schema({
    station: {
        type: {
            type: String,
            required: true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere' 
        }
    },
    
    StationName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        default: 'No description provided',
    },

});

const stationsModel2 = mongoose.model("stations", stationsSchema2);
module.exports = stationsModel2;
