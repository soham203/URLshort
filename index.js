const express = require('express');
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const URL = require('./models/url');
const app = express();

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB connected"));

app.use(express.json())

app.use('/url', urlRoute);

app.get('/:shortId', async (req,res) => {
 const shortId = req.params.shortId;
 const entry = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: Date.now() } } });
 res.redirect(entry.redirectURL);
});

app.listen(8080, () => {
    console.log('listining to port 8080');
});