const express = require("express");
const mongoose = require("mongoose");
const CardSchema = require("./schema/cards");
const Cors = require("cors");

// App Config
const app = express();
const port = process.env.PORT || 8001;
const mongo_user_name = "admin";
const mongo_password = "AGHTVwSaKbUXZ4Ym";
const mongo_db_name = "tinder_clone_db";
const connection_url = `mongodb+srv://${mongo_user_name}:${mongo_password}@cluster-1.n6dht.mongodb.net/${mongo_db_name}?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoints
// 1. Root URL
app.get("/", (req, res) => res.status(200).send("Hello World!!"));
// 2. Add data to database
app.post("/tinder/cards", (req, res) => {
  const db_card = req.body;
  CardSchema.create(db_card, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
// 3. Get data from Database
app.get("/tinder/cards", (req, res) => {
  CardSchema.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost -> ${port}`));
