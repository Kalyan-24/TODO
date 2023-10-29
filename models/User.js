import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            default: '',
        },
        lastname: {
            type: String,
            default: '',
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { 
        collection: 'User Data' 
    }
)

const userModel = mongoose.model('UserData', userSchema)

export default userModel