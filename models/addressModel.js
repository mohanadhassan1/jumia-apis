const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const addressSchema=mongoose.Schema({
    address_id:{
        type:Number,
        required:true,
        unique:true,
    
    },
    region:{
        type:String,
    },
   
    city:{
        type:String,
    },
    street:{
        type:String,
    },
    building:{
        type:String ||Number
    }
   
},{collection:"Address"},{timestamps:true}
);

const addressModel= mongoose.model('Address',addressSchema)

module.exports=addressModel