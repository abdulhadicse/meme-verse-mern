const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
    try{
        const token = req.header('Authentication');
        if(!token) return res.status(400).json({msg: 'Invalid Authentication'});

        jwt.verify(token, process.env.TOKEN_SECRET, (err, result)=>{
            if(err) return res.status(400).json({msg: 'Authentication not valid'});
            req.user = result;
        });

        next();

    }catch(err){
        res.json({msg: err.message});
    }

}

module.exports = auth;