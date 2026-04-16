const mongoose=require('mongoose');
const connection = mongoose.connect('mongodb://0.0.0.0/mongodb').then(()=>{
    console.log("Connected To DataBase")
})

module.exports=connection   

