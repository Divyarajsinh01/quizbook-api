const mongoose = require('mongoose')

const URL = 'mongodb://127.0.0.1:27017/user'

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.error('Error connecting to the database:', error);
})