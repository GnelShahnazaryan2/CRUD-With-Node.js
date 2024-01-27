var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")
var app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connectionString = 'mongodb+srv://gnelsh:gnel.s@cluster0.tdgbjdu.mongodb.net/sample_mflix';


// Connect to MongoDB
mongoose.connect(connectionString, { useUnifiedTopology: true });

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));


app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,'./public/form.html'))
});


app.post("/addInfo",async function(req,res){
    const {name,age,email} = req.body
    console.log("Data:", name,age,email);
   var user =  await mongoose.connection.db.collection('test').insertOne({name:name,age:age,email:email})
    res.redirect("/");
})




app.listen(3000, function(){
   console.log("Example is running on port 3000");
});


  




// Replace the connection string with your MongoDB connection string

// db.once('open', async () => {
// console.log('Connected to MongoDB!');

// const user = await mongoose.connection.db.collection('users').updateOne({name:"Gnel"},{$set:{name:'Valod'}})

// // console.log(user);


// // await mongoose.connection.db.collection('users').findOneAndDelete({name:"Valod"})
// // const allUsers = await mongoose.connection.db.collection('user').find().toArray()

// // console.log("All Movies:",allUsers)

// // You can add additional code here for testing or other operations
// // Make sure to close the connection when you're done
// mongoose.connection.close();
// });



