// * Initialization
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs(process.env.MONGO_URI,['posts']);
const ObjectId = mongojs.ObjectId;
const app = express();

// * Views
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// * Assets
app.use(express.static(path.join(__dirname,'public')));

// * Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// ************* R O U T I N G ************** //
    app.get('/',(req,res)=>{
        db.posts.find((err,docs)=>{
            res.render('posts/index',{
                posts: docs
            });
        });
    });
    app.get('/posts',(req,res)=>{
        db.posts.find((err,docs)=>{
            res.render('posts/index',{
                posts: docs
            });
        });
    });
    app.get('/api/posts',(req,res)=>{
        db.posts.find((err,docs)=>{
            res.json(docs);
        });
    });
    app.post('/posts',(req,res)=>{
        let newPost = {
            title: req.body.title,
            body: req.body.body
        }
        db.posts.insert(newPost,(err,result)=>{
            if (err){
                console.log(err)
            }
            res.json(newPost);
        });
    });
    app.get('/posts/:id',(req,res)=>{
        db.posts.find({_id:ObjectId(req.params.id)},(err,docs)=>{
            res.json(docs[0]);
        });
    });
    app.put('/posts/:id', (req,res)=>{
        let updatedPost = {
            title: req.body.title,
            body :req.body.body
        };
        db.posts.update({_id:ObjectId(req.params.id)}, updatedPost,(err,result)=>{
            if (err){
                console.log(err);
            }
            res.json(updatedPost);
        });
    });
    app.delete('/posts/:id', (req,res)=>{
        db.posts.remove({_id:ObjectId(req.params.id)},(err, result)=>{
            if (err){
                console.log(err);
            }
        });
    });
// ****************************************** //

// * Port
app.listen(8000,()=>{
    console.log('Application is running on http://127.0.0.1:8000 . . .');
});