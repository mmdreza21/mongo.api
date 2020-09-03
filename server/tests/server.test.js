const expect = require("expect")
const request = require('supertest')

const { app } = require("./../server")
const { Todo } = require("./../models/Todo")
const express = require('express');
const { ObjectID } = require("mongodb");
const e = require("express");
const { text } = require("body-parser");


const todos = [{
    _id: new ObjectID()
    , text: "doing the work"
},

{
    _id: new ObjectID()
    , text: "doing the sport",
    completed: true,
    completedAt: 1599149624
}]

beforeEach((done) => {
    Todo.deleteMany({})
        .then(() => {
            return Todo.insertMany(todos)
        })
        .then(() => done())
})

describe("post /todos", () => {

    it("create new todo", (done) => {
        var text = "testing again"
        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect((req, res) => {
                expect(req.body.text).toBe(text)
            })
            .end((err) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3)
                    expect(todos[2].text).toBe(text)
                    done();
                }).catch((e) => done(e))
            })
    })

    it(" not sending todo", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done()

                }).catch((r) => done(r))
            })
    })
})
describe("secend test", () => {
    it("shuld get the post ", (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((req, res) => {
                expect(req.body.length).toBe(2)
            })
            .end(done)

    })
})
describe('test thrid', () => {
    it('shopld bring some thing whit id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((req, res) => {
                expect(req.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    });
    it('should be the 404 not found', (done) => {
        var hexId = new ObjectID().toHexString()
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });
    it('the id shuld be invalid', (done) => {
        request(app)
            .get(`/todos/36586`)
            .expect(404)
            .end(done)
    });
});

describe('deletind some todo', () => {
    it('delet secend todo', (done) => {
        var hexId = todos[1]._id.toHexString()
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(hexId)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeNull();
                    done()
                })
            })
    });
    it('should be the 404 not found', (done) => {
        var hexId = new ObjectID().toHexString()
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });
    it('the id shuld be invalid', (done) => {
        request(app)
            .delete(`/todos/36586`)
            .expect(404)
            .end(done)
    });

});
describe('updateing a toto', () => {
    it('we should have the new text ', (done) => {
        var hexId = todos[0]._id.toHexString();
        var texx = "this the updated text"

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text: texx
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.completed).toBe(true)
                expect(res.body.text).toBe(texx)
                expect(typeof res.body.completedAt).toBe("number")
            })
            .end(done)
    });
    it('shuld fuck the ?completedAt?', (done) => {
        var hexID = todos[1]._id.toHexString()
        var text = "mmd naboodi bbni peransa azad shod"
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
                expect(res.body.completed).toBe(false)
                expect(res.body.completedAt).toBeNull()
            })
            .end(done)
    });
});