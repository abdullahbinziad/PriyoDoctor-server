const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");

const app = express();
const port = 3000;
require("dotenv").config();
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

const cors = require("cors");

app.use(cors(corsConfig));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//mongo db started

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kzkelcj.mongodb.net/?retryWrites=true&w=majority`;

// const uri ='mongodb://localhost:27017/content'

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    const doctorsCollection = client.db("PriyoDoctorsDb").collection("doctors");
    const slotsCollection = client.db("PriyoDoctorsDb").collection("slots");
    const usersCollection = client.db("PriyoDoctorsDb").collection("users");
    const appointmentsCollection = client.db("PriyoDoctorsDb").collection("appointments");

  

  

//for doctors 


 app.get("/doctors", async (req, res) => {
  const filter= req.query;
console.log(filter);
  let query= {}
  if(filter && filter.speciality){
    query= {speciality: filter.speciality} ;
  }

const result = await doctorsCollection.find(query).toArray();
res.send(result);
     });
 //get a doctors single Data
 app.get("/doctors/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await doctorsCollection.findOne(query);
    res.send(result);
  });
  //post single doctors
  app.post("/doctors/", async (req, res) => {
    const data = req.body;

    const result = await doctorsCollection.insertOne(data);
    res.send(result);
  });
  //post Delete doctors
  app.delete("/doctors/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    const result = await doctorsCollection.deleteOne(query);
    res.send(result);
  });

  //update data
  app.put("/doctors/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
 console.log(data);
    const query = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoctor = {
      $set: {
        image: data.image,
        degree: data.degree,
        email: data.email,
        mobile: data.mobile,
        specializations: data.specializations
      },
    };
    const result = await doctorsCollection.updateOne(query, updateDoctor, options);
    res.send(result);
  });


//for all slots
app.get("/slots", async (req, res) => {
//   const filter= req.query;
// console.log(filter);
  let query= {}
  // if(filter && filter.speciality){
  //   query= {speciality: filter.speciality} ;
  // }

const result = await slotsCollection.find(query).toArray();
res.send(result);
     });
 //get a slots single Data
 app.get("/slots/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await slotsCollection.findOne(query);
    res.send(result);
  });
  //post single slots
  app.post("/slots", async (req, res) => {
    const data = req.body;
console.log("slot data", data);
    const result = await slotsCollection.insertOne(data);
    res.send(result);
  });
  //post Delete slots
  app.delete("/slots/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    const result = await slotsCollection.deleteOne(query);
    res.send(result);
  });

  //update data
  app.put("/slots/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
 console.log(data);
    const query = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoctor = {
      $set: {
        image: data.image,
        degree: data.degree,
        email: data.email,
        mobile: data.mobile,
        specializations: data.specializations
      },
    };
    const result = await slotsCollection.updateOne(query, updateDoctor, options);
    res.send(result);
  });




  //for users 
  app.get("/users", async (req, res) => {
  

    const query ={};
 
       const result = await treatmentCollection.find(query).toArray();
 
       res.send(result);
     });
 //get a single Data
 app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.findOne(query);
    res.send(result);
  });
  //post single doctors
  app.post("/users/", async (req, res) => {
    const data = req.body;

    const result = await usersCollection.insertOne(data);
    res.send(result);
  });
  //post Delete doctors
  app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    const result = await usersCollection.deleteOne(query);
    res.send(result);
  });

  //update data
  app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const query = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedToy = {
      $set: {
        price: data.price,
        quantityAvailable: data.quantityAvailable,
        description: data.description,
      },
    };
    const result = await usersCollection.updateOne(query, updatedToy, options);
    res.send(result);
  });




  //for appointments 
  app.get("/appointments", async (req, res) => {
  

    const query ={};
 
       const result = await treatmentCollection.find(query).toArray();
 
       res.send(result);
     });

 //get a single Data
 app.get("/appointments/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await appointmentsCollection.findOne(query);
    res.send(result);
  });
  //post single doctors
  app.post("/appointments/", async (req, res) => {
    const data = req.body;

    const result = await appointmentsCollection.insertOne(data);
    res.send(result);
  });
  //post Delete doctors
  app.delete("/appointments/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };

    const result = await appointmentsCollection.deleteOne(query);
    res.send(result);
  });

  //update data
  app.put("/appointments/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const query = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedToy = {
      $set: {
        price: data.price,
        quantityAvailable: data.quantityAvailable,
        description: data.description,
      },
    };
    const result = await appointmentsCollection.updateOne(query, updatedToy, options);
    res.send(result);
  });






    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});