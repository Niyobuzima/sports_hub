const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const { createRegistration } = require('../models/registration.model');
const { signToken } = require('../utils/token');

async function register(req, res, next) {
  try {
    const { full_name, email, password, role, category_id } = req.body;

    // only customers and instructors can self-register
    const roleName = role === 'instructor' ? 'instructor' : 'customer';
    const roleRow = await userModel.getRoleByName(roleName);

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({
      full_name,
      email,
      password_hash,
      role_id: roleRow.id,
    });

    await createRegistration({ user_id: user.id, category_id });

    res.status(201).json({
      message: 'Registration submitted. Waiting for admin approval.',
      user: { id: user.id, email: user.email, status: user.account_status },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.account_status !== 'active') {
      return res
        .status(403)
        .json({ error: `Account is ${user.account_status}. Please contact admin.` });
    }

    const full = await userModel.findById(user.id);
    const token = signToken(full);
    res.json({ token, user: full });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me };
