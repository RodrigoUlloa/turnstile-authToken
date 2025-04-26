const express = require('express');
const { Router } = express;
const path = require('path');
const { getToken } = require('../services/token-generator');
// me deja la zorra aveces el pretier xd
const {
  verifyTurnstileToken,
  authenticateUser,
} = require('../services/auth/auth-service');

const router = Router();

router.get('/token', async (req, res) => {
  try {
    const token = await getToken();
    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', async (req, res) => {
  try {
    const {
      username,
      password,
      'cf-turnstile-response': turnstileResponse,
    } = req.body;

    //token verify
    const turnstileVerification = await verifyTurnstileToken(turnstileResponse);
    if (!turnstileVerification.success) {
      return res.status(500).send('Invalid Turnstile token');
    }

    const authResult = await authenticateUser(username, password);
    res.send(authResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
