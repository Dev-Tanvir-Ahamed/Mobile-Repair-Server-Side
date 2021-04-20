const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()
let ObjectId = require('mongodb').ObjectId

console.log(process.env.DB_NAME);

let a = 'mobileRepair75'
let b = 'mobileRepair'

const port = 5000


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vfulx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const repairCollection = client.db("mobile-repair").collection("repair-products");
  // perform actions on the collection object
 

  app.post('/addService', (req, res) => {
    let service = req.body
    console.log(service);
    repairCollection.insertMany(service)
    .then(result => {
      console.log(result.insertedCount);
        res.send(result.insertedCount > 0)
    })
  })

  app.get('/addservices', (req, res) => {
  
    repairCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })

  app.get('/services/:id', (req, res) => {
    let id = req.params.id
    repairCollection.find({_id:ObjectId(id)})
    .toArray((err, documents) => {
      res.send(documents[0])
    })
  })
//   client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)