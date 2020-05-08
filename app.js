//引入模块
const express=require("express"),
      mongoose=require("mongoose"),
      path=require("path") ;
//链接mongo数据库
mongoose.connect(
    "mongodb://localhost:27017/Blog",
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

app.get("/",(req,res)=>{
    res.render("index")
})
//注册路由
app.get("/register",(req,res)=>{
    res.render("register")
})
//登陆路由
app.get("/logon",(req,res)=>{
    res.render("logon")
})
//favicon.ico路由
app.get("/favicon.ico",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/images/1.jpg"))
})
