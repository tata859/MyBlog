const user=require("../model/user"),
      express=require("express"),
      router=express.Router();

//主路由
router.get("/",(req,res)=>{
    if(req.session.userInfo){
        user.findById(req.session.userInfo._id)
            .then(data=>{
                //console.log(data);
                if(data){
                    res.render("userInfo",data)
                }

            })
    }
    else {
        res.send({code:0,msg:"请先登录"})
    }

})
/*router.get("/baseInfo",(req,res)=>{
    res.render("baseInfo")
})*/
module.exports=router;