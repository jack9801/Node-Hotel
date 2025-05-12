const express=require('express');
const app=express();
const db=require('./db.js');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const Person=require('./models/person.js');
const passport=require('./auth.js');
require('dotenv').config();
app.use(passport.initialize());
const LocalAuthmiddleware=passport.authenticate('local',{session:false});
app.get('/',LocalAuthmiddleware,(req,res)=>{
    res.send('Welcome to the server');
});
app.get('/about',(req,res)=>{
    var about={
        name :'shishupal',
        age : 22,
        city : 'pune'

    }
    res.send(about);
});
// app.post('/person',async(req,res)=>{
//     try{
//         const person=new Person(req.body);
//         const response=await person.save();
//         console.log('Person saved');
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({err,message:'Error saving person'});
//     }
// });
// GET method to retrieve all persons
app.get('/person',async(req,res)=>{
    try{
        const persons=await Person.find();
        res.status(200).json(persons);
    }catch(err){
        console.log(err);
        res.status(500).json({err,message:'Error retrieving persons'});
    }       
});
const personRoutes=require('./routes/personRoutes.js');
app.use('/person',personRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
});