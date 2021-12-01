const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    // images:[
    //     {
    //         id:{
    //             type: mongoose.Schema.Types.ObjectId,
    //         },
    //         path:{
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    condition:{
        type: String,
        required: true
    },
    isSold:{
        type: Boolean,
        default: false
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dateAdded:{
        type: Date,
        required: true
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;