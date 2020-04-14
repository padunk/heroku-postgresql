const express = require("express");
const path = require("path");
const bp = require("body-parser");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/db", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM test_table");
        const response = { results: result ? result.rows : null };
        res.send(JSON.stringify(response));
    } catch (error) {
        console.error(error);
        res.send("Error: " + error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
