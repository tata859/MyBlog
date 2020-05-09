const user=require("../model/user"),
      express=require("express"),
      router=express.Router()
router.get("/",(req,res)=>{
    res.render("register")
})

router.post("/",(req,res)=>{
    user.findOne({username:req.body.username})
        .then(data=>{
            if(data){
                res.send({
                    code:0,
                    msg:"用户名已存在，请重新输入"
                })
            }
            else {
                if(req.body.password===req.body.passwordone){
                    let date={
                        username:req.body.username,
                        password:req.body.password,
                        userInfo: {
                            tel:req.body.tel
                        }
                    }
                    user.create(date)
                        .then((data)=>{
                            if(data){
                                res.send({
                                    code:1,
                                    msg:"注册成功"
                                })
                            }
                            else {
                                res.send({
                                    code:0,
                                    msg:"注册失败，服务器异常"
                                })
                            }
                        })
                }
                else {
                    res.send({
                        code:0,
                        msg:"密码不一致"
                    })
                }
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

