console.log('JS');
$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#newTaskForm').on('click', '#addBtn', addTask);
    $("#taskList").on('click', '.deleteBtn', deleteTask)
    getTasks();
};

//GET
function getTasks() {
    $("#taskList").empty();
    $.ajax({
        type: 'GET',
        url: '/taskmanager'
    }).then((response) => {
        for (let i=0; i<response.length; i++) {
            $("#taskList").append(`
            <tr data-id="${response[i].id}">
                <td>${response[i].task}</td>
                <td>${response[i].isComplete}</td>
                <td><button class="deleteBtn">Delete</button>
            </tr>
            `);
        }
    }).catch((err) => {
        console.log('Can\'t get tasks...');
    });
}

//POST
function addTask() {
    console.log('add task button working');
    let objectToSend = {
        task: $('#newTask').val(),
        isComplete: false
    }
    console.log('new task', objectToSend);
    $.ajax({
        type: 'POST',
        url: '/taskmanager',
        data: objectToSend
    }).then((response) => {
        $('#newTask').val(''),
        getTasks();
    }).catch((err) => {
        console.log('POST err', err);   
    });
}

//PUT



//DELETE
function deleteTask() {
    const taskId = $(this).parents('tr').data('id');
    console.log(taskId);
    
    $.ajax({
        method: 'DELETE',
        url: `/taskmanager/${taskId}`
    }).then((response) => {
        console.log(response);
        getTasks();
    }).catch((err) => {
        console.log('DELETE err', err);
    });
}