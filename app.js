const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const indexRoute = require("./routes/index.route");
const jwt = require('jsonwebtoken');

app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/demo", indexRoute);




// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
