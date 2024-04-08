module.exports = function (req,res,next){
    if(req.session.role != "KADR"){
        res.redirect("/auth/kadr/login")
    }
    next()
}