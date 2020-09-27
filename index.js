const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID

const pssword ='55**..22'

const uri = "mongodb+srv://myAdmin:55**..22@cluster0.nmory.azure.mongodb.net/mongodb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true ,  useUnifiedTopology: 
    true  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



client.connect(err => {
  const productCollection = client.db("mongodb").collection("myAdmin");

app.get('/products', (req, res) => {
    productCollection.find({})
    .toArray((err,document) => {
        res.send(document);
    })
})
app.get('/products/id', (req, res) => {
    productCollection.find({_id: ObjectId(req.params.id)})
    .toArray((err,documents) => {
        res.send(documents [0]);
})
})
  app.post("/addProduct",(req, res) =>{
      const product = req.body;
     productCollection.insertOne(product)
     .then((result) =>{
         console.log('data added successfullt');
         res.redirect('/')
     })
  })

  app.patch('/update/:id', (req, res) => {
    productCollection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {price: req.body.price, quantity: req.body.quantity}
    })
    .then (result => {
      res.send(result.modifiedCount > 0)
    })
  })

  app.delete('/delete/:id', (req, res) =>{
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then( result => {
        res.send(result.deletedCount >0);
    })

})

    const product={ name: "Kola" , price:259}
    app.post("/addProduct", (req, res) => {

        collection.insertOne(product)
  .then(result =>{
      console.log('one product');
  })

    })
  
    console.log('database connection');
    });


app.listen(4000);