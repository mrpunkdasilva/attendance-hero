const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require('./Routes/User');

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

const swaggerSetup = require('./swagger');
swaggerSetup(app);

module.exports = app;
