const express = require("express");
const app = express();
const PORT = 3001;


//adding route
app.get('/', (req, res) => {
    res.send("Hello There!");
});
app.listen(PORT, () => {
    console.log("Server is up and running!");
  });