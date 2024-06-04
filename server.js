require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const bookRoutes = require("./routes/bookRoutes")

const {jwtAuthMiddleware} = require("./jwt");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);

app.use("/api/book",jwtAuthMiddleware, bookRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
