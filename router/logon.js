const user = require("../model/user")
const crypto = require("crypto")
const express = require("express")
let  router = express.Router()

router.get("/",(req,res)=>{
    res.render("logon")
})

router.post("/",(req,res)=>{
    user.findOne({username:req.body.username})
        .then(data=>{
            if(data){
                let Lpwd=crypto.createHash("sha256").update(req.body.password).digest("hex");
                if(Lpwd===data.password){
                    req.session.userInfo=data;
                    //console.log(req.session.userInfo);
                    res.send({
                        code:1,
                        msg:"登陆成功"
                    })
                }
                else {
                    res.send({
                        code:0,
                        msg:"密码不正确"
                    })
                }
            }
            else {
                res.send({
                    code:0,
                    msg:"用户名不正确"
                })
            }
        })
        .catch(e=>{
            res.send({
                code:0,
                msg:"服务器异常"
            })
            throw e;
        })
})
module.exports=router;