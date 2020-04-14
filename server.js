const express = require("express");
const path = require("path");
const bp = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
