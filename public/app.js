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

// function updateTodo(completedTodo){   //클래스에 의존해서 토글기능을 넣게되면 누군가가 클래스를 조작하여서 데이터베이스에 있는 정보와 view에서 보이는 것과 다를 수 있다.
//         let clickedId = completedTodo.data("id"); // 그래서 처음 페이지가 로딩될때 li요소에 data()메소드를 이용해서 completed에 관한 정보를 미리 저장해놓는게 더 안전.
//         let URL = `/api/todos/${clickedId}`;
//         let data = {completed : true};

//         if (!completedTodo.hasClass("done")){
//             putTodo(URL, data);
//             completedTodo.addClass("done");
//         } else {
//             data.completed = false;
//             putTodo(URL, data);
//             completedTodo.removeClass("done");
//         }
// }


function updateTodo(todo){   //클래스에 의존해서 토글기능을 넣게되면 누군가가 클래스를 조작하여서 데이터베이스에 있는 정보와 view에서 보이는 것과 다를 수 있다.
    let clickedId = todo.data("id"); // 그래서 처음 페이지가 로딩될때 li요소에 data()메소드를 이용해서 completed에 관한 정보를 미리 저장해놓는게 더 안전.
    let URL = `/api/todos/${clickedId}`;
    let isDone = todo.data("completed");
    let updatedData = { completed : !isDone};
    $.ajax({
        method: "PUT",
        url: URL,
        data: updatedData
    })
    .then( updatedTodo => {
        
        todo.data("completed", updatedTodo.completed);
        console.log(updatedTodo);
        if(!(updatedTodo.completed)){
            todo.removeClass("done");
        } else {
            todo.addClass("done");
        }
    })
    .catch( err => {
        console.log(err);
    })
    
    // if(!isDone){
    //     todo.addClass("done");
    // } else {
    //     todo.removeClass("done");
    // }
    
}

