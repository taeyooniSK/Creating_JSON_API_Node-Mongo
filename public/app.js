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
   
})


function addTodos(todos){
    todos.forEach( todo => { 
       addTodo(todo);
    });
}

function addTodo(todo){
    let newTodo = $("<li class='task'>" + todo.name +"</li>");
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
