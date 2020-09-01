const express = require('express');
const path = require('path');
const app = express();



const port = 3000;


// Set Static Folder
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
app.listen(port, function () {
    console.log("server started on port" + port);
});