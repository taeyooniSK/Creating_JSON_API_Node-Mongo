const express = require("express"),
      app = express(),
      port = process.env.PORT || 3000,
      bodyParser = require("body-parser"); // string인 데이터를 object로 바꿔주는 package


const todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));


app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(port, () => {
    console.log(`Server has started on ${port}`);
})


/*
    Routes
Verb    Route               Description
GET     /api/todos          List all todos
POST    /api/todos          Create new todo
GET     /api/todo/:todoId   Retrieve a todo
PUT     /api/todo/:todoId   Update a todo
DELETE  /api/todo/:todoId   Delete a todo

*/



