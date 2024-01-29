var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")
var app = express();
const mongoose = require('mongoose');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connectionString = 'mongodb+srv://gnelsh:gnel.s@cluster0.tdgbjdu.mongodb.net/Tumo_products';


// Connect to MongoDB
mongoose.connect(connectionString, { useUnifiedTopology: true });

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));


app.use(express.static("public"));

const Schema = mongoose.Schema;



app.get("/", function (req, res) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        const userSchema = new Schema({
            name: {
              type: String,
              required: true
            },
            email: {
              type: String,
              required: true,
              unique: true
            },
            password: {
              type: String,
              required: true
            }
          
          });
            res.render("../public/form.ejs", {
                obj: result
           
    });
});


app.post("/addInfo", async function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('test').insertOne({
                name: name,
                email: email,
                password: password
            })
            res.json(result);

        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }


    })
})



app.listen(3000, function () {
    console.log("Example is running on port 3000");
});











})
