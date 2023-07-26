# IOT final poject - Smart home for elderly
### SIAMAK SEIFI - 5269080

## Usage
First, you need to run the [smart-home-backend](https://github.com/siamackSeifi/smart-home-backend.git) service:
Then, for the backend to recognize you, run the following command in mongodb shell:
(You need to change the ``PORT`` and ``NAME`` based on your need)

`use sHome;`

`db.getCollection("Home").insertOne({
endpoint: "http://127.0.0.1:PORT",
home: "NAME",
userId: 123456789,
careGiverId: 987654321,
rooms: [{name: "room1"}, {name: "room2"}, {name: "room3"}, {name: "room4"}, {name: "room5"}]
});
`

after that, you need to do the following:
1. `npm install`
2. `node index.js`

You can also set the ``PORT`` and ``NAME`` of the gateWay simulator by the following command:

`node index.js PORT NAME`

For example:
`node index.js 3001 home2`

The default values of port and home are: 3000, home1