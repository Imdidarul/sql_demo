const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '**********',
    database: 'testDb'
})


connection.connect((err)=>{
    if(err){
        console.lof(err)
        return
    }
    console.log("Connection made successfully")

    const creationQuery = `create table IF NOT EXISTS Student(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(30) NOT NULL,
        age INT NOT NULL
    )`


    connection.execute(creationQuery,(err)=>{
        if(err){
            console.log(err);
            connection.end()
            return
        }
        console.log("Student table is ready")
    })
})

module.exports = connection