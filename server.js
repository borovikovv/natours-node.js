const app = require('./app');

const port = 2000;

app.listen(port, () => {
    console.log(`App run to port ${port}...`);
});