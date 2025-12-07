const fs = require('fs');
const { get } = require('http');
const path = require('path');

const dbPath = path.join(__dirname, 'inventory.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

let collections = {
    getAll: function() {
        const db = readDB();
        return db;
    },
    addItem: function(item) {
        const db = readDB();
        let maxId = 0;
        db.forEach(i => {
            if (i.productId > maxId) {
                maxId = i.productId;
            }
        });
        item.productId = maxId + 1;
        db.push(item);
        writeDB(db);
    },
    findById: function(id) {
        const db = readDB();
        return db.find(item => item.productId == id);
    },
    deleteById: function(id) {
        const db = readDB();
        const updatedDb = db.filter(item => item.productId != id);
        writeDB(updatedDb);
    },
    updateById: function(id, updatedItem) {
        const db = readDB();
        const index = db.findIndex(item => item.productId == id);
        if (index === -1) {
            return null; // not found
        }   
        // Prevent changing the id and merge updates
        const existing = db[index];
        db[index] = { ...existing, ...updatedItem, productId: existing.productId };
        writeDB(db);
    }   
};

module.exports = collections;

