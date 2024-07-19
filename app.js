require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const { sequelize, syncDb } = require('./models');

const pingRoutes = require('./routes/pingRoutes');  
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/api/ping', pingRoutes);  

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await syncDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
