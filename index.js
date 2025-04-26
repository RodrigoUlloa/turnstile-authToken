const express = require('express');
const { json, urlencoded, static } = express;
const path = require('path');
const routes = require('./src/routes/routes.js');

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(static(path.join(__dirname, 'src/public')));
const { PORT } = process.env || 3000;

app.use(routes);
app.listen(PORT, () => {
  console.log('Server is running at port', PORT);
});
