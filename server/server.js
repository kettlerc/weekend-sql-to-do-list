const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

let taskRouter = require('./routes/task.router');
app.use('/taskmanager', taskRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('server running on port:', PORT);  
});