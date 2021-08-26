const {model,Schema} = require('mongoose')

const contactschema=new Schema({
    name:{
        type:"String",required:true
    },
    email:{
        type:"String",required:true
    },
    subject:{
        type:"String",required:true
    },
    enq:{
        type:"String",required:true
    }
})

const Contact=model('contact',contactschema)
module.exports=Contact