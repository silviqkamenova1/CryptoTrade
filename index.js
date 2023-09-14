const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose')

const routes = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs')

app.use('/static',express.static('public'))
app.use(express.urlencoded({extended: false}))//to parse data from sended forms with post request
//which will be parsed and recived in req.body like object
app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/crypto')

app.listen(3000, () => 'Server is running on port 3000...')