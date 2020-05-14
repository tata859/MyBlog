//引入模块
const express=require("express"),
      mongoose=require("mongoose"),
      path=require("path"),
      session=require("express-session"),
      mongooseSession=require("connect-mongo")(session);
//链接mongo数据库
mongoose.connect(
    "mongodb://localhost:27017/MyBlog",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("数据库连接成功");
    })
    .catch(()=>{
        console.log("数据连接失败");
    })
//创建实例
let app=express()
//监听端口
app.listen(5888)
//数据的处理
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//设置ejs引擎模板
app.set("view engine","ejs")
//设置静态资源目录
app.use(express.static("./public"))
//设置session
app.use(session({
    name:"cookie",//cookie名
    secret:"blog",//密钥
    rolling:true,// 用户跟后台有交互，刷新存储时间
    resave:false,//是否每次请求都存储session数据
    saveUninitialized:false,//是否设置初始值
    cookie:{maxAge:1000*60*60},//设置session过期时间
    store:new mongooseSession({
       url:"mongodb://localhost:27017/MyBlog"
    })
}))
/*app.get("/",(req,res)=>{
    res.render("index")
})*/
app.get("/",require("./router/page"))
//注册路由
app.use("/register",require("./router/register"))

//登陆路由
app.use("/logon",require("./router/logon"))

//个人信息路由
app.use("/userInfo",require("./router/userInfo"))

//图片上传接口
app.use("/upload",require("./router/upload"))

//文章路由
app.use("/article",require("./router/article"))
//退出登录路由
app.get("/logonout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

//检测session是否存在
app.post("/usercenter",(req,res)=>{
    if(req.session.userInfo){
        res.render("index",{code:1,msg:"用户存在"})
    }else {
        res.render("index",{code:0,msg:"用户不存在"})
    }
})



//favicon.ico路由
app.get("/favicon.ico",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/images/1.jpg"))
})
