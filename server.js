const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const router = express.Router();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create a new user
router.post('/api/users', async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    // Check if a user with the same email or phone number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (existingUser) {
      return res.status(400).json({ message: 'This data is already stored in the database.' });
    }

    // If no duplicate is found, create a new user
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
const mongodbUri = process.env.MONGODB_URI;



mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Routes and other server logic...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;



























// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Routes
// app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 5000;
// const mongodbUri = process.env.MONGODB_URI;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


// mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.use(cors());
// app.use(express.json());

// // Routes and other server logic...

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });