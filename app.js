const { apply } = require("call-bind");
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance');
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())


app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {

    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("your data has been saved successfully")
    }).catch(() => {
        res.status(400).send("your data is not saved")
    })

    
})

// app.post('/contact', (req, res)=>{
//     var myData = new Contact(req.body);
//     myData.save().then(()=>{
//     res.send("This item has been saved to the database")
//     }).catch(()=>{
//     res.status(400).send("item was not saved to the databse")
// })


app.listen(port, () => {
    console.log(`the application started succesfully on port${port}`)
})
