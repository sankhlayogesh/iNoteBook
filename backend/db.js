const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0:27017/inotebook"; //mydatabase //"mongodb://localhost:27017/inotebook"

const connectTOMongo =  async () => {

    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }

    // mongoose.connect(mongoURI,{useNewUrlParser: true }  , (err)=> {
    //     if (err) {
    //         console.error('Error connecting to MongoDB:', err);
    //         } else {
    //         console.log('Connected to MongoDB successfully');
    //         }
    // });

}

module.exports = connectTOMongo;