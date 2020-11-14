const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello from server side', app: "natours"});
})

const port = 2000;

app.listen(port, () => {
    console.log(`App run to port ${port}...`);
});