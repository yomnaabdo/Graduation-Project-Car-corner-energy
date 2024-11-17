const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');    //for incrybt password


//..createSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'This email is already in use'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must contain numbers and letters and at least 8 characters'],
    },
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    
    phone: {
        type: String,
        minlength: [11, 'Phone number should be 11 numbers'],
        required: [true, 'Phone is required'],
    },
    make: {
        type: String,
        required: [true, 'Please enter your carMake'],
    },
    model: {
        type: String,
        required: [true, 'Please enter your carModel'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    active: {                                  //for delete user ---> active = false
        type: Boolean,
        default: true,       
    },

    
}, { timestamps: true });

//hash pass on create
UserSchema.pre('save', async function (next) {             //before saving Schema
    //if (!this.isModified('password')) return next();       // lw el password mt3del4 
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
    });

//..createModel
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
