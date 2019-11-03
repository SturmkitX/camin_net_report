const arp = require('node-arp');
const AWS = require('aws-sdk');

exports.handler = async event => {
    let data = {
        name: event.body.name,
        room: event.body.room,
        description: event.body.description,
        ip: event.requestContext.identity.sourceIp,
        mac: null
    };

    arp.getMAC(event.requestContext.identity.sourceIp, (err, mac) => {
        if (err) {
            console.error(err);
        } else {
            data.mac = mac;
            console.log(data);

            const dynamo = new AWS.DynamoDB();
            const params = {
                Item: {
                    'id': {
                        N: new Date().getTime()
                    },
                    'room': {
                        S: event.body.room || 'Unspecified'
                    },
                    'name': {
                        S: event.body.name || 'Unspecified'
                    },
                    'description': {
                        S: event.body.description || 'Unspecified'
                    },
                    'ip': {
                        S: event.requestContext.identity.sourceIp
                    },
                    'mac': {
                        S: mac
                    }
                },
                TableName: 'net-report-table'
            };

            dynamo.putItem(params, (err, data) => {
                if (err) {
                    console.error(err, err.stack);
                } else {
                    console.log(data);
                }
            });
        }
    });

    return {
        statusCode: 200,
        body: 'OK'
    }
};
