const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    text:{
        type:String,
        required: true,
    },
    replies:{
        type:[{
            user: {
               type:mongoose.Schema.Types.ObjectId,
               ref:"User"
            },
            reply: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;