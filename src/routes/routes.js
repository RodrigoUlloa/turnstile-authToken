const express = require('express');
const { Router } = express;
const { getKameToken } = require('../services/kame/token-generator');

const router = Router();

router.get('/token', async (req, res) => {
  try {
    const token = await getKameToken();
    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
