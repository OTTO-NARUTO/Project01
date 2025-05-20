const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ firstName, lastName, email, password: hashedPassword });

  res.status(201).json(user);
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ ...user._doc, token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

module.exports = { registerUser, loginUser, getAllUsers };
