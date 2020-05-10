const article=require("../model/article"),
      express=require("express"),
      router=express.Router();

router.post("/",(req,res)=>{

    if(req.session.userInfo){
        let {title,tags,content}=req.body;
        if(title&&tags&&content){
            let datearticle={
                title,
                tags,
                content,
                author:req.session.userInfo._id
            }

            article.create(datearticle/*{
                title,
                tags,
                content,
                author:req.session.userInfo._id
            }*/)
                .then(data=>{
                    if(data){
                        res.send({code:1,msg:"发表成功"})
                    }else {
                        res.send({code:1,msg:"发表失败，请求超时"})
                    }
                })
                .catch(e=>{
                    res.send({code:1,msg:"服务器异常"})
                    throw e;
                })
        }else {
            res.send({code:0,msg:"文章格式不正确"});
        };
    }else {
        res.send({code:0,msg:"请先登录"});
    }
})

module.exports=router;