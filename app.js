const express = require('express');
const app = express();

const port = 3000;

const students = {
    223445:{
        id:223445,
        firstName: "Mike",
        lastName: "Wong",
        class:"3A",
        nationality: "Singapore"
    },
    223446: {
        id:223447,
        firstName: "Edwin",
        lastName: "Cheung",
        class:"3A",
        nationality: "Hong Kong"
    },
    223447: {
        id:223447,
        firstName: "Harry",
        lastName: "Ho",
        class:"3A",
        nationality: "Hong Kong"
    }
}

app.get('/', (req, res) => {
    res.send('hello rest api')
})

app.get('/fetchStudents', (req, res) => {
    //console.log(req.query);
    const id = req.query.id;
    if(typeof id !== 'undefined'){
        const student = students[parseInt(id)]
        console.log(students[223445]);
        console.log(students.id);
        res.send(student)
    }

  
})

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});