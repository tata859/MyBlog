const user=require("../model/user")
module.exports=function(req,res){
    var dataInfo={}
    var pho={}
    if(req.session.userInfo){
        user.findById(req.session.userInfo._id)
            .then(data=>{
                dataInfo={
                Info:{
                    url:"/userInfo",
                    target:"_blank",
                    con:"个人信息"
                },
                art:{
                    url:"/userInfo",
                    target:"_blank",
                    con:"我的文章"
                },
                logonout:{
                    url:"/logonout",
                    target:"_self",
                    con:"退出登录"
                },
                imgs:{
                    url:data.userInfo.photo,
                }
            }
                //console.log(dataInfo);
                res.render("index",dataInfo)
            })
            .catch(e=>{
                throw e
            })
    }
    else {
        dataInfo={
            Info:{
                url:"/logon",
                target:"_self",
                con:"登陆"
            },
            art:{
                url:"#",
                con:null
            },
            logonout:{
                url:"/register",
                target:"_self",
                con:"注册"
            },
            imgs:{
                url:"../images/1.jpg",
            }

        }
        res.render("index",dataInfo)
    }

    //res.render("index",dataInfo)   //合并一起就出现问题
}
