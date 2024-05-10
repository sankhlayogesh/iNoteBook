const express = require('express');
const User = require("../models/User");
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
var jwt = require('jsonwebtoken');
const fatchUser = require('../middleware/fatchuser');

const JWT_SECRET = 'inote$book'
// ROUTH 1 : create a user using "/api/auth/createuser" =====================================
router.post('/createuser',[
        body('name').isLength({min:3}),
        body('email').isEmail(),
        body('password').isLength({min:5}),
    ], async (req, res ) => {
    // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
    
        try {
            // check whether the user with the same email exits already
            let user = await User.findOne({email: req.body.email})
            if(user){
                return res.status(400).json({status: "ERROR", message: "Sorry a user with this email already exits"})
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password , salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
                // .then( user => res.json(user)).catch(err => { res.json({error: 'Please enter a unique value for email.', message : err.message})});
                
                // const user = User(req.body);
                // user.save();
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data,JWT_SECRET);
            // res.json({ "status": "SUCCESS","message": "SUCCESS","records" :[user]});
            res.json({authToken});
              
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
    })

//ROUTH 1 : Authenticate a user using "/api/auth/createuser" ==========================================
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res ) => {

    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({status: "ERROR", message: 'Please try to login with correct credential'})
        }

        const passwordCompare = await bcrypt.compare(password , user.password)
        if(!passwordCompare){
            return res.status(400).json({status: "ERROR", message: 'Please try to login with correct credential'}) 
        }

        const data = {
            user: user
        }
        const authToken = jwt.sign(data,JWT_SECRET);

        res.json({authToken})

    } catch (error) {
        res.status(500).send('Internal server error')
    }

    })


//ROUTH 3 : Get logedin user details using post "/api/auth/getuser" . Login required ==========================================
router.post('/getuser', fatchUser,  async (req, res ) => {

    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password')
        res.json({status: "SUCCESS" , records :[user]})
    } catch (error) {
        res.status(500).send('Internal server error')
    }
})
module.exports = router;