const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../models");
const helpers = require("../helpers/todos");


router.route("/")  // app.route()를 이용하면 라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성할 수 있습니다. 경로는 한 곳에 지정되어 있으므로, 모듈식 라우트를 작성하면 중복성과 오타가 감소하여 도움이 됩니다. (express doc)
    .get(helpers.getTodo)
    .post(helpers.createTodo);


router.route("/:todoId")
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);


module.exports = router;