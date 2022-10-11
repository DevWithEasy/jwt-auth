const jwt = require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(403).json({status:403,msg:"Token is not valid"})
            }
            req.user = user
            next()
        })
    }else{
        res.status(401).json({status:401,msg:"you are not a authenticated user"})
    }
}

module.exports = verifyToken