const express = require('express')
const bodyparser = require("body-parser")

const { mongoose } = require('./db/mongoose');
const { todo } = require("./models/todo")
const { user } = require("./models/user")

const app = express()
const port = 3000



app.use(bodyparser.json())
app.post("/todos", (req, res) => {
    // console.log(req.body)
    var Todo= new todo({
        text:req.body.text

    });
    Todo.save().then((doc)=>{
res.send(doc)
    },(r)=>{
res.status(400).send(r)
    })
})



app.listen(port, () => console.log(`Example app listening on port port!`))







