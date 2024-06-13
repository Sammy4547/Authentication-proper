const express=require('express')
const app=express()
const path=require('path')
const cookieParser = require('cookie-parser')
const userModel=require('./models/user')
const bcrypt=require('bcrypt')
const dotenv=('dotenv').config()
const jwt=require('jsonwebtoken')
const port=3000


//middelware
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/create', (req,res)=>{
    let{username,email,age,password}=req.body

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let createdUser=await userModel.create({
                username,
                email,
                age,
                password:hash
            })

          let token=  jwt.sign({email},"shhhkdkhdsk")
          res.cookie("token",token)

            res.send(createdUser)
        })
    })
 })
 app.get('/login',(req,res)=>{
    res.render('login')
 })

 app.post('/login',async (req,res)=>{
    let user=await userModel.findOne({email:req.body.email})
    if(!user) return res.send('something is wrong')

    bcrypt.compare(req.body.password,user.password,function(err,result){
       if (result){
        let token=  jwt.sign({email:user.email},"shhhkdkhdsk")
        res.cookie("token",token)
        res.send("Yes you can login Right Now !")
       } 
       else res.send("You cannot login")
    })

 })
 app.get('/logout',(req,res)=>{
     res.cookie("token","")
     res.redirect('/')
 })

app.listen(port,()=>{
    console.log(`Servr is run ${port}`);
})