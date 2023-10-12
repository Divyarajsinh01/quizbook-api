const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(password) {
            if (password.toLowerCase().includes('password')) {
                throw new Error('password is invalid')
            }
        }
        // validate: {
        //     validator: function (value) {
        //         if (!validator.isStrongPassword(value)) {
        //             return false;
        //         }
        //         return true;
        //     },
        //     message: 'Please provide a strong password'
        // }
    },
    confirm_password : {
        type: String,
        trim: true,
        required:true,
        validate (value){
            if(value !== this.password){
                throw new Error('password does not match')
            }
        }
    }
})

// userSchema.statics.findByCredentials = async(email, password) => {
//     const user = await User.findOne({email})

//     if(!user){
//         throw new Error('unable to login')
//     }

//     const isMatch = await bcrypt.compare(password, user.password)
//     if(!isMatch){
//         throw new Error('unable to login')
//     }

//     return user
// }

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            // console.error('User not found for email:', email);
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('unable to login')
        }

        return user
    } catch (error) {
        // console.error('Error in findByCredentials:', error);
        throw error;
    }

}


//hash pass
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('user-data', userSchema)

module.exports = User