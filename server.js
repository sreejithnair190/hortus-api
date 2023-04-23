const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Configuring env
dotenv.config({path:'./config.env'})

//Database Connection
if (!process.env.PASSWORD) {
    console.log('Please provide a password in env');
}
const DB = process.env.DATABAse.replace('<password>',process.env.PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser:true
})
.then( con => console.log("Database connection was successful"))
.catch(() => console.log("Database connection was unsuccessful"))

// Starting Server
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`App is running on port ${port}`));
