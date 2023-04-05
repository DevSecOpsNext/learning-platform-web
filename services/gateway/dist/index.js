import express from 'express';
const app = express();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
});
app.listen(port, () => {
    console.log(`⚡️[gateway]: running at http://localhost:${port}`);
});
