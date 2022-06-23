//Setup stuff
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const post = require('./Models/posts');
const student = require('./Models/posts');
const postRoute = require('./routes/posts');

mongoose.connect('mongodb://localhost:27017/testdb').then(() => {
    console.log("DB Connected")
}).catch(() => {
    console.log("Failed to connect DB")
});
const port = process.env.PORT || 3000;
const protectedRoute = express.Router();

app.set('key', 'secret');

protectedRoute.use((req, res, next) => {
    const token = req.headers["access-token"]
    if(token){
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if(err){
                return res.send({'msg':'Invalid token'})
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.send({'msg':'Token not provided'})
    }
});

//Working stuff
app.use(express.json());
app.use(cors());
app.all( '*', function(req, res, next) { 
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type");

    next();
});

app.use("/post",postRoute);

//Endpoints part
app.get( '/api/get', function(req, res){
    res.send({
        msg:'Hell',
        content: 'Beauty'
    });
});

app.post( '/api/post', function(req, res){
    let body = req.body;
    res.send({
        msg: `Post ${body.post}`
    });
});

app.delete('/api/delete', function(req, res){
    let body = req.body;
    res.send({
        msg: `Delete ${body.delete}`
    })
});

app.put('/api/update', function(req, res){
    let body = req.body;
    res.send({
        msg: `Update ${body.update}`
    })
});

app.listen( port, function(){
    console.log( 'Running' )
});
