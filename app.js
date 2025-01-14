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


// Login
app.post('/login', (req, res) => {
    const { userId, password } = req.body;
    const user = users.find((user) => user.userId === userId);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid user ID or password' });  // Use res.json instead of res.end for JSON response
    }
    const token = jwt.sign({ userId: user.userId }, secret, {
        algorithm: 'HS256',  // Ensure "algorithm" is singular, not "algorithms"
        expiresIn: '10m',
    });
    res.json({ token: token });  // Properly return the token as a JSON object
});


// Create a card
app.post('/cards/create', expressjwt({ secret: secret, algorithms: ["HS256"] }), (req, res) => {
    const card = req.body;
    const cardId = req.body.cardId;
    const existingCard = cards.find((card) => card.cardId === cardId);
    if (existingCard) {
        return res.status(409).end();
    } else {
        cards.push(card);
        res.status(201).end();
    }
})

app.post('/cards/update', expressjwt({ secret: secret, algorithms: ["HS256"] }), (req, res) => {
    const { cardId, cardName, cardType, cardHolder, expiryDate } = req.body;
    const existingCard = cards.find((card) => card.cardId === cardId);
    if (!existingCard) {
        return res.status(404).json({ error: 'Card not found' });
    }
    // Update card details
    existingCard.cardName = cardName || existingCard.cardName;
    existingCard.cardType = cardType || existingCard.cardType;
    existingCard.cardHolder = cardHolder || existingCard.cardHolder;
    existingCard.expiryDate = expiryDate || existingCard.expiryDate;
    res.status(200).json({ message: 'Card updated successfully', card: existingCard });
});


// Delete a card
app.post('/cards/delete', expressjwt({ secret: secret, algorithms: ["HS256"] }), (req, res) => {
    const cardId = req.body.cardId;
    const cardtoDelete = cards.find((card) => card.cardId === cardId);
    if (cardtoDelete) {
        cards.splice(cardtoDelete, 1);
        res.status(204).end();
    } else {
        return res.status(404).end()
    }
})

app.listen(3000, () => {
    console.log('Server is running');
})