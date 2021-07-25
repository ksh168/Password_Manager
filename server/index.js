const express = require("express");
const app = express();

const cors = require("cors");

const mysql = require("mysql");

//as react app run on port 3000 usually
const PORT = 3001;

//for encryption
const {encrypt, decrypt} = require("./EncryptionHandler");


//using cors to parse json
app.use(cors());
app.use(express.json());

//to create connection with mysql db
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password123",
    database: "PasswordManager",
});


//adding route
// app.get('/', (req, res) => {
//     res.send("Hello There!");
// });

//to make the request
app.post('/addpassword', (req, res) => {
    //access values from frontend
    const {email, password, title} = req.body

    //encrypt password here before putting in database
    const hashedPassword = encrypt(password);


    //insert to db
    db.query("INSERT INTO passwords (email, password, title, iv) VALUES (?, ?, ?, ?)", 
    [email, hashedPassword.password, title, hashedPassword.iv], 
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Success");
        }
    });
});

app.get("/showpasswords", (req, res) => {
    //returning all passwords stored
    db.query("SELECT * FROM passwords;", (err, result) => {
        if (err) {
            console.log(err);
        } 
        else{
            res.send(result);
        }
    });
});


app.post("/decryptpassword", (req, res)=> {
    res.send(decrypt(req.body));
});


app.listen(PORT, () => {
    console.log("Server is up and running!");
  });


// CREATE TABLE `PasswordManager`.`passwords`(`id` INT NOT NULL AUTO_INCREMENT,`password` VARCHAR(255) NOT NULL,
// `title` VARCHAR(255) NOT NULL,PRIMARY KEY (`id`));