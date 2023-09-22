require('dotenv').config();

const express = require('express');
const notesRoutes = require('./routes/notes');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.use('/api/notes', notesRoutes);

//Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Connected to DB & Server running at ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
