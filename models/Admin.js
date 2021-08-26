const {model,Schema} = require('mongoose')

const adminSchema=new Schema({
    email:{
        type:"String",required:true
    },
    password:{
        type:"String",
        required:true
    }
})

const Admin=model('admin',adminSchema)
module.exports=Admin