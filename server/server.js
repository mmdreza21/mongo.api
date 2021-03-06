
const express = require('express')
const bodyparser = require("body-parser")
const cors = require('cors');
const _ = require("lodash")

var { ObjectID } = require("mongodb")
const { mongoose } = require('./db/mongoose');
const { Todo } = require("./models/Todo")
const { user } = require("./models/user")



const app = express()
app.use(cors())
const port = 5000



app.use(bodyparser.json())
app.post("/todos", (req, res) => {
    // console.log(req.body)
    var todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((doc) => {
            res.send(doc)
        }).catch(e => {
            res.status(400).send(e)
        })
})

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos)

    }, (e) => {
        res.status(400).send(e)
    })

})
app.get("/todos/:id", (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({ todo })
    }).catch((e) => res.status(404).send())
})
app.delete("/todos/:id", (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Todo.findByIdAndDelete(id)
        .then((todo) => {
            if (!todo) {
                res.status(404).send()                
            }
            res.send(todo)
        }).catch((e) => res.status(404).send())
})


app.patch("/todos/:id",(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed'])
   
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else {
        body.completed=false;
        body.completedAt=null
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new : true}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
       res.send(todo)
    }).catch((e)=>res.status(404).send())
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = { app }






