const express = require('express');
const app = express();
var mysql = require('mysql');
const port = 3000;

var con = mysql.createConnection({
    host: "mydb-awssql.cy4oinulfb9u.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "mydb"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //var sql = "CREATE TABLE students (id INT NOT NULL AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), class VARCHAR(15), nationality VARCHAR(255), PRIMARY KEY (id))";
  //  var sql = "INSERT INTO students (id, firstName, lastName, class, nationality) VALUES (223445,'Mike', 'Wong', '3A', 'Singapore')" ;
  });


  const executeSQL = async (sql)=> {
    return new Promise(data => {
        con.query(sql, function (err, result) {
            if (err) throw err;
            try {
                data(result);

            } catch (error) {
                data({});
                throw error;
            }
        });
    })


  }

app.get('/', (req, res) => {
    res.send('hello rest api')
})

app.get('/fetchStudents', async (req, res) => {
    //console.log(req.query);
    const id = req.query.id;
    const cla = req.query.class;
    if(typeof id !== 'undefined'){
        let sql = `SELECT * FROM students where id = ${id}`
        let data = await executeSQL(sql);
        console.log(data)
        res.send(data)
    }

    if(typeof cla !== 'undefined'){
        let sql = `SELECT * FROM students where class = "${cla}"`
        console.log(sql)
        let data = await executeSQL(sql);
        res.send(data)
    }


})

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

