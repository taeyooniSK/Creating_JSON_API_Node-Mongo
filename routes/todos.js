const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../models");


router.get("/", (req, res) => {
    db.Todo.find()
    .then( todos => {
        return res.json(todos);
    })
    .catch( err => {
        console.log(err);
    })
});


router.post("/", (req, res) => {
    db.Todo.create(req.body)
    .then(todos => {
        return res.status(201).json(todos); // res.status(201)은 데이터베이스에 이 데이터가 created됐다는 상태를 나타내주는 코드를 response로 보내줌(명시적으로 알 수 있기 때문에 써주는게 좋다)
    })
    .catch( err => {
        console.log(err);
    })

    // string인 데이터를 object로 바꿔주는 body-parser가 필요함
    // db.Todo.create()
});

router.get("/:todoId", (req, res) => {
    db.Todo.findById(req.params.todoId)
    .then(foundTodo => {
        return res.json(foundTodo);
    })
    .catch(err => {
        res.send(err);
    })
});

router.put("/:todoId", (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})    //db.Todo.findOneAndUpdate({_id: 내가 찾을 데이터의 아이디}, req.body(내가 업데이트 하고싶은 정보), {new: true}(return되는 데이터가 내가 새로 업데이트한 데이터라고 설정)}) 
    .then( foundTodo => {
        return res.json(foundTodo);
    })
    .catch( err => {
        res.send(err);
    })
});

router.delete("/:todoId", (req, res) => {
    db.Todo.findOneAndRemove({_id: req.params.todoId})
    .then( () =>{
        return res.json({message: "You deleted it!"})
    })
    .catch( err  => {
        res.send(err);
    })
});

module.exports = router;