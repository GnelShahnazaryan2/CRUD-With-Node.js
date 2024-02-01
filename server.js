var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")
var app = express();
const mongoose = require('mongoose');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connectionString = 'mongodb+srv://gnelsh:gnel.s@cluster0.tdgbjdu.mongodb.net/Tumo_products';

app.use(express.static("public"));

app.get("/", function (req, res) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('Products').find().toArray()
            res.render('../public/form.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
})


app.post("/addInfo", async function (req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const img = req.body.img;
    const des = req.body.description;
    const uuid = req.body.UUID;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('products').insertOne({
                name: name,
                price: price,
                image: img,
                description: des,
                uuid: uuid
            })
            // console.log(result);
            res.redirect('/')
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
