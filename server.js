//TODO - Create a package.json file using npm init
//this file will manage your dependencies
"use strict";
import express from "express";
import cors from "cors";

const destinationsDB = {
  123456: {
    destination: "Eiffel Tower",
    location: "Paris",
    photo:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  234567: {
    destination: "Big Ben",
    location: "London",
    photo:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
};

//TODO- install express with npm install express --save
//TODO- create the app variable
const app = express();
app.use(cors());
//TODO- establish a listener (via a port)
//TODO - make the port variable so that it works no matter where it's called

const PORT = process.env.PORT || 3000;

//Listen on the port, the result of a successful call will be to cl the listening function
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//TODO - create an app.get that gets the contents of the index.js and returns them to the site
app.get("/", (req, res) => {
  res.send(destinationsDB);
});

app.post("/", (req, res) => {
  destinationsDB[234568] = {
    destination: "Tokyo",
    location: "Japan",
    photo: "none",
  };
});
