require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const bodyParser = require('body-parser');
const { sequelize,syncDb } = require('./models');
const cors = require('cors');

const pingRoutes = require('./routes/pingRoutes');  
const signupRoutes = require('./routes/signupRoutes');  
const verifyOtpRoutes = require('./routes/verifyOtpRoutes');
const authRoutes = require('./routes/authRoutes');
const mobileOtpRoutes = require('./routes/mobileOtpRoutes');


const errorHandler = require('./middlewares/errorHandler');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());




app.use(cors({
  origin: 'http://localhost:3000' ,
  credentials: true
}));


// Express session
app.use(session({
  secret: 'feature1234',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


// passport middleware
app.use(passport.initialize());
app.use(passport.session());






app.use('/api', pingRoutes);  
app.use('/api', signupRoutes);
app.use('/api', verifyOtpRoutes);
app.use('/api', mobileOtpRoutes);
app.use('/auth', authRoutes);
// app.use('/api', loginRoutes); 





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
