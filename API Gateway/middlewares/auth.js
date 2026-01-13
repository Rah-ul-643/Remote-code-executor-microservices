const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET"; 

const auth = (req,res,next) => {
    const token = req.cookies.token;

    if (!token){
        console.log('Expired Token');        
        res.status(401).json({message:"Token Expired!"});
    }
    else{
        jwt.verify(token, SECRET_KEY, (err, decoded)=>{
            if (err){
                console.log('Invalid Token; Code submission request rejected');
                res.clearCookie('token', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                });
                res.status(401).json({message: "Unauthorized access!"});
            }
            else{
                req.username = decoded.username;
                next();
            }
        })

    }
}

module.exports = auth;