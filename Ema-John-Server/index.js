const express = require('express')
let cors = require("cors");
require('dotenv').config()
const app = express()

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruhvmdy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // DB COLLECTIONS 
        const productsCollection = client.db("EmaJohn").collection("productCollection");
        const cartCollection = client.db("EmaJohn").collection("cartDataCollection");

        // API ENDPOINTS 
        // GET PRODUCT DATA 
        app.get('/products', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const result = await productsCollection.find().skip(page * size).limit(size).toArray();
            res.send(result);
        })

        // POST CART DATA 
        app.post("/cartData", async (req, res) => {
            const cart = req.body;
            const result = await cartCollection.insertOne(cart);
            res.send(result);
        });
        // GET ALL CART DATA 
        app.get("/cartData", async (req, res) => {
            const result = await cartCollection.find().toArray();
            res.send(result);
        });
        // DELETE ALL CART DATA 
        app.delete("/cartData", async (req, res) => {
            const result = await cartCollection.deleteMany({});
            res.send(result);
        });

        // GET TOTAL AMOUNT OF PRODUCTS 
        app.get("/productCount", async (req, res) => {
            const count = await productsCollection.estimatedDocumentCount();
            res.send({ count });
        })


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})