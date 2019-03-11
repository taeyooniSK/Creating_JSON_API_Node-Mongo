const express = require("express"),
      app = express(),
      port = process.env.PORT || 3000;

const todoRoutes = require("./routes/todos");

app.get("/", (req, res) => {
    res.send("HELLO FROM THE ROOTE ROUTE!");
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



