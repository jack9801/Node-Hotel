const express=require('express');
const app=express();
const db=require('./db.js');
const bodyParser=require('body-parser');
const personRoutes=require('./routes/personRoutes.js');
app.use(bodyParser.json());
const passport=require('./auth.js');
const cors = require('cors');
app.use(cors());

require('dotenv').config();

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', function (req, res) {
    res.send('Welcome to our Hotel');
})

app.get('/about',(req,res)=>{
    var about={
        name :'shishupal',
        age : 22,
        city : 'pune'

    }
    res.send(about);
});
app.use('/person',personRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
});