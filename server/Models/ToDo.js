const mongoose = require('mongoose');

const TodoShema = new mongoose.Schema({
    task : String,
    done : {
        type:Boolean,
        default:false
    }
})

const ToDoModel = mongoose.model("Todo",TodoShema);

module.exports = ToDoModel;