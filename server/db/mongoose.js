const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/todoApp",{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
mongoose.set('useFindAndModify', false)
module.exports={mongoose}