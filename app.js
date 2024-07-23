require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const bodyParser = require('body-parser');
const { sequelize,syncDb } = require('./models');

const pingRoutes = require('./routes/pingRoutes');  
const signupRoutes = require('./routes/signupRoutes');  
const verifyOtpRoutes = require('./routes/verifyOtpRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/api', pingRoutes);  
app.use('/api', signupRoutes);
app.use('/api', verifyOtpRoutes);

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
