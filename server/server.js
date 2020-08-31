const express = require('express')
const bodyparser = require("body-parser")

const { mongoose } = require('./db/mongoose');
const { Todo } = require("./models/Todo")
const { user } = require("./models/user")

const app = express()
const port = 5000



app.use(bodyparser.json())
app.post("/todos", (req, res) => {
    // console.log(req.body)
    var todo = new Todo({
        text: req.body.text

    });
    todo.save().then((doc) => {
        res.send(doc)
    }, (r) => {
        res.status(400).send(r)
    })
})



app.listen(port, () => console.log(`Example app listening on port port!`))

module.exports = { app }






