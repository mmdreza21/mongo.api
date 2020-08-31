const expect = require("expect")
const request = require('supertest')

const { app } = require("./../server")
const { Todo } = require("./../models/Todo")
const express = require('express');
beforeEach((done) => {
    Todo.deleteMany({}).then(() => done())
})

describe("post /todos", () => {
   

  
  
    it("create new todo", (done) => {
        var text = "test todo text"
        request(app)
        .post("./todos")
        .send({text} )
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text)
        })
    .end((err, res) => {
        if (err) {
           return done(err)
        }
        Todo.find().then((todos) => {
            expect(todos.length).toBe(1)
            // expect(todos[0].text).toBe(text)
          done();
        }).catch((r) => done(r))
        
    })
  
           

    })

    it(" not sending todo",(done)=>{
request(app)
.post("/todos")
.send({})
.expect(400)
.end((err,res)=>{
    if(err){
        return done(err)
    }
    Todo.find().then((todos)=>{
        expect(todos.length).toBe(0)
        done()

    }).catch((r) => done(r))
})
    })
})