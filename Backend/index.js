const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');
const config = require('./config');
const port = process.env.PORT || 5000;

const apiRouter = require('./router/api');


const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.set('jwtScretCode',config.secret);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false }));
if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}


app.use('/api',apiRouter);

app.get('/*',(req,res)=> {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
});

mongoose.connect(config.mongodbUri, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {console.log("connected MongoDB server")});