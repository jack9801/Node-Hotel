const express=require('express');
const router=express.Router();
const Person=require('./../models/person');
const {jwtAuthMiddleware, generateToken}=require('./jwt.js');
router.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        const person=new Person(data);
        const response=await person.save();
        console.log('Person saved');
        const payload={
            id:response.id,
            username:response.username
        }
        const token=generateToken(payload);
        res.status(200).json({response:response,token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({err,message:'Error saving person'});
    } 
});

// login route
router.post('/login',async(req,res)=>{
    try{
        // Extract username and password from request body
        const {username,password}=req.body;
        const user=await Person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:'Invalid username or password'});
        }
        // generate token
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);
        return res.status(200).json({message:'Login successful',token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({err,message:'Error saving person'});
    }
});

// get all persons
router.get('/',jwtAuthMiddleware, async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('Persons retrieved');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err,message:'Error retrieving persons'});
    }
});

// Get profile by id
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user.userData; // Extract user data from req.user
        console.log('Decoded user data:', userData);

        const userId = userData.id; // Extract user ID
        console.log('User ID:', userId);

        const person = await Person.findById(userId); // Find person by ID
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        console.log('Person retrieved:', person);
        res.status(200).json(person);
    } catch (err) {
        console.error('Error retrieving person:', err);
        res.status(500).json({ err, message: 'Error retrieving person' });
    }
});

router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='developer' || workType=='manager' || workType=='analyst'){
            const persons=await Person.find({work:workType});
            console.log('Persons retrieved');
            res.status(200).json(persons);
            
        }
        else{
            res.status(400).json({message:'Invalid work type'});
        }  
    }catch(err){  
        console.log(err);
        res.status(500).json({err,message:'Error retrieving persons'});
    }}); 

    //upate person by id
    router.put('/:id',async(req,res)=>{
        try{
            const personId=req.params.id;
            const upatePersondata=req.body;
            const person=await Person.findByIdAndUpdate(personId,upatePersondata,{new:true,runvalidators:true});
            if(!person){
                return res.status(404).json({message:'Person not found'});
            }
            console.log('Person updated');
            res.status(200).json(person);   
        }
        catch(err){
            console.log(err);
            res.status(500).json({err,message:'Error updating person'});
        }
    });
    //delete person by id
    router.delete('/:id',async(req,res)=>{
        try{
            const personId=req.params.id;
            const person=await Person.findByIdAndDelete(personId);
            if(!person){
                return res.status(404).json({message:'Person not found'});
            }
            console.log('Person deleted');
            res.status(200).json({message:'Person deleted successfully'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({err,message:'Error deleting person'});
        }
    });

       
       
module.exports=router;
