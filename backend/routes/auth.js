const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../models/User");

//register

router.post("/register", async (req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.passwort, salt);
    const newUser = new User({
        vorname: req.body.vorname,
        nachname:req.body.nachname,
        username: req.body.username,
        email: req.body.email,
        passwort: hash,  
    });
    try{
    const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(error) {
        res.status(403)
        throw new Error("Zugang verweigert");
    }
});
//login
router.post('/login', async (req, res)=>{
    let sec = process.env.JWT_SEC;
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user){
            return res.status(401).json("Falsche Eingabe");
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.passwort,
            user.passwort
          );
        if(!isPasswordCorrect){
            return res.status(401).json("Falsches Passwort");
        } else {
        const accessToken = jwt.sign(
            {id: user._id,
             isAdmin:user.isAdmin,
            },
            sec,
            {expiresIn:"30d"}
        )
        const {passwort, ...others} = user._doc;
        res.status(200).json({...others, accessToken});
        }
    } catch(error){
        res.status(403)
        throw new Error(error)
    }
});

module.exports = router;