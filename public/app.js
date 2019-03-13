$(document).ready( () => {
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch( err => {
        console.log(err);
    })

    $("#todoInput").keypress( event => {
        if (event.which == 13){
            if($("#todoInput").val().length > 0 ){
                console.log("you hit enter key");
                createTodo();
            } else {
                alert("YOU SHOULD ETNER SOMETHING");
            }
        } 
    });

    $(".list").on("click", "span", function(){
       deleteTodo($(this));
    })
   
})



function addTodos(todos){
    todos.forEach( todo => { 
       addTodo(todo);
    });
}

function addTodo(todo){
    let newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
        if(todo.completed){
            newTodo.addClass("done");
        }
        $('.list').append(newTodo);
}
    
function createTodo(){
    let todoInputVal = {name: $("#todoInput").val()};
    $("#todoInput").val("");
    $.post("/api/todos", todoInputVal)
    .then(addTodo)
    .catch(err => {
        console.log(err);
    })
}

function deleteTodo(clickedTodo){
    let todoId = clickedTodo.parent().data("id");
    const URL = `/api/todos/${todoId}`;

    $.ajax({
        method: "DELETE",
        url: URL
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
    
    clickedTodo.parent().remove();
}