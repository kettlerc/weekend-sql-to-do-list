console.log('JS');
$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#newTaskForm').on('click', '#addBtn', addTask)
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
                <li>${response[i].task}</li>
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