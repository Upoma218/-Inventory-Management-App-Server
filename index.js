const express = require('express');
const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4cizlao.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run() {
//     try {
//         const patientDetailsCollection = client.db('patientCare').collection('patientDetails');

//         // Patient get api
//         app.get('/details', async (req, res) => {
//             const query = {};
//             const detail = await patientDetailsCollection.find(query).toArray();
//             res.send(detail);
//         })
//         app.get('/details/:id', async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: ObjectId(id) };
//             const result = await patientDetailsCollection.findOne(filter);
//             res.send(result);
//         })
        
//         app.post('/details', async (req, res) => {
//             const detail = req.body;
//             const result = await patientDetailsCollection.insertOne(detail);
//             res.send(result);

//         });

//         // // Edit Patient api
//         app.put('/editInfo/:id', async (req, res) => {
//             const id = req.params.id;
//             const info = req.body;
//             console.log(info)
//             const filter = { _id: ObjectId(id) };
//             const options = { upsert: true };
//             const updatedDoc = {
//                 $set : {
//                     email: info.email,
//                     phone: info.phone,
//                     address: info.address,
//                     disease: info.disease,
//                     condition: info.condition,
//                 }
//             }
//             const result = await patientDetailsCollection.updateOne(filter, updatedDoc, options);
//             res.send(result)
//         })

//         // // delete patient
//         app.delete('/details/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const result = await patientDetailsCollection.deleteOne(query);
//             // console.log(result);
//             res.send(result);
//         })
//     }
//     finally {

//     }
// }
// run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Inventory management app is running now on port 5000');
});

app.listen(port, () => {
    console.log(`Inventory management app is running on the ${port}`);
})