require("dotenv").config();
const express = require('express');
const db = require('./database');
const port = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cors());
 
//Get all users
app.get('/users',async (req,res)=>{
    try{
        const result = await db.query("select * from users");
        console.log(result);
        console.log("Get all users");
        res.status(200).json(result.rows)
    }catch(err){
        console.log(err);
    }

})
// Get specific user
app.get('/users/:id', async (req,res)=>{
    try{
        const sResult = await db.query("select * from users where id = $1",[req.params.id])
        res.status(203).json({
            status:'success',
            data:{
                people:sResult.rows
            }
        })
        console.log(sResult)
    }catch(err){
        console.log(err);
    }
    
})

//Create a user
app.post('/users',async (req,res)=>{
    console.log(req.body);
    try{
        const addUser = await db.query("insert into users (fullname, username, contact, password) values ($1, $2, $3, $4) returning *", 
        [req.body.fullname,req.body.username,req.body.contact,req.body.password]
        );
        console.log(addUser);
        res.send("User Created");
        
    }catch(err){
        console.log(err);
    }
   
})
//Update a user
app.put('/users/:id',async (req,res)=>{
    try{
        const update = await db.query("UPDATE users SET fullname = $1 WHERE id = $2 returning *",
        [req.body.fullname,req.params.id]);
        res.json({
            status:'success',
            data : {
                manipulated:  update.rows
            }
        })
        console.log(update);
    }catch(err){
        console.log(err)
    }
   
    
})
//Delete a user
app.delete('/users/:id',async(req,res)=>{
    try{
        const remove = await db.query("DELETE from users where id = $1",[req.params.id]);
        res.json({
            status:'successfully deleted',
            data: {
                deleted : remove.rows
            }
        })
        console.log("Welcome to delte panel");
    }catch(err){
        console.log(err);
    }
   
})
app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`);
})