const user=require("../model/user")
const crypto=require("crypto")
module.exports=function (req,res) {
    console.log(req.session.userInfo._id);
    if(req.session.userInfo._id){
        user.findById({_id:req.session.userInfo._id})
            .then(data=>{
                console.log(data);
                if(data){
                    let oldpwd=crypto.createHash("sha256").update(req.body.oldpassword).digest("hex")
                    if(oldpwd===data.password){
                        if(req.body.newpassword===req.body.newpwd){
                            data.password=req.body.newpassword;
                            data.save();
                            console.log(data.password);
                            res.send({
                                code:1,
                                msg:"修改成功"
                            })

                        }else {
                            res.send({
                                code:0,
                                msg:"新密码不一致"
                            })
                        }
                    }else {
                        res.send({
                            code:0,
                            msg:"原始密码不正确"
                        })
                    }
                }
                else {
                    res.send({
                        code:0,
                        msg:"网络异常"
                    })
                }
            })
            .catch(e=>{
                res.send({code:0,msg:"服务器异常，请稍后再试"})
                throw e
            })
    }else {
        res.send({
            code:0,
            msg:"请先登录"
        })
    }
}