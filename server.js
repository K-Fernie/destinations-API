//TODO - Create a package.json file using npm init
//this file will manage your dependencies
"use strict";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { filterDestinations } from "./helper.js";

//INTERNAL DB MEMORY
// const destinationsDB = {
//   12345: {
//     destination: "Eiffel Tower",
//     location: "Paris",
//     description: "",
//     photo:
//       "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   },
//   123456: {
//     destination: "Champs elysees",
//     location: "France",
//     description: "",
//     photo:
//       "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   },
//   12345678: {
//     destination: "Big Ben",
//     location: "London",
//     description: "",
//     photo:
//       "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
//   },
// };

//TODO- install express with npm install express --save
//TODO- create the app variable
const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING =
  "mongodb+srv://K_Fernie:Violanerd12!@cluster0.8tlotgd.mongodb.net/?retryWrites=true&w=majority";

//Middleware Setup
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//TODO- establish a listener (via a port)
//TODO - make the port variable so that it works no matter where it's called

//Listen on the port, the result of a successful call will be to cl the listening function
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

MongoClient.connect(CONNECTION_STRING).then((client) => {
  console.log("Connected to database");
  const db = client.db("destinations");
  const cardCollection = db.collection("destination-cards");

  app.get("/", (req, res) => {
    //const city = req.query.city;
    //update function to iterate over the results array and return a filtered array

    cardCollection
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
        res.send(results);
      })
      .catch((error) => console.error(error));
  });

  app.post("/destinations/addCard", (req, res) => {
    //req.body
    cardCollection
      .insertOne(req.body)
      .then((result) => {
        console.log(result);
        res.redirect("/destinations");
      })
      .catch((error) => console.error(error));
  });
});

//TODO - create an app.get that gets the contents of the index.js and returns them to the site
// app.get("/destinations", (req, res) => {
//   const city = req.query.city;
//   filterDestinations({ city, destinationsDB, res });
// });

// //GET /destinations/city/:myCity
// app.get("/destinations/city/:myCity", (req, res) => {
//   //log the city passed in the url as a named route parameter
//   const city = req.params.myCity;
//   filterDestinations({ city, destinationsDB, res });
// });

//POST /destinations
//Needs/receives{destination, location, description}
//BOTH location and destination are required
//description is optional
