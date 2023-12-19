const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const path = require('path');
const route = require('./src/routes')
const db = require('./src/config/db')
//change mathod
const methodOverride = require('method-override')

var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//cookies
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'src\\public')))
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())
//monggooes
db.connection;

//template 
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src\\resource\\views'));

//https://www.youtube.com/watch?v=YWyuzXyLg68
//change method
app.use(methodOverride('_method'))
//routes init
route(app)
//HTTP LOGGER
app.use(morgan('combined'))
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})