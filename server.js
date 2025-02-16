const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.join(__dirname, 'numbers.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const isValidPhoneNumber = (number) => {
    const cleanedNumber = number.replace(/\D/g, '');
    return cleanedNumber.length === 10;
};

const readNumbers = () => {
    if (!fs.existsSync(FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
};

const saveNumber = (number) => {
    const numbers = readNumbers();
    numbers.push(number);
    fs.writeFileSync(FILE_PATH, JSON.stringify(numbers, null, 2));
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const { number } = req.body;

    if (!number || !isValidPhoneNumber(number)) {
        return res.status(400).json({ error: 'Número inválido! Por favor, digite exatamente dez caracteres.' });
    }

    saveNumber(number);
    res.json({ message: 'Número enviado com sucesso!' });
});

  
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
