require('dotenv').config
const express = require('express');
const { sql } = require("./db.js");

const app = express();

const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
    const getBuildings = async () => {
        const buildings = sql`SELECT * FROM buildings`;

        console.log(buildings);

        return buildings;
    };

    getBuildings();
    
    res.end();
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});