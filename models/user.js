const  mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/Auth-Sher')
.then(()=>{console.log("Db is conneted");})

const userSchema=mongoose.Schema({
   username:String,
   email:String,
   password:String,
   age:Number
})

module.exports=mongoose.model('User',userSchema)