const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
const dbConnection = require('./config/db');
const userModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.send("Now We Are On About Page.")
})
app.get('/contact', (req, res) => {
    res.send("Contact Us.")
})
app.get('/register', (req, res) => {

    res.render("register")
})


// Create User
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    const newuser = await userModel.create({
        username: username,
        email: email,
        password: password
    })

    res.send(newuser)
})


// Read User
app.get("/get-user", (req, res) => {
    // userModel.find().then((users) => {
    //     res.send(users)
    // })
    userModel.findOne({
        username:'jack'
    }).then((user) => {
        console.log(user)
        res.send(user)
    })
})

// Update User
app.get("/update",async(req,res)=>{
    await userModel.findOneAndUpdate({
        email:"joe@gmail.com"
    },{
        username:"Joe"
    })

    res.send("User Update.")
})

// Delete User
app.get("/delete", async (req,res)=>{
    await userModel.findOneAndDelete({
        username:""
    })
    res.send("User Deleted.")
})

app.post('/get-form-data', (req, res) => {
    console.log(req.body)
    res.send("Data Recevied")
})

app.listen(3000);