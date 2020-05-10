const user=require("../model/user"),
      express=require("express"),
      router=express.Router();

//主路由
router.get("/",(req,res)=>{
    res.render("userInfo")
})
/*router.get("/baseInfo",(req,res)=>{
    res.render("baseInfo")
})*/
module.exports=router;