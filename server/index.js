const express = require("express");
const app = express();

const mysql = require('mysql')

//as react app run on port 3000 usually
const PORT = 3001;


//to create connection with mysql db
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password123',
    database: 'PasswordManager',
});


//adding route
app.get('/', (req, res) => {
    res.send("Hello There!");
});
app.listen(PORT, () => {
    console.log("Server is up and running!");
  });


// CREATE TABLE `PasswordManager`.`passwords`(`id` INT NOT NULL AUTO_INCREMENT,`password` VARCHAR(255) NOT NULL,
// `title` VARCHAR(255) NOT NULL,PRIMARY KEY (`id`));