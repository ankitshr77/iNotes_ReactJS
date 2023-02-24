const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "Ankitisagoodbo$y"



// -----------------------------------------------------------------------------------------------------// 
 
// Route 1 : CREATING AN USER USING: POST "/api/auth/createuser"  (No login required)

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min:5 })
], async (req, res)=>{

    //IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    // CHECK WHETHER THE USER WITH THE SAME EMAIL EXISTS ALREADY

    try {
        let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error:"User with this email address already exists"})
    }

    // generating salt and combining with the password to make it secure
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //creating new user 
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
    })

    const data = {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json("The User is created successfully.")
    res.json({authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
    
    
})


// -----------------------------------------------------------------------------------------------------// 



// Route 2 : AUTHENTICATE USER: POST "/api/auth/login"  

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blanked').exists()
], async (req, res)=>{

    //IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please login with valid credentials."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        // Returns True or False and if false:
        if(!passwordCompare){
            return res.status(400).json({error:"Please login with valid credentials."})
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }



})

// -----------------------------------------------------------------------------------------------------// 

// Route 3 : GET USER DETAILS : POST "/api/auth/getuser" ( Login Required )

router.post('/getuser', fetchuser, async (req, res)=>{

try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
}
})


module.exports = router