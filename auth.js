const express = require('express');
const passport = require('passport');
const Person = require('./models/person'); // Ensure the correct model is imported
const LocalStrategy = require('passport-local').Strategy;
const app = express();

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await Person.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            const isPasswordMatch = await user.comparePassword(password);
            if (!isPasswordMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

module.exports = passport;