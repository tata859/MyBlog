const express=require("express");
const user=require("../model/user")
const multer=require("multer");
const path=require("path")

let router=express.Router();

//让上传文件存储到磁盘
var storage = multer.diskStorage({
    //存储的文件夹 ,必须先创建好
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../public/photo"));
    },
    //文件名
    filename: function (req, file, cb) {

        if(req.session.userInfo){
            let fileName=req.session.userInfo._id + file.originalname.match(/\.[^\.]+$/g)
            req.fileName=fileName;
            cb(null, fileName);
        }
    }
})

var upload = multer({
    storage: storage,
    fileFilter (req, file, cb) {
        cb(null, /\.(jpg|png|gif)$/.test(file.originalname))
    },
    limits: {
        fileSize: 1024*100
    }
}).single("file");
router.post("/photo",(req,res)=>{
    console.log(req.session.userInfo);
    //文件类型或大小错误监听
    upload(req, res, function (err) {
        //console.log(req.fileName);
        if (err) {
            res.send({code:0,msg:"上传失败"})
        } else{
            user.updateOne(
                {_id:req.session.userInfo._id},
                {"userInfo.photo":req.fileName},
                )
                .then(data=>{
                    //console.log(data);
                })
                .catch(e=>{throw e})
            res.send({code:0,msg:"上传成功"})
        }

    })
})

module.exports=router;