const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const arp = require('node-arp');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api', (req, res) => {
    console.log(req.body);
    res.status(200).send('OK');
});

app.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.redirect('/success.html');

    let data = {
        name: req.body.nameField,
        room: Number.parseInt(req.body.roomField),
        description: req.body.contentField,
        ip: req.ip
    };

    // if (req.ip.startsWith('172.24.')) {
        arp.getMAC(req.ip, (err, mac) => {
            if (err) {
                console.error(err);
            } else {
                data.mac = mac;
                console.log(data);
            }
        });
    // } else {
    //     console.log(data);
    // }
    
});

app.listen(3000, '0.0.0.0', () => console.log('Successfully started server!'));
