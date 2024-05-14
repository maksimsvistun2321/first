const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/square', (req, res) => {
    const number = parseInt(req.query.number);
    const square = Math.pow(number,2)
    res.send({ result: square });
});

app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
