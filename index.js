const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4cizlao.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const itemsCollection = client.db('InvestoryManagement').collection('items');

        // Items get api
        app.get('/items', async (req, res) => {
            const query = {};
            const item = await itemsCollection.find(query).toArray();
            res.send(item);
        })
        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await itemsCollection.findOne(filter);
            res.send(result);
        })

        app.post('/items', async (req, res) => {
            const item = req.body;
            const result = await itemsCollection.insertOne(item);
            res.send(result);

        });

        // Edit item api
        app.put('/editInfo/:id', async (req, res) => {
            const id = req.params.id;
            const info = req.body;
            console.log(info)
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: info.name,
                    date: info.date,
                    owner: info.owner,
                    vendor: info.vendor
                }
            }
            const result = await itemsCollection.updateOne(filter, updatedDoc, options);
            res.send(result)
        })

        // delete item
        app.delete('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemsCollection.deleteOne(query);
            // console.log(result);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Inventory management app is running now on port 5000');
});

app.listen(port, () => {
    console.log(`Inventory management app is running on the ${port}`);
})