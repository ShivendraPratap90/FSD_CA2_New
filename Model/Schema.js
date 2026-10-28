// const mongoose  = require("mongoose")

// const bookSchema = new  mongoose.Schema({

//     title:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:String,
//         required:true
//   },
//   category:{
//     type:String,
//     required:true
//   }

// })

// const newBookes = mongoose.model("books",bookSchema)

// module.exports = newBookes



const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const newBookes = mongoose.model("Book", bookSchema);

module.exports = newBookes;