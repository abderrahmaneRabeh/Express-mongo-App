import { MongoClient } from "mongodb";

const url ="mongodb+srv://devowfs205:test205@project-express-mongo.xnj0bzm.mongodb.net/?retryWrites=true&w=majority&appName=project-express-mongo";

const client = new MongoClient(url);

const mainConnection = async () => {
  try {
    // first thigs we do is connect to the database
    await client.connect(); 
    console.log("Connected to MongoDB");

    // chose the database  that we want to connect to
    const db = client.db("stagiaires"); 

    // chose the collection that we want to interact with
    const collection = db.collection("stagiaire"); 


    //insert into the collection data 
    
    // collection.insertOne({
    //     "nom": "fatima",
    //     "prenom": "rodrigo",
    //     "age": 21,
    //     "option": "front-end"
    // })

    // show data from the collection as an array
    const data = await collection.find().toArray(); 

    console.log("data : ", data);
  } catch (error) {
    console.log(error);
  }
};

mainConnection();
