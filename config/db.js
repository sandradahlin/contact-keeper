const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDb = () => {
    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(() => console.log("Connected to db"))
        .catch((err) => {
            console.error(err.message);
            process.exit(1);
        });
};

module.exports = connectDb;
