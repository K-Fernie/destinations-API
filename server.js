//TODO - Create a package.json file using npm init
//this file will manage your dependencies
"use strict";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient, ObjectId } from "mongodb";
import { filterDestinations } from "./helper.js";

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

MongoClient.connect(CONNECTION_STRING)
  .then(async (client) => {
    console.log("Connected to database");
    const db = client.db("destinations");
    const cardCollection = db.collection("destination-cards");

    app.get("/", async (req, res) => {
      await db
        .collection("destination-cards")
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.send(results);
        })
        .catch((error) => console.error(error));
    });

    app.post("/destinations", (req, res) => {
      //req.body
      cardCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/destinations/remove:id", (req, res) => {
      //handle delete event here
      cardCollection
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then((result) => {
          res.json("Destination deleted");
        })
        .catch((error) => console.error(error));
    });

    app.put("/destinations", (req, res) => {
      cardCollection
        .findOneAndUpdate(
          { _id: ObjectId(req.body._id) },
          {
            $set: {
              destination: req.body.destination,
              location: req.body.location,
              description: req.body.description,
              photo: req.body.photo,
            },
          },
          {
            upsert: false,
          }
        )
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

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
