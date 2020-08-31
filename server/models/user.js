const mongoose = require('mongoose');

var user = mongoose.model("user", {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    age: {
        type: Number,
        // required: true,
        minlength: 2
    },
    jub: {
        type: String,
        default:null
    }

})

module.exports={user}