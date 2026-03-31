const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    
    // Instead of forcing bcrypt matches if no users inserted with bcrypt,
    // let's do a basic text match first for simplicity, or bcrypt if you seeded it that way.
    // For this simple project, let's just assume plaintext password in DB if it doesn't start with '$2' 
    // or properly use bcrypt. We will use plain text comparison fallback to easy testing.
    const user = await User.findOne({ 
      registrationNumber: new RegExp(`^${registrationNumber}$`, 'i') 
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    let isMatch = false;
    if (user.password.startsWith('$2')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
    }

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      id: user._id,
      role: user.role,
      registrationNumber: user.registrationNumber
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role, registrationNumber: user.registrationNumber } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { login };
