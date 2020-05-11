const article=require("../model/article"),
      express=require("express"),
      router=express.Router();
//文章发表路由
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

//文章查找路由
router.post("/select",(req,res)=>{

    let keyword=req.body.keyword;
    let i="i";
    let cond={
        $or:[
            {title:new RegExp(keyword,i)},
            {tags:new RegExp(keyword,i)}
        ]
    }

    article.find(cond)
        .then(data=>{
            if(data){
                res.send({
                    code:1,
                    msg:data
                })
            }
            else {

            }
        })
        .catch()
})

module.exports=router;