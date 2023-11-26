const authrole=(req,res,next)=>{
    if(req.user.role=="Employee-Human Resource"){
        next();
    }
    else{
        return res.status(403).json({
            message:`Role: ${req.user.role}, is not allowed post opportunities`
        });
    }
}
module.exports=authrole;