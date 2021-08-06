console.log('JS');
$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#newTaskForm').on('click', '#addBtn', addTask)
};

//GET



//POST
function addTask() {
    console.log('add task button working');
    let objectToSend = {
        task: $('#newTask').val()
    }
    console.log('new task', objectToSend);
    $.ajax({
        type: 'POST',
        url: '/taskmanager',
        data: objectToSend
    }).then((response) => {
        $('#newTask').val('')
    }).catch((err) => {
        console.log('POST err', err);   
    });
}


//PUT



//DELETE