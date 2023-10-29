import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserData',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'Todo Data'
    }
)

const todoModel = mongoose.model('todos', todoSchema)

export default todoModel