const express=require('express')
const cors = require('cors')
const app=express()
const Contact=require('./models/Contact')
const mongoose=require('mongoose')
const { request, response } = require('express')
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://user:user123@cluster0.fmdc4.mongodb.net/origin',{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log('database connected')
}).catch((e)=>{
    console.log(e)
})
app.post('/contact',(req,res) =>{
    
    console.log(req.body)
    const {name,email,subject,enq}=req.body
    new Contact({
        name,email,subject,enq
    }).save().then(()=>{
        res.status(200).send({message:"submited"})
    })
})
.get('/contact',async (req,res) =>{
    
    const Contacts=await Contact.find()
    res.status(200).send(Contacts)

})
.delete('/contact/delete/:id',async (req,res) =>{
    const id=req.params.id
    Contact.deleteOne({_id:id}).then(()=>{
        res.status(200).send({messge:'Record deleted'})
    }).catch((e)=>{
        res.status(500).send({message:e.message})
    })

})
.post('/contact/search',async (req,res) =>{
    const query=req.body.key
    const records=await Contact.find({ "name" : { $regex: query } }).sort('name')

    console.log(records);
    res.status(200).send(records)
})
.get('/contact/sort/name',async (req,res)=>{
    

    const responses = await Contact.find().sort('name');
    console.log(responses);
    res.status(200).send(responses)
})
.
get('/contact/sort/subject',async (req,res)=>{
    

    const responses = await Contact.find().sort('subject');
    console.log(responses);
    res.status(200).send(responses)
})

const port=process.env.PORT||5000
app.listen(port,() => {
    console.log(`application running on ${port}`)
})
