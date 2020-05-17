const comment=require("../model/comment")
const article=require("../model/article")
const express=require("express"),
      router=express.Router();


//文章评论
router.post("/",(req,res)=>{

    if(req.session.userInfo){
        let {articleId,articletitle,commentdata}=req.body;
        let commentauthorId=req.session.userInfo._id;
        let commentauthorusername=req.session.userInfo.username;

        if(req.body.commentdata){
            comment.create({
                articleId,
                articletitle,
                commentauthorId,
                commentauthorusername,
                commentdata,
            })
                .then(data=>{
                    if(data){
                        res.send({code:1,msg:"评论成功"})
                    }else {
                        res.send({code:0,msg:"请求超时"})
                    }
                })
                .catch(e=>{
                    res.send({code:0,msg:"服务器异常，请稍后再试"})
                    throw e
                })
        }else {
            res.send({code:0,msg:"请填写评论内容"})
        }

    }else {
        res.send({code:0,msg:"请先登录"})
    }

})



module.exports=router;