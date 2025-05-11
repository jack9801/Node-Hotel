const mongoose = require('mongoose');
require('dotenv').config();
//const mongoURL='mongodb://localhost:27017/hotels';
const mongoURL=process.env.MONGODB_URL ;
mongoose.connect(mongoURL,
     { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('connected', () => {
    console.log('MongoDB connected successfully')});
db.on('error', (err) => {
    console.log('MongoDB connection error:', err)});
db.on('disconnected', () => {
    console.log('MongoDB disconnected')});
// Export the connection
   module.exports = db;
                            