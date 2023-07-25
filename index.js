const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.argv[2] || 3000;

app.use(express.json());


const homeNumber = process.argv[3] || 'home1';

// Function to simulate asynchronous operations
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomRoomNumber = () => Math.floor(Math.random() * 4) + 1;

const sendRequest = async (method, endpoint, payload=null) => {
    const url = `http://127.0.0.1:8000${endpoint}`;
    let response;
    try {
        if (method === 'GET') {
            response = await axios.get(url);
        } else {
            response = await axios.post(url, payload);
        }

        console.log(`${method} request sent to ${url}. Response: ${response.data.message}`);
    } catch (err) {
        console.error(`Error sending ${method} request to ${url}: ${err.message}`);
    }
};

// Function to send a random action to the backend
const sendRandomAction = () => {
    const actions = [
        () => sendRequest('GET', `/${homeNumber}/smoke?room=room${getRandomRoomNumber()}`),
        () => sendRequest('GET', `/${homeNumber}/pillNotTaken`),
    ];
    const randomActionIndex = Math.floor(Math.random() * actions.length);
    actions[randomActionIndex]();
};

// Routes to handle received requests
app.get('/mowLawn', (req, res) => {
    console.log('Received request to start mowLawn');
    delay(10000).then(() => sendRequest('GET', `/${homeNumber}/mowed`));
    res.send('the mower is on its way.');
});

app.get('/vacuum', (req, res) => {
    const {room} = req.query;
    console.log(`Received request to start vacuum in room ${room}`);
    delay(5000).then(() => sendRequest('GET', `/${homeNumber}/vacuumed?room=${room}`));
    res.send('the vacuum cleaner is on its way.');
});

app.post('/dispense', (req, res) => {
    console.log('Received request to dispense pills');
    sendRequest('POST', `/${homeNumber}/dispensed`, req.body)
        .then(() =>{res.send('pills are dropped.')});
});





// send random events to backend
setInterval(sendRandomAction, 15000);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
