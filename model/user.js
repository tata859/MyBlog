const mongoose=require("mongoose"),
      Schema=mongoose.Schema,
      crypto=require("crypto");

let userSchema=new Schema({
    username:{
        type:String,
        required:true,
        match:/^[\da-zA-Z\u4e00-\u9fa5]{2,12}$/
    },
    password:{
        type:String,
        required:true,
        match:/^[\da-zA-Z{}!@#$%^&*()?\[\]]{6,12}$/
    },
    userInfo:{
        sex:{
            type:String,
            enum:["男","女"]
        },
        age:{
            type:String,
            min:0
        },
        tel:{
            type:String,
            match:[/^1[356789]\d{9}$/]
        },
        email:{
            type:String,
            match:/^[\da-z]+@[\da-z]+(\.[a-z]+)+$/i
        },
        status:{
            type:String,
            default:"这个人很懒，什么都没留下......."
        }
    }
})
//密码加密
userSchema.pre("save",function (next) {
    let newPwd=crypto.createHash("sha256").update(this.password).digest("hex");
        this.password=newPwd
    next()
})

module.exports=mongoose.model("user",userSchema);