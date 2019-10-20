const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('Congrats');
});

app.listen(3000, '0.0.0.0', () => console.log('Successfully started server!'));
