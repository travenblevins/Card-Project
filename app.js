const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const app = express();
app.use(express.json());
const cardsData = require('./cards.json');
const cards = cardsData.cards;
const users = require('./users.json');
const secret = 'secret'


app.get('/', (req, res) => {
    res.send(cards)
})


//Read certain cards
app.get('/cards', (req, res) => {
    const { set, type, rarity } = req.query; // Using query parameters
    const card = cards.find(card => 
        card.set === set &&
        card.type === type &&
        card.rarity === rarity
    );
    if (!card) {
        return res.status(404).json({ error: 'Card not found' });
    } else {
        res.json(card);
    }
});


//Login
app.post('/login', (req, res) => {
    const { userId, password } = req.body;
    const user = users.find((user) => user.userId === userId);
    if (!user || user.password !== password) {
        return res.status(401).end({ error: 'Invalid user ID or password' });
    }

    const token = jwt.sign({ userId: user.userId }, secret, {
        algorithms: 'HS256',
        expiresIn: '2m',
    })

    res.json({ token: token });
})

// Create a card
app.post('/cards/create', expressjwt({ secret: secret, algorithms: ["HS256"] }), (req, res) => {
    const card = req.body;
    const cardId = req.body.cardId;
    const existingCard = cards.find((card) => card.cardId === cardId);
    if(existingCard) {
        return res.status(409).end();
    } else {
        cards.push(card);
        res.status(201).end();
    }
})

// Update a card
app.post('/cards/update', expressjwt({ secret: secret, algorithms: ["HS256"] }), (req, res) => {
    const card = req.body;
    const cardId = req.body.cardId;
    const existingCard = cards.find((card) => card.cardId === cardId);
    if(!existingCard) {
        return res.status(404).end();
    } else {
        cards.push(card);
        res.card(existingCard, 1);
        res.status(204).end();
    }
})

// Delete a card
app.post('/cards/delete', expressjwt({ secret: secret, algorithms: ["HS256"] }), (req, res) => {
    const card = req.body;
    const cardId = req.body.cardId;
    const cardtoDelete = cards.find((card) => card.cardId === cardId);
    if(cardtoDelete) {
        cards.splice(cardtoDelete, 1);
        res.status(204).end();
    } else {
        return res.status(404).end()
    }
})

app.listen(3000, () => {
    console.log('Server is running');
})