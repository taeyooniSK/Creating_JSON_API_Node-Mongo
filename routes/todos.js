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

module.exports = router;