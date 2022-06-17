const express = require('express');
const app = express();
var mysql = require('mysql');
const port = 3000;
app.use(express.json())
var con = mysql.createConnection({
    host: "mydb-awssql.cy4oinulfb9u.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "mydb"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
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

app.post('/addStudent', async (req, res) => {
    const {firstName, lastName, cla, nationality} = {...req.body};
    let query = `INSERT INTO students 
    (firstName, lastName,class,nationality ) VALUES ( "${firstName}", "${lastName}" , "${cla}" , "${nationality}")`;
    let data = await executeSQL(query);
    res.send(data)
})

app.delete('/removeStudent', async (req, res) => {
    const {id} = {...req.body};

    if(typeof id !== 'undefined'){
        let query = `DELETE FROM students where id = ${id}`
         let data = await executeSQL(query);
         res.send(data)
    }else{
        res.status(400).send("please provide student id")
    }

    

})
app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});

