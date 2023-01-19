const mongoose = require('mongoose')

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        // MONGO DB CONNECT
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,})
            .then(async () => { console.log(`Connected MongoDB`) })

    },
};