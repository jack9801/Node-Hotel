const express=require('express');
const router=express.Router();
const Person=require('./../models/person');
router.post('/',async(req,res)=>{
    try{
        const person=new Person(req.body);
        const response=await person.save();
        console.log('Person saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err,message:'Error saving person'});
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
