const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    work: { type: String, enum: ['developer', 'manager', 'analyst'], required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    salary: { type: Number, required: true },
    username: { type: String, required: true, unique: true }, // Ensure this line ends with a comma
    password: { type: String, required: true }
});
// Middleware to hash the password before saving the person document

personSchema.pre('save', async function(next) {
    const person = this;
    if(!person.isModified('password')) {
        return next();
    }
    try
{
        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        person.password = await bcrypt.hash(person.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
//
personSchema.methods.comparePassword = async function(candidatePassword) {
    // Compare the provided password with the hashed password stored in the database
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch (error) {
        throw new Error('Error comparing passwords');
    }

};

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
