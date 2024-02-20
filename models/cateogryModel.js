const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const categorySchema=mongoose.Schema({
    category_id:{
        type:Number,
        required:true,
        unique:true,
    
    },
    name:{
        type:String,
        required:true,
        minLength:[3,"user name at least 8 characters",],
        unique:true
    },
   
    description:{
        type:String,
        minLength:10,
        maxLength:[50,"maximum length 15 characters"],

    },
   
},{collection:"Category"},{timestamps:true}
);

const categoryModel= mongoose.model('Category',categorySchema)

module.exports=categoryModel