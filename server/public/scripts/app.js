//handshake to show js is working
console.log('JS');

//initiates jquery
$(document).ready(onReady);

//function that runs when the page loads
function onReady() {
    //handshake to shaw jquery is working
    console.log('JQ');
    //on click functions for buttons
    $('#newTaskForm').on('click', '#addBtn', addTask);
    $("#taskList").on('click', '.deleteBtn', deleteTask);
    $("#taskList").on('click', '.toggleTask', completeTask);
    
    //updates the DOM with the current tasks
    getTasks();
}; //end onReady

//GET endpoint to find tasks in the database
//and append them to the DOM
function getTasks() {
    //empties the list of tasks before appending
    $("#taskList").empty();
    //ajax call to the server
    $.ajax({
        type: 'GET',
        url: '/taskmanager'
    }).then((response) => {
        //loops through the response from the server and appends to the DOM
        for (let i=0; i<response.length; i++) {
            $("#taskList").append(`
            <tr data-id="${response[i].id}">
                <td>${response[i].task}</td>
                <td>
                    <button class="${response[i].isComplete ? "taskDone" : "toggleTask"}">
                        ${response[i].isComplete ? "Checked Off!" : "Complete"}
                    </button>
                </td>
                <td><button class="deleteBtn">Delete</button>
            </tr>
            `);
        }
    }).catch((err) => {
        console.log('Can\'t get tasks...');
    });
} //end getTasks

//POST endpoint to add new task
function addTask() {
    //log to make sure the button is working
    console.log('add task button working');
    //object created to send to the server
    let objectToSend = {
        task: $('#newTask').val(),
        isComplete: false
    }
    //log of the object being sent to make sure its working
    //and check its data type
    console.log('new task', objectToSend);
    //ajax call to the server
    $.ajax({
        type: 'POST',
        url: '/taskmanager',
        data: objectToSend
    }).then((response) => {
        //clears out the values typed into the form
        $('#newTask').val(''),
        //refreshes the DOM with the current tasks
        getTasks();
    }).catch((err) => {
        console.log('POST err', err);   
    });
} //end addTasks

//PUT endpoint to change a task to completed
function completeTask() {
    //'this' identifies which button is being clicked
    const taskId = $(this).parents('tr').data('id');
    //logging the id of the object clicked to make sure its working
    console.log(taskId);
    //ajax call to the server
    $.ajax({
        method: 'PUT',
        url: `/taskmanager/${taskId}`
    }).then((response) => {
        //refreshes the DOM with the current tasks
        getTasks(response);
    }).catch((err) => {
        console.log('PUT err', err);
    });
} //end completeTask


//DELETE endpoint to remove a task
function deleteTask() {
    //identifies which row in the table needs to be deleted
    const taskId = $(this).parents('tr').data('id');
    //logging the id of the object clicked to make sure its working
    console.log(taskId);
    //ajax call to the server
    $.ajax({
        method: 'DELETE',
        url: `/taskmanager/${taskId}`
    }).then((response) => {
        console.log(response);
        //refreshes the DOM with the current tasks
        getTasks();
    }).catch((err) => {
        console.log('DELETE err', err);
    });
} //end deleteTask