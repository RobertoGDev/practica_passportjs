var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const usersModel = require('../models/Users');


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy( function(username, password, done) {
    usersModel.findOne({'info.username': username}, async function(err, user) {

        if (err) { 
            return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Error 001' });
        }

        const matchPassword = await validPassword(user.auth.password.toString(), await hashedPassword(password));

        if (!matchPassword) {
            return done(null, false, { message: "Error 002" });
        }

        return done(null, { username: user._id, email: user.info.username });
      });
    }
  ));

function validPassword(passStored, passReceived) {
    return bcrypt.compare(passStored, passReceived);
}

async function hashedPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password.toString(), 10, (err, hash) => {
            if (err) {
                throw err;
                res.status(500).send();
            }

            return resolve(hash);
        })
    })
}


async function findUser(req) {
    usersModel.findOne({"info.username": req.body.username}, (err, user) => {
        if (err) {
            throw err;
            res.status(500).send();
        }
        
        res.status(200).send(`Login success`);
    })
}



router.post('/', passport.authenticate('local'), async function(req, res) {

    const user = await findUser(req);
    
    if(!user) {
        res.status(404).send('Error 003');
    };

    res.status(200).send('Logged in!');


});


router.post('/check', async function(req, res) {
    
    const user = await findUser(req);
    
    if(!user) {
        return res.status(404).send('Error 003');
    };

    res.status(200).send(user.info.username, user.info.email);

});


router.post('/signup', async function(req, res) {
    const user = new usersModel({
        info: {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            birthday: req.body.birthday,
            city: req.body.city,
            country: req.body.country,
            gender: req.body.gender,
          }
    }); 

        user.auth.password = await createHashedPassword(req.body.password);

        await user.save().catch(err => {
            throw err;
            return res.status(500).send()
        });

        return res.status(201).send('Created!!');
});

module.exports = router;
