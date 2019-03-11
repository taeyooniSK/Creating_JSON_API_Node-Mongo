const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be blank!"
        },
    completed:{
        type:Boolean,
        default: false;
    },
    created_date: {
        type: Data,
        default: Date.now
    }
});

const Todo = mognoose.model("Todo", todoShcema);

module.exports = Todo;