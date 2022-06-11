const express=require('express');

const path=require('path');
const cookie=require('cookie-parser');
const app=express();
const session=require('express-session');
const flash=require('connect-flash');
const { resolve6 } = require('dns');
const MongoDbStore=require('connect-mongodb-session')(session);
app.use(express.json())
app.use(cookie());

app.use(session({
    secret:"this is my scret",
    cookie:{maxAge:3*24*60*60*60},
    resave:false,
    saveUninitialized:false,

}))

app.use(flash());
//template engine 
app.set('view engine','ejs');
app.set('views','views')
// static files
app.use(express.static(path.join(__dirname,'./public/css')));
app.use(express.static(path.join(__dirname,'./public/images')));
app.use(express.urlencoded({extended:false}));
app.use('/',require('./routes/authRoute'));








app.listen(5000,()=>{
    console.log('server ymchi');
});

