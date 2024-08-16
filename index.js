const express = require('express');
const conectarDB = require('./config/db');
const app = express();
const cors = require("cors");


conectarDB();
app.use(cors());
app.use(express.json());

app.use('/innovaTube',require('./routes/rutas'));

app.listen(4000,()=>{
    console.log('El servidor esta corriendo perfectamente');
})

