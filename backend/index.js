const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); 

app.get("/api/data/", (req, res) => {
    res.send({"message": data});
});

app.listen(8000, () => {
    console.log("Server started at port 8000");
});