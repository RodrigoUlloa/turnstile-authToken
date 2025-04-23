const express = require('express');
const { json } = express;
const routes = require('./src/routes/routes.js');

const app = express();
app.use(json());

const { PORT } = process.env;

app.use(routes);

app.use(routes);
app.listen(PORT, () => {
  console.log('Server is running at port', PORT);
});
