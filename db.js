const mongoose = require('mongoose');
//const mongoURL='mongodb://localhost:27017/hotels';
const mongoURL='mongodb+srv://jackrichardjacky:qwert1234@cluster0.se7lzgr.mongodb.net/';
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
                            