const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const taskDb = [

    {
        "id": 0,
        "title": "Root Task",
        "description": "Root task ",
        "completed": true
    },
    {
        "id": 1,
        "title": "Create a new project sample",
        "description": "Create a new project for sample",
        "completed": false
    }
];



app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


app.get("/", (req, res) => {

    res.send("Welcome to task Manager ");
})

app.get("/api/tasks/v1", (req, res) => {

    res.send(taskDb);
})

app.get("/api/tasks/v1/:id", (req, res) => {
    const id = req.params.id;
    const task = taskDb.find((task) => task.id === parseInt(id));
    if (!task) {
        res.status(404).send("task with the  given id is not vailable with us ");
    }
    res.send(task);
})

app.post("/api/tasks/v1", (req, res) => {
    const newtask = req.body;

    console.log(req.body.length);


    if (newtask.completed == null) {
        res.status(400).send("task is empyt  cannot create tasks with emnpty data ");
    }

    else {
        newtask.id = taskDb.length + 1;
        taskDb.push(newtask);
        const len = taskDb.length;
        console.log(len);
        res.status(201).send(newtask);

    }
}


)

app.put("/api/tasks/v1/:id", (req, res) => {
    const id = req.params.id;
    const task = taskDb.find((task) => task.id === parseInt(id));
    if (!task) {
        res.status(404).send("task with the  given id is not vailable with us ");
    }
    else {
        task.title = req.body.title;
        task.description = req.body.description;
        task.completed = req.body.completed;


        res.send(task);

    }

})

app.delete("/api/tasks/v1/:id", (req, res) => {
    const id = req.params.id;
    const task = taskDb.find((task) => task.id === parseInt(id));

    if (!task) {
        res.status(404).send("task with the  given id is not vailable with us ");
    }
    else {
        const index = taskDb.indexOf(task);
        taskDb.splice(index, 1);
        res.send(task);


        res.send(task);

    }

})