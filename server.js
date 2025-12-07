const express  = require('express');


const app      = express();
const db       = require('./db-helper');
const Port     = 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to Express Inventory Management System');
});

app.get('/getProducts', (req, res) => {
    const items = db.getAll();
    res.json(items);
});
app.post('/addProduct', (req, res) => {
    const newItem = req.body;
    db.addItem(newItem);
    res.status(201).json(newItem);
});
app.get('/inventory/:id', (req, res) => {
    const item = db.findById(req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});
app.put('/updateProduct/:id', (req, res) => {
    const updatedItem = req.body;
    db.updateById(req.params.id, updatedItem);
    res.json(updatedItem);
});
app.delete('/deleteProduct/:id', (req, res) => {
    db.deleteById(req.params.id);
    res.status(204).send();
});





app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});