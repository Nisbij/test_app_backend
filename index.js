const express = require('express');
const mongodb = require('mongodb');
const morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Archelios:N!5@rg11232@cluster0-becy8.mongodb.net/test_app?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.post('/',(req,res)=>{
    const task = {
        title: req.body.title,
        desc: req.body.desc
    }
    console.log(req.body);
    client.connect(err => {
        const collection = client.db("test_app").collection("tasks");
        // perform actions on the collection object
        collection.insertOne(task,(err,result)=>{
            console.log(task);
        },(err)=> next(err))
        client.close();
      });
    res.send("boi");
})
app.listen(process.env.PORT || port,()=>{console.log(`Connected to port ${port}`)});