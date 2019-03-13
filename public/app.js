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

    $(".list").on("click", "li", function(){
        updateTodo($(this));
    });

    $(".list").on("click", "span", function(e){
       e.stopPropagation(); // span을 클릭했을 때 이벤트 버블링으로 인해서 클릭된 요소부터 그 상위 요소로 이벤트가 전달됨 -> 즉 parent요소인 li에도 전달되어 밑의 alert함수가 호출됨. event bubbling을 막기위한 방법으로 event.stopPropagation();
       deleteTodo($(this).parent());
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
    newTodo.data("completed", todo.completed);
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
    let clickedId = clickedTodo.data("id");
    const URL = `/api/todos/${clickedId}`;

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
    
    clickedTodo.remove();
}

function updateTodo(todo){   
    let clickedId = todo.data("id"); 
    let URL = `/api/todos/${clickedId}`;
    let isDone = !todo.data("completed"); // negation의 좋은 활용의 예
    let updatedData = { completed : isDone};
    $.ajax({
        method: "PUT",
        url: URL,
        data: updatedData
    })
    .then( updatedTodo => {
        console.log(updatedTodo);
        todo.data("completed", isDone);
        todo.toggleClass("done");
    
    })
    .catch( err => {
        console.log(err);
    })
    
    
}

