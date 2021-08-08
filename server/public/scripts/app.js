console.log('JS');
$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#newTaskForm').on('click', '#addBtn', addTask);
    $("#taskList").on('click', '.deleteBtn', deleteTask);
    $("#taskList").on('click', '.toggleTask', completeTask);
    
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
function completeTask() {
    const taskId = $(this).parents('tr').data('id');
    console.log(taskId);

    $.ajax({
        method: 'PUT',
        url: `/taskmanager/${taskId}`
    }).then((response) => {
        getTasks(response);
    }).catch((err) => {
        console.log('PUT err', err);
    });
}


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