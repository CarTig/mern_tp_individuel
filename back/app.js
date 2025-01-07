const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors({origin:"http://localhost:5175"}));

const PORT = 8080;

const mongoose = require("mongoose");
mongoose
    //VERSION SANS DOCKER : .connect("mongodb://127.0.0.1:27017/mern_tp_individuel", {})
    .connect("mongodb://mongodb:27017/mern_tp_individuel", {})//VERSION AVEC DOCKER
    .then(() => {
        console.log("Connecté à la base MongoDB !");
    })
    .catch((erreur) =>{
        console.log("Erreur lors de la connexion avec la base de données MongoDB");
        process.exit();
    });

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});