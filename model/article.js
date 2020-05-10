const mongoose=require("mongoose"),
      Schema=mongoose.Schema;

let articleSchema=new Schema({
    title:{type:String,required:true},
    tags:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:Date,default:Date.now()},
    author:{type:Schema.Types.ObjectId,ref:"user"}
});

module.exports=mongoose.model("article",articleSchema)