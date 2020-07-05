const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const router = require("./routers");
const cors = require("cors");

const http = require("http").createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

module.exports = http;
