const user=require("../model/user")
module.exports=function (req,res) {
    if(req.session.userInfo){

        let date={};
        let postdate=req.body;
        for(let [key,value] of Object.entries(postdate)){
            //console.log(`${key}:${value}`);
            if(value){
                date["userInfo."+key]=value;
            }
        }
        user.updateOne(
            {_id:req.session.userInfo._id},
            {$set:date}
            )
            .then(()=>{
                res.send({
                    code: 1,
                    msg: "更新成功"
                })
            })
            .catch(e=>{
                res.send({
                    code: 0,
                    msg: "服务器异常，请稍后再试"
                })
            })
    }
    else {
        res.send({code:0,msg:"请先登录"})
    }
}

