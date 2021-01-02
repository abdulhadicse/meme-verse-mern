const Users = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    loginUser: async (req, res)=>{
        try{

            const {email, password} = req.body;

            const user = await Users.findOne({email:email});

            if(!user) return res.status(400).json({msg: 'User does not exist'});

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) return res.status(400).json({msg:'Incorrect Password'});

            //if user success

            const payload = {id: user._id, username: user.username}

            const token = jwt.sign(payload, process.env.TOKEN_SECRET,{expiresIn:"1d"});

            res.json({token});

        }catch(err){
            return res.status(500).json({
                msg: err.message
            })
        }
    },

    regiserUser: async (req, res)=>{
        try{
            
            const {username, email, password} = req.body;

            const user = await Users.findOne({email: email});

            if(user) return res.status(400).json({msg:'This email already exists'})

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = {
                username,
                email,
                password:passwordHash
            }

            const save_user_in_db = Users(newUser);

            save_user_in_db.save();

            res.json({msg: 'Register Success'})
            

        }catch(err){
            return res.status(500).json({
                msg: err.message
            })
        }
    },

    verifyToken: (req, res) =>{
        try{
            const token = req.header('Authentication');

            if(!token) return res.send(false);

            jwt.verify(token, process.env.TOKEN_SECRET, (err, result)=>{
                if(err) return res.send(false);

                Users.findById({_id:result.id})
                .then(result =>{
                    res.send(true);
                })
                .catch(err =>{
                    res.send(false);  
                })               
            })
        }
        catch(err){
            res.json({msg: 'HH'})
        }
    }
}

module.exports = userController;