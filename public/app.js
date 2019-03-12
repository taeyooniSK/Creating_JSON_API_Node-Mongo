$(document).ready( () => {
    $.getJSON("/api/todos")
    .then(addTodo)

    // .then(todos => {
    //     todos.map( todo => {
    //         let li = document.createElement("li");
    //         li.textContent = todo.name;
    //         $('.list').append(li);
    //     })
    // })
    .catch( err => {
        console.log(err);
    })
})


function addTodo(todos){
    todos.forEach( todo => { 
        let newTodo = $("<li class='task'>" + todo.name +"</li>")
        $('.list').append(newTodo);
    });
}