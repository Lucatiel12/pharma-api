const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes.js');
const essentialMedRoutes = require('./routes/essentialMedRoutes.js');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/essential-medicines', essentialMedRoutes);


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);