const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/user")



var user = mongoose.model("user", {
    name: {
        type: String,
        required: true,
        trim: true,

    },
    age: {
        type: Number,
        required: true,
        minlength: 2
    },
    jub: {
        type: String,
        default: "programer"
    }

})
var newuser = new user({
    name: "peransa",
    age: 22
})

newuser.save().then((doc) => {
    console.log(JSON.stringify(doc,undefined,2));
}, (err) => {
    console.log("unable to do taht", err);
})
