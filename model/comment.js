const mongoose=require("mongoose"),
      Schema=mongoose.Schema;

let commentSchema=new Schema({
    articleId:{
        type:Schema.Types.ObjectId, ref:"article",
        required:true,
    },
    articletitle:{
        type:String,
    },
    commentauthorId:{
        type:Schema.Types.ObjectId, ref:"user",
        //required:true,
    },
    commentauthorusername:{
        type:String,
    },
    commentdata:{
        type:String,
        //required:true
    },
    date:{
        type:Date,default:Date.now(),
    }
})

module.exports=mongoose.model("comment",commentSchema)