console.log('JS');
$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#newTaskForm').on('click', '#addBtn', addTask)
};

//GET
function addTask() {
    console.log('add task button working');
    
}


//POST



//PUT



//DELETE